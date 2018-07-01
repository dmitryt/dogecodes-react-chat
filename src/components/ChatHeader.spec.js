import React from 'react';
import { mount } from 'enzyme';
import IconButton from 'material-ui/IconButton';
import { MenuItem } from 'material-ui/Menu';

import { ChatHeader } from './ChatHeader';

import { getActiveChat } from '../../spec/fixtures';

const defaultProps = {
  classes: {},
  isCreator: false,
  isChatMember: false,
  disabled: false,
};
const setupComponent = (props = {}) => <ChatHeader {...defaultProps} {...props} />;
const getMenuButtons = c => c.find(IconButton);
const getMenuButtonsIds = c => getMenuButtons(c).map(el => el.getDOMNode().getAttribute('data-id'));

describe('<ChatHeader />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(ChatHeader)).toHaveLength(1);
    expect(getMenuButtonsIds(wrapper)).toEqual(['anchorElUser']);
  });
  it("should show chat's title and Menu, if user has joined to chat", () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find('.chat-title')).toHaveLength(0);
    wrapper.setProps({ activeChat: getActiveChat({ title: 'Some Chat' }), isChatMember: true });
    expect(wrapper.find('.chat-title').text()).toBe('Some Chat');
    expect(getMenuButtonsIds(wrapper)).toEqual(['anchorElChat', 'anchorElUser']);
  });
  it('should allow user to start editing profile successfully', () => {
    const openProfileDialog = jest.fn();
    const wrapper = mount(setupComponent({ openProfileDialog }));
    getMenuButtons(wrapper).simulate('click');
    wrapper
      .find(MenuItem)
      .at(0)
      .simulate('click');
    expect(openProfileDialog).toHaveBeenCalled();
  });
  it('should allow user to logout successfully', () => {
    const logout = jest.fn();
    const wrapper = mount(setupComponent({ logout }));
    getMenuButtons(wrapper).simulate('click');
    wrapper
      .find(MenuItem)
      .at(1)
      .simulate('click');
    expect(logout).toHaveBeenCalled();
  });
  it('should allow user to leave chat successfully', () => {
    const leaveChat = jest.fn();
    const wrapper = mount(setupComponent({
      activeChat: getActiveChat({ title: 'Some Chat' }),
      isChatMember: true,
      leaveChat,
    }));
    getMenuButtons(wrapper)
      .at(0)
      .simulate('click');
    wrapper.find(MenuItem).simulate('click');
    expect(leaveChat).toHaveBeenCalled();
  });
  it("should allow chat's owner to delete chat successfully", () => {
    const deleteChat = jest.fn();
    const wrapper = mount(setupComponent({
      activeChat: getActiveChat({ title: 'Some Chat' }),
      isChatMember: true,
      isCreator: true,
      deleteChat,
    }));
    getMenuButtons(wrapper)
      .at(0)
      .simulate('click');
    wrapper.find(MenuItem).simulate('click');
    expect(deleteChat).toHaveBeenCalled();
  });
});
