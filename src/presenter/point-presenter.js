import {render, replace} from '../framework/render';
import {KeyCode} from '../const';
import PointFormView from '../view/point-form-view';
import PointCardView from '../view/point-card-view';

export default class PointPresenter {
  #pointsModel = null;
  #containerComponent = null;

  #point = null;
  #pointComponent = null;
  #pointFormComponent = null;

  constructor({pointsModel, containerComponent}) {
    this.#pointsModel = pointsModel;
    this.#containerComponent = containerComponent;
  }

  // Рендерит точку
  init(point) {
    this.#point = point;

    this.#pointComponent = this.#createPointCardView();
    this.#pointFormComponent = this.#createPointFormView();

    render(this.#pointComponent, this.#containerComponent.element);
  }

  // Возвращает новый экземпляр карточки точки
  #createPointCardView() {
    const offers = this.#pointsModel.getChosenPointOffers(this.#point.type, this.#point.offers);
    const destination = this.#pointsModel.getDestinationById(this.#point.destination).name;

    return new PointCardView({
      point: this.#point,
      offers,
      destination,
      onEditClick: this.#handleEditClick
    });
  }

  // Возвращает новый экземпляр формы редактирования точки
  #createPointFormView() {
    const offers = this.#pointsModel.getOfferObjectByPointType(this.#point.type).offers;
    const destinations = this.#pointsModel.destinations;

    return new PointFormView({
      point: this.#point,
      offers,
      destinations,
      onCloseButtonClick: this.#handleCloseFormButton,
      onFormSubmit: this.#handleFormSubmit
    });
  }

  #replaceCardToForm() {
    replace(this.#pointFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleCloseFormButton = () => {
    this.#replaceFormToCard();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
}
