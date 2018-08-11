import React from 'react';
import { shallow } from 'enzyme';

import Credits from './credits';

describe('Credits component', () => {
  const wrapper = shallow(<Credits data={{}} />);

  it('has main div', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('has no Collaborators component', () => {
    expect(wrapper.find('Collaborator')).toHaveLength(0);
  });

  it('shows collaborators list', () => {
    wrapper.setProps({
      data: {
        P1: ['R1'],
        P2: ['R2'],
      },
    });
    expect(wrapper.find('Collaborator')).toHaveLength(2);
  });
});
