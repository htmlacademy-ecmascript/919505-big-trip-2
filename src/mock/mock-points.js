const mockPoints = [
  {
    id: '1',
    type: 'taxi',
    basePrice: 1100,
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
    id: '2',
    type: 'bus',
    basePrice: 5000,
    dateFrom: '2024-10-01T14:24:00.845Z',
    dateTo: '2024-10-01T16:24:00.375Z',
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
    dateFrom: '2024-09-16T04:20:00.845Z',
    dateTo: '2024-09-24T04:40:00.375Z',
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
