import {SortType, FilterType, UpdateType, UserAction, BLANK_POINT} from '../const.js';
import {pointsFilter} from '../utils/filter';
import {pointsSort} from '../utils/sort';
import {render, remove, RenderPosition} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointListView from '../view/point-list-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter';
import LoadingView from '../view/loading-view';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #noPointsComponent = null;

  #boardContainer = null;
  #addPointElement = null;

  #pointsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;

  #pointPresenters = new Map();
  #currentlyOpenedFormId = null;

  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({boardContainer, addPointElement, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#addPointElement = addPointElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#renderPoint(BLANK_POINT);
  }

  // Вовзращает массив точек под текущие фильтрацию и сортировку
  get points() {
    const currentFilter = this.#filterModel.currentFilter;
    const points = this.#pointsModel.points;
    const filteredPoints = pointsFilter[currentFilter](points);

    return filteredPoints.sort(pointsSort[this.#currentSortType]);
  }

  // ============= КОЛЛБЭК ДЛЯ МОДЕЛЕЙ =============

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  // ============= РЕНДЕРИНГ ОСНОВНЫХ КОМПОНЕНТОВ =============

  // Рендерит доску
  #renderBoard() {
    const points = this.points;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    // Ставим заглушку, если нет точек для отрисовки или получили ошибку при получении данных с бэка
    if (points.length === 0 || this.#pointsModel.isApiError) {
      this.#renderNoPointsMessage();
      return;
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#boardContainer);
    this.#renderPoints(points);
  }

  // Рендерит панель сортировки
  #renderSort() {
    this.#sortComponent = new PointSortingPanelView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  // Рендерит точки
  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  // Создает презентер точки и запускает рендер
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsModel: this.#pointsModel,
      pointContainer: this.#pointListComponent.element,
      addPointElement: this.#addPointElement,
      onDataChange: this.#handleViewAction,
      onFormOpen: this.#handleFormOpen,
      onFormClose: this.#handleFormClose
    });

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
      render(this.#pointListComponent, this.#boardContainer);
    }

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);

    if (point === BLANK_POINT) {
      this.#currentlyOpenedFormId = BLANK_POINT.id;
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  // Рендерит заглушку при отсутствии точек
  #renderNoPointsMessage() {
    this.#noPointsComponent = new NoPointsView({currentFilter: this.#filterModel.currentFilter, isApiError: this.#pointsModel.isApiError});
    render(this.#noPointsComponent, this.#boardContainer);
  }

  // Очищает доску
  #clearBoard({resetSortType = false} = {}) {
    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    this.#clearPoints();

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    this.#currentlyOpenedFormId = null;
  }

  // Удаляет все точки
  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  // ============= КОЛЛБЭКИ ДЛЯ ТОЧЕК =============

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;

      case UserAction.ADD_POINT:
        this.#pointPresenters.get(BLANK_POINT.id).setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(BLANK_POINT.id).setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  // Проверяет, не открыта ли в данный момент форма у другой карточки
  // Если открыта, сбрасывает режим отображения для старой карточки
  // Запоминает, у какой карточки сейчас открыта форма
  #handleFormOpen = (newFormId) => {
    if (this.#currentlyOpenedFormId || this.#currentlyOpenedFormId === BLANK_POINT.id) {
      this.#pointPresenters.get(this.#currentlyOpenedFormId).resetView();
    }

    this.#currentlyOpenedFormId = newFormId;
  };

  // Сбрасывает ID формы в случае её закрытия
  #handleFormClose = () => {
    this.#currentlyOpenedFormId = null;

    if (this.points.length === 0) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  // ============= СОРТИРОВКА ТОЧЕК =============

  // Обновляет тип сортировки, перерисовывает доску
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderBoard();
  };
}
