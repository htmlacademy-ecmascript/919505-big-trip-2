const mockPoints = [
  {
    id: '1',
    type: 'taxi',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '1',
    isFavorite: false,
    offers: [
      '1',
      '2'
    ]
  },

  {
    id: '2',
    type: 'bus',
    basePrice: 5000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '2',
    isFavorite: true,
    offers: [
      '1',
      '2'
    ]
  },

  {
    id: '3',
    type: 'train',
    basePrice: 3000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [
      '1',
      '2',
      '3'
    ]
  }
];

export {mockPoints};
