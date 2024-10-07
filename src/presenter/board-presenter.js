import {render} from '../render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointFormView from '../view/point-form-view';
import PointListView from '../view/point-list-view';
import PointItemView from '../view/point-item-view';

export default class BoardPresenter {
  sortingPanelComponent = new PointSortingPanelView();
  pointListComponent = new PointListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = this.pointsModel.getPoints();
    this.offers = this.pointsModel.getOffers();
    this.destinations = this.pointsModel.getDestinations();

    render(this.sortingPanelComponent, this.boardContainer);
    render(this.pointListComponent, this.boardContainer);

    // Рендерим несколько форм редактирования точки для демонстрации разных кейсов
    for (let i = 0; i < 6; i++) {
      render(new PointFormView({
        point: this.points[i],
        offers: this.pointsModel.getOfferObjectByPointType(this.points[i].type).offers,
        destinations: this.destinations
      }),
      this.pointListComponent.getElement());
    }

    // Рендерим точки
    for (let i = 6; i < this.points.length; i++) {
      render(new PointItemView({
        point: this.points[i],
        offers: this.pointsModel.getChosenPointOffers(this.points[i].type, this.points[i].offers),
        destinationName: this.pointsModel.getDestinationById(this.points[i].destination).name
      }),
      this.pointListComponent.getElement());
    }
  }
}
