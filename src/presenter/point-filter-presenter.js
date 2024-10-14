import {render, RenderPosition} from '../framework/render.js';
import PointFilterView from '../view/point-filter-view';

export default class PointFilterPresenter {
  constructor(pointFilterContainerElement) {
    this.pointFilterContainerElement = pointFilterContainerElement;
  }

  init() {
    render(new PointFilterView(), this.pointFilterContainerElement, RenderPosition.AFTERBEGIN);
  }
}
