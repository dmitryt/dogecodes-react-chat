import authTypes from './auth';
import notificationTypes from './notification';
import chatsTypes from './chats';
import servicesTypes from './services';

export default {
  ...authTypes,
  ...notificationTypes,
  ...chatsTypes,
  ...servicesTypes,
};
