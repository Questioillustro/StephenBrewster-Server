const STORIES = [
  {
    _id: '1',
    systemContext: ['You are telling stories to children'],
    name: 'Fire Escape',
    imageUrl: 'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/cyoa_fire_escape_01.jpg',
    description: "Escape the burning building before you're cooked!",
    quickStoryPrompts: [
      'Tell a story about waking up in a burning building',
    ],
    __v: 3,
  },
  {
    _id: '2',
    systemContext: ['You are telling stories to children'],
    name: 'Forest Rescue',
    imageUrl:
      'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/cyoa_forest_rescue_01.png',
    description: 'Save your sister from the spooky forest before the monsters get her!',
    quickStoryPrompts: [
      'Tell a story about searching for someone who is lost in a haunted forest',
    ],
    __v: 2,
  },
  {
    _id: '3',
    systemContext: ['You are telling stories to children'],
    name: 'The Universe',
    imageUrl:
      'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/cyoa_universal_mystery_01.jpg',
    description: 'Explore the universe and find out its deepest secret!',
    quickStoryPrompts: ['Tell a story about exploring the universe'],
    __v: 2,
  },
  {
    _id: '4',
    systemContext: ['You are telling stories to children'],
    name: 'Explore a New World',
    imageUrl: 'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/exploringnewworld.png',
    description: 'Explore a brand new planet!',
    quickStoryPrompts: [
      'Tell a story about exploring a newly discovered planet somewhere in the universe',
    ],
    __v: 2,
  },
  {
    _id: '5',
    systemContext: ['You are telling educational stories to children'],
    name: 'Democracy',
    imageUrl: 'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/democracy.png',
    description: 'Learn how democracy works!',
    quickStoryPrompts: [
      'Tell a story about democracy',
    ],
    __v: 2,
  },
  {
    _id: '6',
    systemContext: ['You are telling educational stories to children'],
    name: 'Learn About Japan',
    imageUrl: 'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/japan.png',
    description: 'Learn all about Japan!',
    quickStoryPrompts: [
      'Tell a story about exploring Japanese culture and history',
    ],
    __v: 2,
  },
  {
    _id: '7',
    systemContext: ['You are telling educational stories to children'],
    name: 'The Solar System',
    imageUrl: 'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/solarsystem.png',
    description: 'Learn all about our solar system!',
    quickStoryPrompts: [
      'Tell a story about exploring the solar system, include interesting facts about all aspects of the objects within it',
    ],
    __v: 2,
  },
  {
    _id: '8',
    systemContext: ['You are telling educational stories to children'],
    name: 'Respect',
    imageUrl: 'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/respect.png',
    description: 'Learn all about respecting your fellow humans!',
    quickStoryPrompts: [
      'Tell a story about learning to respect other people',
    ],
    __v: 2,
  },
  {
    _id: '9',
    systemContext: ['You are telling educational stories to children'],
    name: 'Random Adventure',
    imageUrl: 'https://azurefunctionsapp2022060.blob.core.windows.net/cyoa/random.png',
    description: 'Go on an entirely random adventure!',
    quickStoryPrompts: ['Tell a completely random story about any topic at all', 'To ensure randomness, assign key details like the main character, name, species, adventure type, and location to numbers and roll for each, create 20 options for each'],
    __v: 2,
  },
];

export default STORIES;
