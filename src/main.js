import HeaderPresenter from './presenter/header-presenter';
import BoardPresenter from './presenter/board-presenter';

const headerElement = document.querySelector('.page-header');
const boardContainerElement = document.querySelector('.trip-events');

const headerPresenter = new HeaderPresenter(headerElement);
const boardPresenter = new BoardPresenter(boardContainerElement);

headerPresenter.init();
boardPresenter.init();
