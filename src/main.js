import {RenderPosition} from './const';
import {render} from './render.js';
import PointFilterView from './view/point-filter';
import TripInfoView from './view/trip-info';
import Board from './presenter/board';

const headerElement = document.querySelector('.page-header');
const tripInfoContainerElement = headerElement.querySelector('.trip-main');
const FilterContainerElement = headerElement.querySelector('.trip-controls__filters');

const boardContainerElement = document.querySelector('.trip-events');
const boardPresenter = new Board(boardContainerElement);

render(new TripInfoView(), tripInfoContainerElement, RenderPosition.AFTERBEGIN);
render(new PointFilterView(), FilterContainerElement);

boardPresenter.init();
