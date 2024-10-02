import TripInfoPresenter from './presenter/trip-info-presenter';
import BoardPresenter from './presenter/board-presenter';
import PointFilterPresenter from './presenter/point-filter-presenter';

const headerElement = document.querySelector('.page-header');
const boardContainerElement = document.querySelector('.trip-events');

const tripInfoContainerElement = headerElement.querySelector('.trip-main');
const pointFilterContainerElement = headerElement.querySelector('.trip-controls__filters');

const tripInfoPresenter = new TripInfoPresenter(tripInfoContainerElement);
const pointFilterPresenter = new PointFilterPresenter(pointFilterContainerElement);
const boardPresenter = new BoardPresenter(boardContainerElement);

tripInfoPresenter.init();
boardPresenter.init();
pointFilterPresenter.init();
