import {KeyCode} from '../const';
import {render, replace} from '../framework/render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointFormView from '../view/point-form-view';
import PointListView from '../view/point-list-view';
import PointCardView from '../view/point-card-view';

export default class BoardPresenter {
  #sortingPanelComponent = new PointSortingPanelView();
  #pointListComponent = new PointListView();
  #boardContainer = null;
  #pointsModel = null;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#renderBoard();
  }

  //Рендерит доску
  #renderBoard() {
    render(this.#sortingPanelComponent, this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);

    for (let i = 0; i < this.#pointsModel.points.length; i++) {
      this.#renderPoint(this.#pointsModel.points[i]);
    }
  }

  // Рендерит точку
  #renderPoint(point) {
    const pointComponent = this.#createPointCardView(point, replaceCardToForm, escKeyDownHandler);
    const pointFormComponent = this.#createPointFormView(point, replaceFormToCard, escKeyDownHandler);

    function replaceCardToForm() {
      replace(pointFormComponent, pointComponent);
    }
    function replaceFormToCard() {
      replace(pointComponent, pointFormComponent);
    }

    function escKeyDownHandler(evt) {
      if (evt.key === KeyCode.ESCAPE) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    render(pointComponent, this.#pointListComponent.element);
  }

  //Возвращает новый экземпляр формы редактирования точки
  #createPointFormView(point, replaceFormToCard, escKeyDownHandler) {
    const offers = this.#pointsModel.getOfferObjectByPointType(point.type).offers;
    const destinations = this.#pointsModel.destinations;

    function onCloseButtonClick() {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function onFormSubmit() {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    return new PointFormView({point, offers, destinations, onCloseButtonClick, onFormSubmit});
  }

  //Возвращает новый экземпляр карточки точки
  #createPointCardView(point, replaceCardToForm, escKeyDownHandler) {
    const offers = this.#pointsModel.getChosenPointOffers(point.type, point.offers);
    const destinationName = this.#pointsModel.getDestinationById(point.destination).name;

    function onEditClick() {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    return new PointCardView({point, offers, destinationName, onEditClick});
  }
}
