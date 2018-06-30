import React from 'react';
import { mount } from 'enzyme';
import { ListItem } from 'material-ui/List';

import { ChatsList } from './ChatsList';

const defaultProps = {
  classes: {},
  disabled: false,
  chats: [],
};

const setupComponent = props => <ChatsList {...defaultProps} {...props} />;

describe('<ChatsList />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(ChatsList)).toHaveLength(1);
  });

  it('should select chat, when user clicks on chats list item correctly', () => {
    const onSelect = jest.fn();
    const chats = [{ _id: '123' }, { _id: '234' }, { _id: '345' }];
    const wrapper = mount(setupComponent({ chats, onSelect }));
    wrapper
      .find(ListItem)
      .at(1)
      .simulate('click');
    expect(onSelect).toHaveBeenCalledWith('234');
  });
});
