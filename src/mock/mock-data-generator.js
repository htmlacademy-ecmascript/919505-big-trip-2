import {mockPoints} from './mock-points';
import {mockOffers} from './mock-offers';
import {mockDestinations} from './mock-destinations';

function generateMocks () {
  return mockPoints.map((point) => {
    const offerForType = mockOffers.find((value) => value.type === point.type);
    const pointOffers = point.offers.map((offerId) => offerForType.offers.find((offer) => offer.id === offerId));
    const destination = mockDestinations.find((value) => value.id === point.destination);

    return {
      ...point,
      offers: pointOffers,
      destination: destination
    };
  });
}

export {generateMocks};
