import {SortType, UpdateType, UserAction} from '../const.js';
//import {pointsFilter} from '../utils/filter';
import {pointsSort} from '../utils/sort';
import {render, remove, RenderPosition} from '../framework/render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointListView from '../view/point-list-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #noPointsComponent = null;

  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;

  #pointPresenters = new Map();
  #currentlyOpenedFormId = null;

  constructor({boardContainer, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  get points() {
    return [...this.#pointsModel.points].sort(pointsSort[this.#currentSortType]);
  }

  // ============= КОЛЛБЭК ДЛЯ НАБЛЮДАТЕЛЯ POINTS_MODEL =============

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда точка ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  // ============= РЕНДЕРИНГ ОСНОВНЫХ КОМПОНЕНТОВ =============

  // Рендерит доску
  #renderBoard() {
    const points = this.points;

    // Ставим заглушку, если нет точек для отрисовки
    if (points.length === 0) {
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

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  // Создает презентер точки и запускает рендер
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsModel: this.#pointsModel,
      pointContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onFormOpen: this.#handleFormOpen,
      onFormClose: this.#handleFormClose
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  // Рендерит заглушку при отсутствии точек
  #renderNoPointsMessage() {
    this.#noPointsComponent = new NoPointsView({currentFilter: this.#filterModel.currentFilter});
    render(this.#noPointsComponent, this.#boardContainer);
  }

  // Очищает доску
  #clearBoard({resetSortType = false} = {}) {
    remove(this.#sortComponent);
    this.#clearPoints();

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  // Удаляет все точки
  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  // ============= КОЛЛБЭКИ ДЛЯ ТОЧЕК =============

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  // Проверяет, не открыта ли в данный момент форма у другой карточки
  // Если открыта, сбрасывает режим отображения для старой карточки
  // Запоминает, у какой карточки сейчас открыта форма
  #handleFormOpen = (newFormId) => {
    if (this.#currentlyOpenedFormId) {
      this.#pointPresenters.get(this.#currentlyOpenedFormId).resetView();
    }

    this.#currentlyOpenedFormId = newFormId;
  };

  // Сбрасывает ID формы в случае её закрытия
  #handleFormClose = () => {
    this.#currentlyOpenedFormId = null;
  };

  // ============= ФИЛЬТРАЦИЯ ТОЧЕК =============

  // Фильтрует точки с учетом текущей фильтрации
  #filterPoints() {
    //const currentFilter = this.#filterModel.currentFilter;
  }

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
