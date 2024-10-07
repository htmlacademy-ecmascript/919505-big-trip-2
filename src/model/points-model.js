import {mockPoints} from '../mock/mock-points';
import {mockOffers} from '../mock/mock-offers';
import {mockDestinations} from '../mock/mock-destinations';

export default class PointsModel {
  points = mockPoints;
  destinations = mockDestinations;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  getOfferObjectByPointType(type) {
    return this.offers.find((offer) => offer.type === type);
  }

  getOfferById(offerObject, offerId) {
    return offerObject.offers.find((offer) => offer.id === offerId);
  }

  getChosenPointOffers(pointType, pointOffers) {
    const pointOffersObject = this.getOfferObjectByPointType(pointType);
    return pointOffers.map((offerId) => this.getOfferById(pointOffersObject, offerId));
  }
}
