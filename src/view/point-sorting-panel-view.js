import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const';

const DISABLED_SORT_TYPES = [SortType.EVENT, SortType.OFFER];

function createSortItemTemplate (currentSortType, sortType) {
  let isDisabled = '';
  const isChecked = sortType === currentSortType ? 'checked' : '';

  if (DISABLED_SORT_TYPES.includes(sortType)) {
    isDisabled = 'disabled';
  }

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
        <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" data-sort-type=${sortType} type="radio" name="trip-sort" value="sort-${sortType}" ${isChecked} ${isDisabled}>
        <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
      </div>`
  );
}

function createPointSortingPanelTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((sortType) => createSortItemTemplate(currentSortType, sortType)).join('')}
    </form>`
  );
}

export default class PointSortingPanelView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = () => {};

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createPointSortingPanelTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
