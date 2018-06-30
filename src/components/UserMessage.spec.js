import React from 'react';
import { mount } from 'enzyme';

import { UserMessage } from './UserMessage';
import { getUser } from '../../spec/fixtures';

const defaultProps = {
  classes: {},
  user: getUser(),
  isCreator: false,
  color: 'grey',
  createdAt: '123',
  content: '123',
};

const setupComponent = props => <UserMessage {...defaultProps} {...props} />;

describe('<UserMessage />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(UserMessage)).toHaveLength(1);
  });
});
