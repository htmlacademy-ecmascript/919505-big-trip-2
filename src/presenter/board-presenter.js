import {render} from '../framework/render.js';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointFormView from '../view/point-form-view';
import PointListView from '../view/point-list-view';
import PointItemView from '../view/point-item-view';

export default class BoardPresenter {
  #sortingPanelComponent = new PointSortingPanelView();
  #pointListComponent = new PointListView();
  #boardContainer = null;
  #pointsModel = null;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    render(this.#sortingPanelComponent, this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);

    // Рендерим несколько форм редактирования точки для демонстрации разных кейсов
    for (let i = 0; i < 6; i++) {
      render(new PointFormView({
        point: this.#pointsModel.points[i],
        offers: this.#pointsModel.getOfferObjectByPointType(this.#pointsModel.points[i].type).offers,
        destinations: this.#pointsModel.destinations
      }),
      this.#pointListComponent.element);
    }

    // Рендерим точки
    for (let i = 6; i < this.#pointsModel.points.length; i++) {
      render(new PointItemView({
        point: this.#pointsModel.points[i],
        offers: this.#pointsModel.getChosenPointOffers(this.#pointsModel.points[i].type, this.#pointsModel.points[i].offers),
        destinationName: this.#pointsModel.getDestinationById(this.#pointsModel.points[i].destination).name
      }),
      this.#pointListComponent.element);
    }
  }
}
