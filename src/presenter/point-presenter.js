import {render, replace} from '../framework/render';
import {KeyCode} from '../const';
import PointFormView from '../view/point-form-view';
import PointCardView from '../view/point-card-view';

export default class PointPresenter {
  #point = null;
  #pointsModel = null;
  #containerComponent = null;

  constructor({point, pointsModel, containerComponent}) {
    this.#point = point;
    this.#pointsModel = pointsModel;
    this.#containerComponent = containerComponent;
  }

  // Рендерит точку
  init() {
    const pointComponent = this.#createPointCardView(openForm);
    const pointFormComponent = this.#createPointFormView(closeForm);

    function openForm() {
      replace(pointFormComponent, pointComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function closeForm() {
      replace(pointComponent, pointFormComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function escKeyDownHandler(evt) {
      if (evt.key === KeyCode.ESCAPE) {
        evt.preventDefault();
        closeForm();
      }
    }

    render(pointComponent, this.#containerComponent.element);
  }

  // Возвращает новый экземпляр карточки точки
  #createPointCardView(openForm) {
    const offers = this.#pointsModel.getChosenPointOffers(this.#point.type, this.#point.offers);
    const destination = this.#pointsModel.getDestinationById(this.#point.destination).name;

    function onEditClick() {
      openForm();
    }

    return new PointCardView({point: this.#point, offers, destination, onEditClick});
  }

  // Возвращает новый экземпляр формы редактирования точки
  #createPointFormView(closeForm) {
    const offers = this.#pointsModel.getOfferObjectByPointType(this.#point.type).offers;
    const destinations = this.#pointsModel.destinations;

    function onCloseButtonClick() {
      closeForm();
    }

    function onFormSubmit() {
      closeForm();
    }

    return new PointFormView({point: this.#point, offers, destinations, onCloseButtonClick, onFormSubmit});
  }
}
