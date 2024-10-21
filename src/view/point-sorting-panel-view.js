import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const';

function createSortItemTemplate (currentSortType, sortingType) {
  let isDisabled = '';
  const isChecked = sortingType === currentSortType ? 'checked' : '';

  if (sortingType === SortType.EVENT || sortingType === SortType.OFFER) {
    isDisabled = 'disabled';
  }

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortingType}">
        <input id="sort-${sortingType}" class="trip-sort__input  visually-hidden" data-sort-type=${sortingType} type="radio" name="trip-sort" value="sort-${sortingType}" ${isChecked} ${isDisabled}>
        <label class="trip-sort__btn" for="sort-${sortingType}">${sortingType}</label>
      </div>`
  );
}

function createPointSortingPanelTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((sortingType) => createSortItemTemplate(currentSortType, sortingType)).join('')}
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
