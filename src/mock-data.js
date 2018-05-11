import faker from 'faker';

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const COUNT_OF_CHATS = 20;

export const chatsData = Array.from({ length: COUNT_OF_CHATS }).map((_, i) => ({
  id: faker.random.uuid(),
  title: faker.lorem.words(3),
  color: faker.internet.color(120, 120, 120),
  time: `${faker.random.number(10)} ${faker.random.arrayElement(['minutes', 'hours', 'seconds'])} ago`,
  username: `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

const COUNT_OF_MESSAGES = 20;

const userMessages = Array.from({ length: COUNT_OF_MESSAGES }).map((_, i) => ({
  id: faker.random.uuid(),
  color: faker.internet.color(120, 120, 120),
  time: `${faker.random.number(10)} ${faker.random.arrayElement(['minutes', 'hours', 'seconds'])} ago`,
  username: `${faker.name.firstName()} ${faker.name.lastName()}`,
  message: faker.lorem.sentence(),
  type: 'message'
}));

const userStatuses = Array.from({ length: COUNT_OF_MESSAGES }).map((_, i) => ({
  id: faker.random.uuid(),
  color: faker.internet.color(120, 120, 120),
  time: `${faker.random.number(10)} ${faker.random.arrayElement(['minutes', 'hours', 'seconds'])} ago`,
  username: `${faker.name.firstName()} ${faker.name.lastName()}`,
  action: faker.random.arrayElement(['joined', 'left']),
  type: 'info'
}));

export const messagesData = shuffle(userMessages.concat(userStatuses));
