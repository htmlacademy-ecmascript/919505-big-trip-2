import {render, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  #tripInfoContainerElement = null;
  #pointsModel = null;

  constructor({tripInfoContainerElement, pointsModel}) {
    this.#tripInfoContainerElement = tripInfoContainerElement;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.points = this.#pointsModel.points;
    this.destinations = this.#pointsModel.destinations;
    this.offers = this.#pointsModel.offers;

    render(new TripInfoView({
      points: this.points,
      destinations: this.destinations,
      offers: this.offers
    }),
    this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }
}
