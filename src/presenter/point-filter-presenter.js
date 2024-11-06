import {render, replace, remove, RenderPosition} from '../framework/render';
import PointFilterView from '../view/point-filter-view';
import {pointsFilter} from '../utils/filter';
import {UpdateType} from '../const.js';

export default class PointFilterPresenter {
  #pointFilterContainerElement = null;
  #pointsModel = null;
  #filterModel = null;

  #filterComponent = null;

  constructor({pointFilterContainerElement, pointsModel, filterModel}) {
    this.#pointFilterContainerElement = pointFilterContainerElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return Object.entries(pointsFilter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        count: filterPoints(points).length,
      }),
    );
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new PointFilterView({
      filters: this.filters,
      currentFilter: this.#filterModel.currentFilter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(
        this.#filterComponent,
        this.#pointFilterContainerElement,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
