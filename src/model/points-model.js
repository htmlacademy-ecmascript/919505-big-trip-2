import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #tripApiService = null;
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({tripApiService}) {
    super();
    this.#tripApiService = tripApiService;
  }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async updatePoint(updateType, update) {
    const updatedPointIndex = this.#points.findIndex((point) => point.id === update.id);

    if (updatedPointIndex === -1) {
      throw new Error('Can\'t update point that does not exist');
    }

    try {
      const response = await this.#tripApiService.updatePoint(update);
      const updatedPoint = this.#adaptPointToClient(response);

      this.#points = [...this.#points.slice(0, updatedPointIndex), updatedPoint, ...this.#points.slice(updatedPointIndex + 1),];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#tripApiService.addPoint(update);
      const newPoint = this.#adaptPointToClient(response);

      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const deletedPointIndex = this.#points.findIndex((point) => point.id === update.id);

    if (deletedPointIndex === -1) {
      throw new Error('Can\'t delete point that does not exist');
    }

    try {
      await this.#tripApiService.deletePoint(update);
      this.#points = [...this.#points.slice(0, deletedPointIndex), ...this.#points.slice(deletedPointIndex + 1)];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getOfferObjectByPointType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getOfferById(offerObject, offerId) {
    return offerObject.offers.find((offer) => offer.id === offerId);
  }

  getChosenPointOffers(pointType, pointOffers) {
    const pointOffersObject = this.getOfferObjectByPointType(pointType);
    return pointOffers.map((offerId) => this.getOfferById(pointOffersObject, offerId));
  }

  async init() {
    try {
      const points = await this.#tripApiService.points;
      this.#points = points.map(this.#adaptPointToClient);
    } catch(err) {
      this.#points = [];
    }

    try {
      this.#destinations = await this.#tripApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    try {
      this.#offers = await this.#tripApiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  #adaptPointToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
