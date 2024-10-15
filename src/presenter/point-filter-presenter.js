import {render, RenderPosition} from '../framework/render';
import PointFilterView from '../view/point-filter-view';

export default class PointFilterPresenter {
  #pointFilterContainerElement = null;
  #pointsModel = null;
  #filterModel = null;
  #currentFilter = null;

  constructor({pointFilterContainerElement, pointsModel, filterModel}) {
    this.#pointFilterContainerElement = pointFilterContainerElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#currentFilter = this.#filterModel.currentFilter;
    const filters = this.#filterModel.getFilters(this.#pointsModel.points);

    render(new PointFilterView({filters, currentFilter: this.#currentFilter}), this.#pointFilterContainerElement, RenderPosition.AFTERBEGIN);
  }
}
