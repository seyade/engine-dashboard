import React from 'react';
import enzyme, { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Dashboard } from './index';

configure({ adapter: new Adapter() });

describe('Dashboard Panel', () => {
  let wrapper = mount(<Dashboard />);

  it('should be rendered', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should be titled "Dashboard', () => {
    expect(wrapper.find('.dashboard__title').text()).toBe('Dashboard');
  });

  describe('Sidebar in Dashboard', () => {
    it('should be rendered', () => {
      expect(wrapper.find('.sidebar').length).toEqual(1);
    });
  });
});
