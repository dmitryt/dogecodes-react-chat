import React from 'react';
import { mount } from 'enzyme';
/* eslint-disable-next-line */
import UserMessage from './UserMessage';
import { ChatContent } from './ChatContent';

import { getActiveChat } from '../../spec/fixtures';

jest.mock('./UserMessage');

const setupComponent = (props, children = <span />) => (
  <ChatContent classes={{}} {...props}>
    {children}
  </ChatContent>
);

const getMessages = list => list.map((content, _id) => ({ _id, content }));

describe('<ChatContent />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(ChatContent)).toHaveLength(1);
  });

  it('should render inner content, when user connected to chat', () => {
    const wrapper = mount(setupComponent({}, <span className="some-inner-content" />));
    expect(wrapper.find('.some-inner-content')).toHaveLength(0);
    wrapper.setProps({ activeChat: getActiveChat() });
    expect(wrapper.find('.some-inner-content')).toHaveLength(1);
  });

  it('should render messages, if they are provided', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(UserMessage)).toHaveLength(0);
    wrapper.setProps({ activeChat: getActiveChat({ messages: getMessages(['123', '234']) }) });
    expect(wrapper.find(UserMessage)).toHaveLength(2);
  });
});
