import React from 'react';
import { mount } from 'enzyme';

import { SearchInput } from './SearchInput';

const defaultProps = {
  classes: {},
};

const setupComponent = props => <SearchInput {...defaultProps} {...props} />;

describe('<SearchInput />', () => {
  it('should render correctly', () => {
    const wrapper = mount(setupComponent());
    expect(wrapper.find(SearchInput)).toHaveLength(1);
  });

  it('should call onChange, when user enters anything', () => {
    const onChange = jest.fn();
    const wrapper = mount(setupComponent({ onChange }));
    const event = { target: { value: '234' } };
    wrapper.find('input').simulate('change', event);
    expect(onChange).toHaveBeenCalledWith('234');
  });
});
