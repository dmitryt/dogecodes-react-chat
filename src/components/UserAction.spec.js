import React from 'react';
import { mount } from 'enzyme';

import { UserAction } from './UserAction';
import { getUser } from '../../spec/fixtures';

const defaultProps = {
  classes: {},
  user: getUser(),
  color: 'grey',
  createdAt: '123',
  content: '123',
};

const setupComponent = props => <UserAction {...defaultProps} {...props} />;

describe('<UserAction />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(UserAction)).toHaveLength(1);
  });
});
