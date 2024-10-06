import {render, RenderPosition} from '../render';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  constructor({tripInfoContainerElement, pointsModel}) {
    this.tripInfoContainerElement = tripInfoContainerElement;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = this.pointsModel.getPoints();
    this.destinations = this.pointsModel.getDestinations();
    render(new TripInfoView({points: this.points, destinations: this.destinations}), this.tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }
}
