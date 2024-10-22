import {getMinMaxDates} from './dates';

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

export {generateTitle, generateTripValue};
