import React from 'react';
import { mount } from 'enzyme';

import { LoginForm } from './LoginForm';

const defaultProps = {
  classes: {},
};

const setupComponent = props => <LoginForm {...defaultProps} {...props} />;

describe('<LoginForm />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
  it("shouldn't allow login, if user doesn't fill username/password", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(setupComponent({ onSubmit }));
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'john' } });
    wrapper.find('form').simulate('submit');
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: '123' } });
    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
  it('should handle onSubmit action', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(setupComponent({ onSubmit }));
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'john' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: '123' } });
    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({ username: 'john', password: '123' }, expect.anything());
  });
});
