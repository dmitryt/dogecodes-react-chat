import React from 'react';
import { mount } from 'enzyme';

import { CreateChatForm } from './CreateChatForm';

const defaultProps = {
  classes: {},
  open: true,
};

const setupComponent = props => <CreateChatForm {...defaultProps} {...props} />;

describe('<CreateChatForm />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(CreateChatForm)).toHaveLength(1);
  });
  it("shouldn't allow create chat, if user doesn't fill the title", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(setupComponent({ onSubmit }));
    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
  it('should handle onSubmit action', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(setupComponent({ onSubmit }));
    wrapper.find('input').simulate('change', { target: { value: '123' } });
    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({ title: '123' }, expect.anything());
  });
});
