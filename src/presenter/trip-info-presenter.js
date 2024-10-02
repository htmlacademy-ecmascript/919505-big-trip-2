import {render, RenderPosition} from '../render';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  constructor(tripInfoContainerElement) {
    this.tripInfoContainerElement = tripInfoContainerElement;
  }

  init() {
    render(new TripInfoView(), this.tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }
}
