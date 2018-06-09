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

const chatModel = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  creator: PropTypes.shape(userShape),
  members: PropTypes.arrayOf(userShape).isRequired,
};

export const chatShape = PropTypes.shape(chatModel);

export const activeChatShape = PropTypes.shape({
  ...chatModel,
  messages: PropTypes.arrayOf(messageShape),
});

export const notificationShape = PropTypes.shape({
  level: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
});
