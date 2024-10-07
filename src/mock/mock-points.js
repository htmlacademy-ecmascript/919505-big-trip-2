import {BLANK_POINT} from '../const';

const mockPoints = [
  {
    id: '1',
    type: 'ship',
    basePrice: 7000,
    dateFrom: '2024-08-11T12:55:00.845Z',
    dateTo: '2024-08-11T18:43:00.375Z',
    destination: '4',
    isFavorite: false,
    offers: [
      '1',
      '3'
    ]
  },

  {
    id: '2',
    type: 'restaurant',
    basePrice: 5400,
    dateFrom: '2024-08-11T12:55:00.845Z',
    dateTo: '2024-08-11T18:43:00.375Z',
    destination: '2',
    isFavorite: false,
    offers: []
  },

  {
    id: '3',
    type: 'flight',
    basePrice: 2000,
    dateFrom: '2024-08-11T12:55:00.845Z',
    dateTo: '2024-08-11T18:43:00.375Z',
    destination: '5',
    isFavorite: false,
    offers: [
      '2',
      '3'
    ]
  },

  {
    id: '4',
    type: 'check-in',
    basePrice: 300,
    dateFrom: '2024-08-11T12:55:00.845Z',
    dateTo: '2024-08-11T18:43:00.375Z',
    destination: '7',
    isFavorite: false,
    offers: [
      '1'
    ]
  },

  BLANK_POINT,

  {
    id: '6',
    type: 'taxi',
    basePrice: 3000,
    dateFrom: '2024-07-08T12:55:00.845Z',
    dateTo: '2024-07-08T13:22:00.375Z',
    destination: '1',
    isFavorite: false,
    offers: [
      '1',
      '2'
    ]
  },

  {
    id: '7',
    type: 'bus',
    basePrice: 5000,
    dateFrom: '2024-10-01T14:24:00.845Z',
    dateTo: '2024-10-01T16:24:00.375Z',
    destination: '3',
    isFavorite: true,
    offers: [
      '1',
      '2'
    ]
  },

  {
    id: '8',
    type: 'train',
    basePrice: 5500,
    dateFrom: '2024-09-16T04:20:00.845Z',
    dateTo: '2024-09-24T04:40:00.375Z',
    destination: '4',
    isFavorite: false,
    offers: [
      '1',
      '2',
      '3'
    ]
  }
];

export {mockPoints};
