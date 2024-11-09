import {remove, render, RenderPosition, replace} from '../framework/render';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  #tripInfoContainerElement = null;
  #pointsModel = null;

  #tripInfoComponent = null;
  #componentDidRender = false;

  constructor({tripInfoContainerElement, pointsModel}) {
    this.#tripInfoContainerElement = tripInfoContainerElement;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    const points = this.#pointsModel.points;
    const shouldComponentRender = points.length > 0;

    this.#tripInfoComponent = new TripInfoView({
      points,
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers
    });

    if (prevTripInfoComponent === null && shouldComponentRender) {
      render(this.#tripInfoComponent, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
      this.#componentDidRender = true;
      return;
    }

    if (this.#componentDidRender) {
      replace(this.#tripInfoComponent, prevTripInfoComponent);
    } else if (shouldComponentRender) {
      render(this.#tripInfoComponent, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
    }

    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
