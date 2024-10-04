import TripInfoPresenter from './presenter/trip-info-presenter';
import BoardPresenter from './presenter/board-presenter';
import PointFilterPresenter from './presenter/point-filter-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();

const headerElement = document.querySelector('.page-header');
const boardContainerElement = document.querySelector('.trip-events');

const tripInfoContainerElement = headerElement.querySelector('.trip-main');
const pointFilterContainerElement = headerElement.querySelector('.trip-controls__filters');

const tripInfoPresenter = new TripInfoPresenter(tripInfoContainerElement);
const pointFilterPresenter = new PointFilterPresenter(pointFilterContainerElement);
const boardPresenter = new BoardPresenter({
  boardContainer: boardContainerElement,
  pointsModel,
  destinationsModel
});

tripInfoPresenter.init();
pointFilterPresenter.init();
boardPresenter.init();
