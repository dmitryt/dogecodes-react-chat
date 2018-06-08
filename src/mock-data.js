/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const COUNT_OF_CHATS = 20;
const COUNT_OF_MESSAGES = 20;
const COUNT_OF_STATUSES = 20;
const COUNT_OF_OWN_MESSAGES = 20;

const getTime = () =>
  `${faker.random.number(10)} ${faker.random.arrayElement(['minutes', 'hours', 'seconds'])} ago`;
const getColor = () => faker.internet.color(100, 100, 100);
const getName = () => `${faker.name.firstName()} ${faker.name.lastName()}`;

const ownName = getName();
const ownColor = getColor();

export const chatsData = Array.from({ length: COUNT_OF_CHATS }).map(() => ({
  id: faker.random.uuid(),
  title: faker.lorem.words(3),
  color: getColor(),
  time: getTime(),
}));

const userMessages = Array.from({ length: COUNT_OF_MESSAGES }).map(() => ({
  id: faker.random.uuid(),
  color: getColor(),
  time: getTime(),
  username: getName(),
  message: faker.lorem.sentence(),
  type: 'message',
}));

const userOwnMessages = Array.from({ length: COUNT_OF_OWN_MESSAGES }).map(() => ({
  id: faker.random.uuid(),
  color: ownColor,
  time: getTime(),
  username: ownName,
  message: faker.lorem.sentence(),
  type: 'message',
  isOwn: true,
}));

const userStatuses = Array.from({ length: COUNT_OF_STATUSES }).map(() => ({
  id: faker.random.uuid(),
  color: getColor(),
  time: getTime(),
  username: getName(),
  action: faker.random.arrayElement(['joined', 'left']),
  type: 'info',
}));

export const selectedChat = {
  id: faker.random.uuid(),
  title: 'DogeCodes Chat',
  color: getColor(),
  time: getTime(),
};

export const messagesData = shuffle(userMessages.concat(userStatuses).concat(userOwnMessages));
