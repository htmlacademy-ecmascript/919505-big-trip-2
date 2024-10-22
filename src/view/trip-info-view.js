import AbstractView from '../framework/view/abstract-view.js';
import {humanizeTripTimeInterval} from '../utils/dates';
import {generateTitle, generateTripValue} from '../utils/trip-info';

function createCitiesAndDatesTemplate(points, destinations) {
  const title = generateTitle(points, destinations);
  const timeInterval = humanizeTripTimeInterval(points);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>
      <p class="trip-info__dates">${timeInterval}</p>
    </div>`
  );
}

function createTripInfoTemplate(points, destinations, offers) {
  const tripValue = generateTripValue(points, offers);

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${points.length > 0 ? createCitiesAndDatesTemplate(points, destinations) : ''}
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripValue}</span>
      </p>
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
