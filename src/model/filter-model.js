import {FilterType} from '../const.js';
import {pointsFilter} from '../utils/filter';

export default class FilterModel {
  #currentFilter = FilterType.EVERYTHING;

  set currentFilter(filter) {
    this.#currentFilter = filter;
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  getFilters(points) {
    return Object.entries(pointsFilter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        count: filterPoints(points).length,
      }),
    );
  }
}
