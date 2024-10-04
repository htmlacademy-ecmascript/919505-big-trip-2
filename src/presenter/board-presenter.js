import {render} from '../render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointFormView from '../view/point-form-view';
import PointListView from '../view/point-list-view';
import PointItemView from '../view/point-item-view';

export default class BoardPresenter {
  sortingPanelComponent = new PointSortingPanelView();
  pointListComponent = new PointListView();

  constructor({boardContainer, pointsModel, destinationsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.points = this.pointsModel.getPoints();
    this.destinations = this.destinationsModel.getDestinations();

    render(this.sortingPanelComponent, this.boardContainer);

    render(this.pointListComponent, this.boardContainer);
    render(new PointFormView({point: this.points[0], destinations: this.destinations}), this.pointListComponent.getElement());

    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];
      render(new PointItemView({point}), this.pointListComponent.getElement());
    }
  }
}
