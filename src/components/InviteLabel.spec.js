import React from 'react';
import { mount } from 'enzyme';

import { InviteLabel } from './InviteLabel';

const setupComponent = props => <InviteLabel classes={{}} {...props} />;

describe('<InviteLabel />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(InviteLabel)).toHaveLength(1);
  });
});
