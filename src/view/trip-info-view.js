import {createElement} from '../render';
import {humanizeTripTimeInterval, getMinMaxDates} from '../utils';

function getDestinationName (destinations, destinationId) {
  return destinations.find((destination) => destination.id === destinationId).name;
}

function generateTitle (points, destinations) {
  const {dateFrom, dateTo} = getMinMaxDates(points);

  if (!points.length) {
    return '';
  }

  if (points.length === 1) {
    return getDestinationName(destinations, points[0].destination);
  }

  const firstPoint = points.find((point) => point.dateFrom === dateFrom);
  const lastPoint = points.find((point) => point.dateTo === dateTo);

  const firstDestinationName = getDestinationName(destinations, firstPoint.destination);
  const lastDestinationName = getDestinationName(destinations, lastPoint.destination);


  if (points.length > 3) {
    return `${firstDestinationName}-...-${lastDestinationName}`;
  }

  const middlePoint = points.find((point) => point.dateFrom !== dateFrom && point.dateTo !== dateTo);

  if (middlePoint) {
    const middleDestinationName = getDestinationName(destinations, middlePoint.destination);
    return `${firstDestinationName}-${middleDestinationName}-${lastDestinationName}`;
  }

  return `${firstDestinationName}-${lastDestinationName}`;
}

function generateTripValue (points, offers) {
  let tripValue = 0;

  points.forEach((point) => {
    tripValue += point.basePrice;

    const currentOffersObject = offers.find((offer) => offer.type === point.type);

    point.offers.forEach((chosenOfferId) => {
      tripValue += currentOffersObject.offers.find((offer) => offer.id === chosenOfferId).price;
    });
  });

  return tripValue;
}

function createTripInfoTemplate(points, destinations, offers) {
  const title = generateTitle(points, destinations);
  const tripValue = generateTripValue(points, offers);
  const timeInterval = humanizeTripTimeInterval(points);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${timeInterval}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripValue}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView {
  constructor({points, destinations, offers}) {
    this.points = points;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createTripInfoTemplate(this.points, this.destinations, this.offers);
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
