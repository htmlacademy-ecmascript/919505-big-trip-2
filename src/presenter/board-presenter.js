import {render} from '../render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointFormView from '../view/point-form-view';
import PointListView from '../view/point-list-view';
import PointItemView from '../view/point-item-view';

export default class BoardPresenter {
  sortingPanelComponent = new PointSortingPanelView();
  pointListComponent = new PointListView();

  constructor(boardContainer) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.sortingPanelComponent, this.boardContainer);

    render(this.pointListComponent, this.boardContainer);
    render(new PointFormView(), this.pointListComponent.getElement());
    render(new PointItemView(), this.pointListComponent.getElement());
    render(new PointItemView(), this.pointListComponent.getElement());
    render(new PointItemView(), this.pointListComponent.getElement());
  }
}
