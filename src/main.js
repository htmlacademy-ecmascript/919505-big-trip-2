import TripInfoPresenter from './presenter/trip-info-presenter';
import BoardPresenter from './presenter/board-presenter';
import PointFilterPresenter from './presenter/point-filter-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const headerElement = document.querySelector('.page-header');
const boardContainerElement = document.querySelector('.trip-events');

const tripInfoContainerElement = headerElement.querySelector('.trip-main');
const pointFilterContainerElement = headerElement.querySelector('.trip-controls__filters');

const addPointElement = headerElement.querySelector('.trip-main__event-add-btn');

const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainerElement: tripInfoContainerElement,
  pointsModel
});

const pointFilterPresenter = new PointFilterPresenter({
  pointFilterContainerElement,
  pointsModel,
  filterModel
});

const boardPresenter = new BoardPresenter({
  boardContainer: boardContainerElement,
  pointsModel,
  filterModel
});

addPointElement.addEventListener('click', () => {
  boardPresenter.createPoint();
  addPointElement.disabled = true;
});

tripInfoPresenter.init();
pointFilterPresenter.init();
boardPresenter.init();
