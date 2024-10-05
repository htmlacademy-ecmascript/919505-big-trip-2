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
}
