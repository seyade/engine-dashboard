import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// elements
import Sidebar from './index';

configure({ adapter: new Adapter() });

describe('Sidebar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Sidebar />);
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render the user info', () => {
    expect(wrapper.find('user-info').length).toEqual(1);
  });
});
