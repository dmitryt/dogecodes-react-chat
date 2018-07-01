import React from 'react';
import { mount, shallow } from 'enzyme';
import { Tab } from 'material-ui/Tabs';

import { WelcomePage } from './WelcomePage';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';

const defaultProps = {
  classes: {},
  isAuthenticated: false,
  notification: null,
};

const setupComponent = props => <WelcomePage {...defaultProps} {...props} />;

describe('<WelcomePage />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(WelcomePage)).toHaveLength(1);
    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(wrapper.find(SignupForm)).toHaveLength(0);
  });
  it('should show SignupForm, when user clicks on correspondent tab', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(SignupForm)).toHaveLength(0);
    wrapper
      .find(Tab)
      .at(1)
      .simulate('click');
    expect(wrapper.find(SignupForm)).toHaveLength(1);
  });

  it('should show SignupForm, when user clicks on correspondent tab', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(SignupForm)).toHaveLength(0);
    wrapper
      .find(Tab)
      .at(1)
      .simulate('click');
    expect(wrapper.find(SignupForm)).toHaveLength(1);
  });

  it('should redirect user to chats page, when user is authenticated', () => {
    const wrapper = shallow(setupComponent());
    expect(wrapper.find('Redirect')).toHaveLength(0);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find('Redirect').prop('to')).toBe('/chats');
  });
});
