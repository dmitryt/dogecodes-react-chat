import React from 'react';
import { mount } from 'enzyme';
import Button from 'material-ui/Button';

import { ChatPage } from './ChatPage';
import MessageInput from './MessageInput';
import { getActiveChat } from '../../spec/fixtures';

const defaultProps = {
  classes: {},
  match: { params: {} },
  allChats: [],
  myChats: [],
  isConnected: true,
  isCreator: false,
  isChatMember: false,
  disabled: false,
};

const setupComponent = props => <ChatPage {...defaultProps} {...props} />;

describe('<ChatPage />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(ChatPage)).toHaveLength(1);
  });
  it('should render joinChat button, if user opens a chat and he is not a chat member', () => {
    const joinChat = jest.fn();
    const wrapper = mount(setupComponent({ joinChat }));
    expect(wrapper
      .find(Button)
      .map(b => b.text())
      .includes('Join Chat')).toBeFalsy();

    wrapper.setProps({ activeChat: getActiveChat({ title: 'Some Chat' }) });
    expect(wrapper
      .find(Button)
      .map(b => b.text())
      .includes('Join Chat')).toBeTruthy();

    const index = wrapper
      .find(Button)
      .map(b => b.text())
      .indexOf('Join Chat');
    wrapper
      .find(Button)
      .at(index)
      .simulate('click');
    expect(joinChat).toHaveBeenCalled();
  });
  it('should render input field, if user opens a chat and he is a chat member', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(MessageInput)).toHaveLength(0);
    wrapper.setProps({ activeChat: getActiveChat({ title: 'Some Chat' }), isChatMember: true });
    expect(wrapper.find(MessageInput)).toHaveLength(1);
  });
});
