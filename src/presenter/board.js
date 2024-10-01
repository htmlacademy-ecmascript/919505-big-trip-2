import {render} from '../render';
import PointSortingPanelView from '../view/point-sorting-panel';
import PointFormView from '../view/point-form';
import PointListView from '../view/point-list';
import PointItemView from '../view/point-item';

export default class Board {
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
