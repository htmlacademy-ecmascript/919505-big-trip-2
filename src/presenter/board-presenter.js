import {pointsFilter} from '../utils/filter';
import {updateItem} from '../utils/common';
import {render} from '../framework/render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointListView from '../view/point-list-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #sortingPanelComponent = new PointSortingPanelView();
  #pointListComponent = new PointListView();

  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();

  constructor({boardContainer, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#renderBoard();
  }

  // Рендерит доску
  #renderBoard() {
    const points = this.#getPoints();

    // Ставим заглушку, если нет точек для отрисовки
    if (points.length === 0) {
      this.#renderNoPointsMessage();
      return;
    }

    render(this.#sortingPanelComponent, this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);

    points.forEach((point) => this.#renderPoint(point));
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

  // Собирает массив точек с учетом текущей фильтрации
  #getPoints() {
    const currentFilter = this.#filterModel.currentFilter;
    return pointsFilter[currentFilter](this.#pointsModel.points);
  }

  // Рендерит заглушку при отсутствии точек
  #renderNoPointsMessage() {
    const noPointsComponent = new NoPointsView({currentFilter: this.#filterModel.currentFilter});
    render(noPointsComponent, this.#boardContainer);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.points = updateItem(this.#pointsModel.points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  // Очищает доску от точек
  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
