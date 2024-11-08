import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const';

const MESSAGE = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  API_ERROR: 'Failed to load latest route information'
};

function createNoPointsTemplate(currentFilter, isApiError) {
  return (
    `<p class="trip-events__msg">
      ${isApiError ? MESSAGE.API_ERROR : MESSAGE[currentFilter]}
    </p>`
  );
}

export default class NoPointsView extends AbstractView {
  #currentFilter = null;
  #isApiError = false;

  constructor({currentFilter, isApiError}) {
    super();
    this.#currentFilter = currentFilter;
    this.#isApiError = isApiError;
  }

  get template() {
    return createNoPointsTemplate(this.#currentFilter, this.#isApiError);
  }
}
