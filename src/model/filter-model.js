import Observable from '../framework/observable';
import {FilterType} from '../const.js';

export default class FilterModel extends Observable {
  #currentFilter = FilterType.EVERYTHING;

  get currentFilter() {
    return this.#currentFilter;
  }

  setFilter(updateType, filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
