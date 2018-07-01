import React from 'react';
import { mount } from 'enzyme';
import { BottomNavigationAction } from 'material-ui/BottomNavigation';

import { NavBar } from './NavBar';

const defaultProps = {
  classes: {},
  chatsType: 'all',
};

const setupComponent = props => <NavBar {...defaultProps} {...props} />;

describe('<NavBar />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(NavBar)).toHaveLength(1);
  });

  it('should allow user to select tab correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(setupComponent({ onChange }));
    wrapper
      .find(BottomNavigationAction)
      .at(1)
      .simulate('click');
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 'all');
  });
});
