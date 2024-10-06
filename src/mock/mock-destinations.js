const mockDestinations = [
  {
    id: '1',
    name: 'Paris',
    description: 'У этой точки есть офферы, описание и картинка',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1241522',
        description: 'Paris parliament building'
      }
    ]
  },

  {
    id: '2',
    name: 'Chamonix',
    description: 'У этой точки нет офферов, но есть описание и картинка',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=3265236',
        description: 'Chamonix parliament building'
      }
    ]
  },

  {
    id: '3',
    name: 'London',
    description: 'London is the capital of Great Britain.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=158807',
        description: 'A photo of London'
      }
    ]
  },

  {
    id: '4',
    name: 'Berlin',
    description: 'Berlin is the capital of Germany.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=32552',
        description: 'A photo of Berlin'
      }
    ]
  },

  {
    id: '5',
    name: 'Madrid',
    description: 'У этой точки нет картинки, но есть офферы и описание',
    pictures: []
  },

  {
    id: '6',
    name: 'Zurich',
    description: '',
    pictures: []
  }
];

export {mockDestinations};
