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

  updatePoint(updateType, updatedPoint) {
    const updatedPointIndex = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (updatedPointIndex === -1) {
      throw new Error('Can\'t update point that does not exist');
    }

    this.#points = [...this.#points.slice(0, updatedPointIndex), updatedPoint, ...this.#points.slice(updatedPointIndex + 1)];
    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, newPoint) {
    this.#points = [newPoint, ...this.#points];
    this._notify(updateType, newPoint);
  }

  deletePoint(updateType, deletedPoint) {
    const deletedPointIndex = this.#points.findIndex((task) => task.id === deletedPoint.id);

    if (deletedPointIndex === -1) {
      throw new Error('Can\'t delete point that does not exist');
    }

    this.#points = [...this.#points.slice(0, deletedPointIndex), ...this.#points.slice(deletedPointIndex + 1)];

    this._notify(updateType);
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
