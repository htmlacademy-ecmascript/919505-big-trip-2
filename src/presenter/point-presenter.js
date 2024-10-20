import {render, replace, remove} from '../framework/render';
import {KeyCode} from '../const';
import PointFormView from '../view/point-form-view';
import PointCardView from '../view/point-card-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointsModel = null;
  #pointContainerElement = null;
  #handleDataChange = () => {};
  #handleModeChange = () => {};

  #point = null;
  #pointComponent = null;
  #pointFormComponent = null;

  #mode = Mode.DEFAULT;

  constructor({pointsModel, pointContainer, onDataChange, onModeChange}) {
    this.#pointsModel = pointsModel;
    this.#pointContainerElement = pointContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  // Рендерит точку
  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointFormComponent = this.#pointFormComponent;

    this.#pointComponent = this.#createPointCardView();
    this.#pointFormComponent = this.#createPointFormView();

    if (prevPointComponent === null || prevPointFormComponent === null) {
      render(this.#pointComponent, this.#pointContainerElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  // Возвращает новый экземпляр карточки точки
  #createPointCardView() {
    const offers = this.#pointsModel.getChosenPointOffers(this.#point.type, this.#point.offers);
    const destination = this.#pointsModel.getDestinationById(this.#point.destination).name;

    return new PointCardView({
      point: this.#point,
      offers,
      destination,
      onFavoriteClick: this.#handleFavoriteClick,
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
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleCloseFormButton = () => {
    this.#replaceFormToCard();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToCard();
  };
}
