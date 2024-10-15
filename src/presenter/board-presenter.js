import {KeyCode} from '../const';
import {pointsFilter} from '../utils/filter';
import {render, replace} from '../framework/render';
import PointSortingPanelView from '../view/point-sorting-panel-view';
import PointFormView from '../view/point-form-view';
import PointListView from '../view/point-list-view';
import PointCardView from '../view/point-card-view';
import NoPointsView from '../view/no-points-view';

export default class BoardPresenter {
  #sortingPanelComponent = new PointSortingPanelView();
  #pointListComponent = new PointListView();
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;

  constructor({boardContainer, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#renderBoard();
  }

  //Рендерит доску
  #renderBoard() {
    const points = this.#getPoints();

    // Ставим заглушку, если нет точек для отрисовки
    if (points.length === 0) {
      this.#renderNoPointsMessage();
      return;
    }

    render(this.#sortingPanelComponent, this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);

    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i]);
    }
  }

  //Собирает массив точек с учетом текущей фильтрации
  #getPoints() {
    const currentFilter = this.#filterModel.currentFilter;
    return pointsFilter[currentFilter](this.#pointsModel.points);
  }

  //Рендерит заглушку при отсутствии точек
  #renderNoPointsMessage() {
    const noPointsComponent = new NoPointsView({currentFilter: this.#filterModel.currentFilter});
    render(noPointsComponent, this.#boardContainer);
  }

  // Рендерит точку
  #renderPoint(point) {
    const pointComponent = this.#createPointCardView(point, openForm);
    const pointFormComponent = this.#createPointFormView(point, closeForm);

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

    render(pointComponent, this.#pointListComponent.element);
  }

  //Возвращает новый экземпляр карточки точки
  #createPointCardView(point, openForm) {
    const offers = this.#pointsModel.getChosenPointOffers(point.type, point.offers);
    const destinationName = this.#pointsModel.getDestinationById(point.destination).name;

    function onEditClick() {
      openForm();
    }

    return new PointCardView({point, offers, destinationName, onEditClick});
  }

  //Возвращает новый экземпляр формы редактирования точки
  #createPointFormView(point, closeForm) {
    const offers = this.#pointsModel.getOfferObjectByPointType(point.type).offers;
    const destinations = this.#pointsModel.destinations;

    function onCloseButtonClick() {
      closeForm();
    }

    function onFormSubmit() {
      closeForm();
    }

    return new PointFormView({point, offers, destinations, onCloseButtonClick, onFormSubmit});
  }
}
