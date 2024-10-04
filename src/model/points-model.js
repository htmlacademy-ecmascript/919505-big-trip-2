import {generateMocks} from '../mock/mock-data-generator';

export default class PointsModel {
  points = generateMocks();

  getPoints() {
    return this.points;
  }
}
