import React from 'react';
import { shallow } from 'enzyme';

import Credits from './credits';

describe('Credits component', () => {
  it('can be empty', () => {
    const wrapper = shallow(<Credits data={{}} />);

    expect(wrapper.text()).toEqual('');
  });

  it('shows collaborators list', () => {
    const wrapper = shallow(<Credits data={{
      P1: ['R1'],
      P2: ['R2'],
    }} />);

    expect(wrapper.find('Collaborator')).toHaveLength(2);
  });
});
