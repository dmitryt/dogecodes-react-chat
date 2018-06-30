import React from 'react';
import { mount } from 'enzyme';

import { MessageInput } from './MessageInput';

const defaultProps = {
  classes: {},
  disabled: false,
};

const setupComponent = props => <MessageInput {...defaultProps} {...props} />;

describe('<MessageInput />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(MessageInput)).toHaveLength(1);
  });

  it('should submit entered value, when user clicked on "Enter"', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(setupComponent({ onSubmit }));
    const event = { target: { value: '234' } };
    wrapper.find('input').simulate('change', event);
    wrapper.find('input').simulate('keyUp', { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('234');
  });

  it("shouldn't submit entered value, when user doesn't enter anything", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(setupComponent({ onSubmit }));
    wrapper.find('input').simulate('keyUp', { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
