import React from 'react';
import { mount } from 'enzyme';

import { AddChatBtn } from './AddChatBtn';

const defaultProps = {
  classes: {},
};

const setupComponent = props => <AddChatBtn {...defaultProps} {...props} />;

describe('<AddChatBtn />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(AddChatBtn)).toHaveLength(1);
  });
});
