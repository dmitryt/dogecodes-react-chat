import React from 'react';
import { mount } from 'enzyme';

import { SideBar } from './SideBar';

const defaultProps = {
  classes: {},
  allChats: [],
  myChats: [],
  disabled: false,
};

const setupComponent = (props, children = <span />) => (
  <SideBar {...defaultProps} {...props}>
    {children}
  </SideBar>
);

describe('<SideBar />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(SideBar)).toHaveLength(1);
  });
});
