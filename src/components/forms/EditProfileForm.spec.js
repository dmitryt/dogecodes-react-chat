import React from 'react';
import { mount } from 'enzyme';

import { EditProfileForm } from './EditProfileForm';

const defaultProps = {
  classes: {},
  open: true,
  user: { firstName: 'John', lastName: 'Doe', username: 'johndoe' },
};

const setupComponent = props => <EditProfileForm {...defaultProps} {...props} />;

describe('<EditProfileForm />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(EditProfileForm)).toHaveLength(1);
  });
  it('should fill form with user data, when form is opened correctly', () => {
    const wrapper = mount(setupComponent());
    const data = wrapper.find('input').map(e => e.getDOMNode().value);
    expect(data).toEqual(['johndoe', 'John', 'Doe']);
  });
  it('should handle onSubmit action', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(setupComponent({ onSubmit }));
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'John12' } });
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'Doe23' } });
    wrapper.find('form').simulate('submit');
    const expectedData = { firstName: 'John12', lastName: 'Doe23', username: 'johndoe' };
    expect(onSubmit).toHaveBeenCalledWith(expectedData, expect.anything());
  });
});
