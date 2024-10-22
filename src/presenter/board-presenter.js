import {pointsFilter} from '../utils/filter';
import {updateItem} from '../utils/common';
import {compareDates, compareDurations} from '../utils/dates';
import {render, remove, RenderPosition} from '../framework/render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointListView from '../view/point-list-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter';
import {SortType} from '../const.js';

export default class BoardPresenter {
  #pointListComponent = new PointListView();

  #boardPoints = [];

  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

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

    this.#renderSort();
    this.#sortPoints();
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
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  // Рендерит заглушку при отсутствии точек
  #renderNoPointsMessage() {
    const noPointsComponent = new NoPointsView({currentFilter: this.#filterModel.currentFilter});
    render(noPointsComponent, this.#boardContainer);
  }

  // Очищает доску от точек
  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  // ============= КОЛЛБЭКИ ДЛЯ ТОЧЕК =============

  // Сбрасывает режим отображения точки
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // Обновляет данные по точке, перерисовывает её
  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
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
    switch (this.#currentSortType) {
      case SortType.DAY:
        this.#boardPoints.sort((a, b) => compareDates(a.dateFrom, b.dateFrom));
        break;

      case SortType.TIME:
        this.#boardPoints.sort((a, b) => compareDurations(a.dateFrom, a.dateTo, b.dateFrom, b.dateTo));
        break;

      case SortType.PRICE:
        this.#boardPoints.sort((a, b) => b.basePrice - a.basePrice);
        break;

      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }
  }

  // Обновляет тип сортировки, перерисовывает панель сортировки и список точек
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortPoints();

    // Очищаем список
    this.#clearPointList();

    // Заново отрисовываем панель сортировки
    remove(this.#sortComponent);
    this.#renderSort();

    // Рендерим список заново
    this.#renderPoints();
  };
}
