import AbstractView from '../framework/view/abstract-view.js';
import {humanizeTripTimeInterval} from '../utils/dates';
import {generateTitle, generateTripValue} from '../utils/trip-info';

const MAIN_TITLE_PLACEHOLDER = 'Big Trip';

function createDatesTemplate(points) {
  const timeInterval = humanizeTripTimeInterval(points);

  return (
    `<p class="trip-info__dates">${timeInterval}</p>`
  );
}

function createTotalPriceTemplate(tripValue) {
  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripValue}</span>
      </p>`
  );
}

function createTripInfoTemplate(points, destinations, offers) {
  let title = MAIN_TITLE_PLACEHOLDER;

  if (points.length > 0 && destinations.length > 0) {
    title = generateTitle(points, destinations);
  }

  const tripValue = generateTripValue(points, offers);
  const totalPriceTemplate = points.length > 0 ? createTotalPriceTemplate(tripValue) : '';

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        ${points.length > 0 ? createDatesTemplate(points) : ''}
      </div>
      ${totalPriceTemplate}
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
