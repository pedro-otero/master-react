import React from 'react';
import { shallow } from 'enzyme';

import Collaborator from './collaborator';

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
