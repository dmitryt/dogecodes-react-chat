export const getActiveChat = (args = {}) => ({
  title: '123',
  createdAt: '123',
  updatedAt: '123',
  members: [],
  messages: [],
  ...args,
});

export const getUser = (args = {}) => ({
  username: 'jojn',
  ...args,
});

export default {};
