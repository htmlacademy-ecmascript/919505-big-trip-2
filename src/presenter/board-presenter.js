import {render} from '../render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointFormView from '../view/point-form-view';
import PointListView from '../view/point-list-view';
import PointItemView from '../view/point-item-view';

export default class BoardPresenter {
  sortingPanelComponent = new PointSortingPanelView();
  pointListComponent = new PointListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = this.pointsModel.getPoints();
    render(this.sortingPanelComponent, this.boardContainer);

    render(this.pointListComponent, this.boardContainer);
    render(new PointFormView(), this.pointListComponent.getElement());

    this.points.forEach((point) => {
      render(new PointItemView({point}), this.pointListComponent.getElement());
    });
  }
}
