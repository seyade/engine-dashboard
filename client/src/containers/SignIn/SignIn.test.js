import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignIn } from './index';

configure({ adapter: new Adapter() });

const props = {
  auth: {
    isAuthenticated: false
  },
  signinUser: jest.fn()
};

// console.log('JEST', jest);

describe('SignIn Component', () => {
  let component;

  component = shallow(<SignIn {...props} />);

  it('should render the form', () => {
    expect(component.length).toEqual(1);

    expect(component.find('form.signin__form').exists()).toBe(true);
  });

  it('should login user', () => {
    component.find('.signin__form').simulate('submit', { preventDefault() {} });

    expect(props.signinUser).toHaveBeenCalled();
  });
});
