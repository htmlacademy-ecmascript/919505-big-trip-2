import {FilterType} from '../const.js';

export default class FilterModel {
  #currentFilter = FilterType.EVERYTHING;

  set currentFilter(filter) {
    this.#currentFilter = filter;
  }

  get currentFilter() {
    return this.#currentFilter;
  }
}
