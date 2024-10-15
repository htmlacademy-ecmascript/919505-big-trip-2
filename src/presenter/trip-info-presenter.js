import {render, RenderPosition} from '../framework/render';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  #tripInfoContainerElement = null;
  #pointsModel = null;

  constructor({tripInfoContainerElement, pointsModel}) {
    this.#tripInfoContainerElement = tripInfoContainerElement;
    this.#pointsModel = pointsModel;
  }

  init() {
    render(new TripInfoView({
      points: this.#pointsModel.points,
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers
    }),
    this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }
}
