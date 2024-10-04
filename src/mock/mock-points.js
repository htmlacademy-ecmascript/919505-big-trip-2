const mockPoints = [
  {
    id: '1',
    type: 'taxi',
    basePrice: 1100,
    dateFrom: '2024-07-08T12:55:56.845Z',
    dateTo: '2024-07-11T11:22:13.375Z',
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
    dateFrom: '2024-10-01T14:24:56.845Z',
    dateTo: '2024-10-04T16:00:13.375Z',
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
    dateFrom: '2024-09-16T04:20:56.845Z',
    dateTo: '2024-09-24T18:40:13.375Z',
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
