import {render, replace, remove} from '../framework/render';
import {KeyCode, UserAction, UpdateType} from '../const';
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
  #handleDataChange = () => {};
  #handleFormOpen = () => {};
  #handleFormClose = () => {};

  #point = null;
  #pointComponent = null;
  #pointFormComponent = null;

  #mode = Mode.DEFAULT;

  constructor({pointsModel, pointContainer, onDataChange, onFormOpen, onFormClose}) {
    this.#pointsModel = pointsModel;
    this.#pointContainerElement = pointContainer;
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

  // ============= ЭКЗЕМПЛЯРЫ КАРТОЧКИ И ФОРМЫ =============

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
    this.#handleFormOpen(pointId);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleFormClose();
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();
      this.#pointFormComponent.reset(this.#point);
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
    this.#pointFormComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleDeletePointClick = (point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
    this.#replaceFormToCard();
  };

  #handleFormSubmit = (updatedPoint) => {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, updatedPoint.dateFrom) ||
      this.#point.basePrice !== updatedPoint.basePrice;

    this.#handleDataChange(UserAction.UPDATE_POINT, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, updatedPoint);
    this.#replaceFormToCard();
  };
}
