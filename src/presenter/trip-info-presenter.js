import {render, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  constructor({tripInfoContainerElement, pointsModel}) {
    this.tripInfoContainerElement = tripInfoContainerElement;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = this.pointsModel.getPoints();
    this.destinations = this.pointsModel.getDestinations();
    this.offers = this.pointsModel.getOffers();

    render(new TripInfoView({
      points: this.points,
      destinations: this.destinations,
      offers: this.offers
    }),
    this.tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }
}
