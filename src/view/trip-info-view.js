import {createElement} from '../render';

function getDestinationName (destinations, destinationId) {
  return destinations.find((destination) => destination.id === destinationId).name;
}

function generateTitle (points, destinations) {
  let title = '';

  if (!points.length) {
    return '';
  }

  if (points.length === 1) {
    return getDestinationName(destinations, points[0].destination);
  }

  if (points.length > 3) {
    const firstDestinationName = getDestinationName(destinations, points[0].destination);
    const lastDestinationName = getDestinationName(destinations, points[points.length - 1].destination);

    return `${firstDestinationName}-...-${lastDestinationName}`;
  }

  points.forEach((point, index) => {
    if (index === 0) {
      title += getDestinationName(destinations, point.destination);
    } else {
      title += `-${getDestinationName(destinations, point.destination)}`;
    }
  });

  return title;
}

function createTripInfoTemplate(points, destinations) {
  const title = generateTitle(points, destinations);
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
}

export default class TripInfoView {
  constructor({points, destinations}) {
    this.points = points;
    this.destinations = destinations;
  }

  getTemplate() {
    return createTripInfoTemplate(this.points, this.destinations);
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
