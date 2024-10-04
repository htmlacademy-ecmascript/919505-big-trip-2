import {mockDestinations} from '../mock/mock-destinations';

export default class DestinationsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }
}
