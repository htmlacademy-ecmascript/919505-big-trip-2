import {createElement} from '../render.js';
import {humanizePointDateTime} from '../utils';
import {POINT_TYPES} from '../const';

function createPointTypeItem (pointId, pointType, currentPointType) {
  const isChecked = pointType === currentPointType ? 'checked' : '';
  return (
    `<div class="event__type-item">
      <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" ${isChecked}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${pointType}</label>
    </div>`
  );
}

function createDestinationItem (destination) {
  return (
    `<option value=${destination}>
     </option>`
  );
}

function createOffer (offer) {
  const {id, title, price} = offer;
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" checked>
      <label class="event__offer-label" for="event-offer-${title}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createPhotoItem (photo) {
  const {description, src} = photo;
  return (
    `<img class="event__photo" src=${src} alt=${description.replaceAll(' ', '&nbsp;')}/>`
  );
}

function createOffersSection (currentOffersObject) {
  const offersTemplate = currentOffersObject.offers.map((offer) => createOffer(offer)).join('');

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>`
  );
}

function createDestinationInfo(currentDestinationObject) {
  const photosTemplate = currentDestinationObject.pictures.map((picture) => createPhotoItem(picture)).join('');

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestinationObject.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosTemplate}
        </div>
      </div>
    </section>`
  );
}

function createPointFormTemplate(point, offers, destinations) {
  const {id, type, destination, dateFrom, dateTo, basePrice} = point;
  let currentDestinationObject = null;
  let destinationName = '';
  let destinationInfoTemplate = '';
  let offersSectionTemplate = '';

  const fullDateFrom = humanizePointDateTime(dateFrom);
  const fullDateTo = humanizePointDateTime(dateTo);

  const pointTypesItemsTemplate = POINT_TYPES.map((pointType) => createPointTypeItem(id, pointType, type)).join('');
  const destinationItemsTemplate = destinations.map((value) => createDestinationItem(value.name)).join('');

  const currentOffersObject = offers.find((value) => value.type === type);

  // Рендерим секцию офферов только если они есть в модели для данного destination
  if (currentOffersObject.offers.length) {
    offersSectionTemplate = createOffersSection(currentOffersObject);
  }

  // Рендерим секцию destination только если он выбран
  if (destination) {
    currentDestinationObject = destinations.find((value) => value.id === destination);
    destinationName = currentDestinationObject.name;

    destinationInfoTemplate = createDestinationInfo(currentDestinationObject);
  }

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${pointTypesItemsTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destinationName}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${destinationItemsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${fullDateFrom}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${fullDateTo}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${offersSectionTemplate}
          ${destinationInfoTemplate}
        </section>
      </form>
    </li>`
  );
}

export default class PointFormView {
  constructor({point, offers, destinations}) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createPointFormTemplate(this.point, this.offers, this.destinations);
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
