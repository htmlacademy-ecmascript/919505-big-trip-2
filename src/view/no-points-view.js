import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const';

const MESSAGE = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now'
};

function createNoPointsTemplate(currentFilter) {
  return (
    `<p class="trip-events__msg">
      ${MESSAGE[currentFilter]}
    </p>`
  );
}

export default class NoPointsView extends AbstractView {
  #currentFilter = null;

  constructor({currentFilter}) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNoPointsTemplate(this.#currentFilter);
  }
}
