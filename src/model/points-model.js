import {mockPoints} from '../mock/mock-points';
import {mockOffers} from '../mock/mock-offers';
import {mockDestinations} from '../mock/mock-destinations';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = mockPoints;
  #destinations = mockDestinations;
  #offers = mockOffers;

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getOfferObjectByPointType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getOfferById(offerObject, offerId) {
    return offerObject.offers.find((offer) => offer.id === offerId);
  }

  getChosenPointOffers(pointType, pointOffers) {
    const pointOffersObject = this.getOfferObjectByPointType(pointType);
    return pointOffers.map((offerId) => this.getOfferById(pointOffersObject, offerId));
  }
}
