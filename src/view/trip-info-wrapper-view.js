import {createElement} from '../render';

function createTripInfoWrapperTemplate() {
  return '<div class="trip-main"/>';
}

export default class TripInfoWrapperView {
  getTemplate() {
    return createTripInfoWrapperTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
