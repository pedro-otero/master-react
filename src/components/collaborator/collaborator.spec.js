import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Collaborator from './collaborator';

Enzyme.configure({ adapter: new Adapter() });

describe('Collaborator component', () => {
  const wrapper = shallow(<Collaborator
      name="P1"
      roles={['R1', 'R2']} />);

  it('shows name', () => {
    expect(wrapper.find('h3').text()).toEqual('P1:');
  });

  it('shows roles', () => {
    expect(wrapper.find('p').text()).toEqual('R1, R2');
  });
});
