const KeyCode = {
  ESCAPE: 'Escape'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const BLANK_POINT = {
  id: '0',
  type: 'flight',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: []
};

export {KeyCode, FilterType, POINT_TYPES, BLANK_POINT};
