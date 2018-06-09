import PropTypes from 'prop-types';

export const userShape = PropTypes.shape({
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
});

const messageShape = PropTypes.shape({
  sender: userShape,
  content: PropTypes.string.isRequired,
});

const chat = {};

export const chatShape = PropTypes.shape(chat);

export const activeChatShape = PropTypes.shape({
  ...chat,
  messages: PropTypes.arrayOf(messageShape),
});

export const notificationShape = PropTypes.shape({
  level: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
});
