import {render, RenderPosition} from '../framework/render';
import PointFilterView from '../view/point-filter-view';
import {pointsFilter} from '../utils/filter';

export default class PointFilterPresenter {
  #pointFilterContainerElement = null;
  #pointsModel = null;
  #filterModel = null;
  #currentFilter = null;

  #filters = null;

  constructor({pointFilterContainerElement, pointsModel, filterModel}) {
    this.#pointFilterContainerElement = pointFilterContainerElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#currentFilter = this.#filterModel.currentFilter;
    this.#filters = Object.entries(pointsFilter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        count: filterPoints(this.#pointsModel.points).length,
      }),
    );

    render(new PointFilterView({filters: this.#filters, currentFilter: this.#currentFilter}), this.#pointFilterContainerElement, RenderPosition.AFTERBEGIN);
  }
}
