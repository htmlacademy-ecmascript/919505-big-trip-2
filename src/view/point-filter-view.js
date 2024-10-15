import AbstractView from '../framework/view/abstract-view.js';

function createFilterItem(filter, currentFilter) {
  const isChecked = filter.type === currentFilter ? 'checked' : '';
  const isDisabled = filter.count === 0 ? 'disabled' : '';
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filter.type} ${isChecked} ${isDisabled}/>
      <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
    </div>`
  );
}

function createPointFilterTemplate(filters, currentFilter) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilterItem(filter, currentFilter)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
}

export default class PointFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor({filters, currentFilter}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createPointFilterTemplate(this.#filters, this.#currentFilter);
  }
}
