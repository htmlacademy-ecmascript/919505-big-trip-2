const REG_EXP_ANY_NUMBER = /^[0-9]*$/;

const REG_EXP_ANY_POSITIVE_NUMBER = /^[1-9][0-9]*$/;

const KeyCode = {
  ESCAPE: 'Escape'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const BLANK_POINT = {
  id: 'BLANK-POINT-ID',
  type: 'flight',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: []
};

export {REG_EXP_ANY_NUMBER, REG_EXP_ANY_POSITIVE_NUMBER, KeyCode, UserAction, UpdateType, SortType, FilterType, POINT_TYPES, BLANK_POINT};
