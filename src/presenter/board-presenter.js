import {SortType} from '../const.js';
import {pointsFilter} from '../utils/filter';
import {pointsSort} from '../utils/sort';
import {updateItem} from '../utils/common';
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

  #boardPoints = [];

  #pointPresenters = new Map();
  #currentlyOpenedFormId = null;

  constructor({boardContainer, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  // ============= РЕНДЕРИНГ ОСНОВНЫХ КОМПОНЕНТОВ =============

  // Рендерит доску
  #renderBoard() {
    // Ставим заглушку, если нет точек для отрисовки
    if (this.#boardPoints.length === 0) {
      this.#renderNoPointsMessage();
      return;
    }

    this.#sortPoints();

    this.#renderSort();
    render(this.#pointListComponent, this.#boardContainer);
    this.#renderPoints();
  }

  // Рендерит панель сортировки
  #renderSort() {
    this.#sortComponent = new PointSortingPanelView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoints() {
    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  // Создает презентер точки и запускает рендер
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsModel: this.#pointsModel,
      pointContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
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
  #clearBoard() {
    remove(this.#sortComponent);
    this.#clearPoints();

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
  }

  // Удаляет все точки
  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  // ============= КОЛЛБЭКИ ДЛЯ ТОЧЕК =============

  // Обновляет данные по точке, перерисовывает её
  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sortPoints();
    this.#clearPoints();
    this.#renderPoints();
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
    const currentFilter = this.#filterModel.currentFilter;
    this.#boardPoints = pointsFilter[currentFilter](this.#boardPoints);
  }

  // ============= СОРТИРОВКА ТОЧЕК =============

  // Сортирует точки по текущему типу сортировки
  #sortPoints() {
    this.#boardPoints.sort(pointsSort[this.#currentSortType]);
  }

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
