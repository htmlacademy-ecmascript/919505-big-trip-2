import {render, replace, remove, RenderPosition} from '../framework/render';
import {KeyCode, UserAction, UpdateType, BLANK_POINT} from '../const';
import {isDatesEqual} from '../utils/dates';
import PointFormView from '../view/point-form-view';
import PointCardView from '../view/point-card-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointsModel = null;
  #pointContainerElement = null;
  #addPointElement = null;
  #handleDataChange = () => {};
  #handleFormOpen = () => {};
  #handleFormClose = () => {};

  #point = null;
  #pointComponent = null;
  #pointFormComponent = null;
  #isEscKeyDownHandlerActive = false;

  #mode = Mode.DEFAULT;

  constructor({pointsModel, pointContainer, addPointElement, onDataChange, onFormOpen, onFormClose}) {
    this.#pointsModel = pointsModel;
    this.#pointContainerElement = pointContainer;
    this.#addPointElement = addPointElement;
    this.#handleDataChange = onDataChange;
    this.#handleFormOpen = onFormOpen;
    this.#handleFormClose = onFormClose;
  }

  // Рендерит точку
  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointFormComponent = this.#pointFormComponent;

    this.#pointComponent = this.#createPointCardView();
    this.#pointFormComponent = this.#createPointFormView();

    if (this.#point === BLANK_POINT) {
      this.#mode = Mode.EDITING;
      render(this.#pointFormComponent, this.#pointContainerElement, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      return;
    }

    if (prevPointComponent === null || prevPointFormComponent === null) {
      render(this.#pointComponent, this.#pointContainerElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointFormComponent);

    if (this.#isEscKeyDownHandlerActive) {
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isEscKeyDownHandlerActive = false;
    }
  }

  resetView() {
    if (this.#point.id === BLANK_POINT.id) {
      this.#destroyNewPointForm();
      return;
    }

    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    const resetFormState = () => {
      if (this.#mode === Mode.EDITING) {
        this.#pointFormComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      }
    };

    if (this.#mode === Mode.EDITING) {
      this.#pointFormComponent.shake(resetFormState);
    } else {
      this.#pointComponent.shake();
    }
  }

  // ============= ЭКЗЕМПЛЯРЫ КАРТОЧКИ И ФОРМЫ =============

  // Возвращает новый экземпляр карточки точки
  #createPointCardView() {
    const offers = this.#pointsModel.getChosenPointOffers(this.#point.type, this.#point.offers);
    const destination = this.#pointsModel.getDestinationById(this.#point.destination);
    let destinationName = '';

    if (destination) {
      destinationName = destination.name;
    }

    return new PointCardView({
      point: this.#point,
      offers,
      destination: destinationName,
      onFavoriteClick: this.#handleFavoriteClick,
      onEditClick: this.#handleEditClick
    });
  }

  // Возвращает новый экземпляр формы редактирования точки
  #createPointFormView() {
    const offers = this.#pointsModel.offers;
    const destinations = this.#pointsModel.destinations;

    return new PointFormView({
      point: this.#point,
      offers,
      destinations,
      onCloseButtonClick: this.#handleCloseFormButton,
      onDeletePointClick: this.#handleDeletePointClick,
      onFormSubmit: this.#handleFormSubmit,
    });
  }

  // ============= ПЕРЕКЛЮЧЕНИЕ РЕЖИМА ОТОБРАЖЕНИЯ =============

  #replaceCardToForm(pointId) {
    replace(this.#pointFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isEscKeyDownHandlerActive = true;
    this.#handleFormOpen(pointId);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    this.#pointFormComponent.reset(this.#point);
    replace(this.#pointComponent, this.#pointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#isEscKeyDownHandlerActive = false;
    this.#handleFormClose();
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();

      if (this.#point.id === BLANK_POINT.id) {
        this.#handleDeletePointClick();
        return;
      }

      this.#replaceFormToCard();
    }
  };

  // ============= КОЛЛБЭКИ ДЛЯ КАРТОЧКИ =============

  #handleFavoriteClick = () => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = (pointId) => {
    this.#replaceCardToForm(pointId);
  };

  // ============= КОЛЛБЭКИ ДЛЯ ФОРМЫ =============

  #handleCloseFormButton = () => {
    this.#replaceFormToCard();
  };

  #handleDeletePointClick = () => {
    if (this.#point.id === BLANK_POINT.id) {
      this.#destroyNewPointForm();
      this.#handleFormClose();
      return;
    }

    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, this.#point);
  };

  #destroyNewPointForm() {
    this.destroy();
    this.#addPointElement.disabled = false;
  }

  #handleFormSubmit = (updatedPoint) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, updatedPoint.dateFrom) ||
      this.#point.basePrice !== updatedPoint.basePrice || updatedPoint.id === BLANK_POINT.id;

    let userAction = UserAction.UPDATE_POINT;

    if (updatedPoint.id === BLANK_POINT.id) {
      userAction = UserAction.ADD_POINT;
      delete updatedPoint.id;
    }

    this.#handleDataChange(userAction, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, updatedPoint);
  };
}
