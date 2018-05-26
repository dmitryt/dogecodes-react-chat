import authTypes from './auth';
import notificationTypes from './notification';
import servicesTypes from './services';
import chatsTypes from './chats';

export default {
  ...authTypes,
  ...notificationTypes,
  ...servicesTypes,
  ...chatsTypes,
};
