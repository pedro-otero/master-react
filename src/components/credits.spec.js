import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Credits from './credits';

Enzyme.configure({ adapter: new Adapter() });

describe('Credits component', () => {
  const wrapper = shallow(<Credits data={{}} />);

  it('has no Collaborators component', () => {
    expect(wrapper.find('Collaborator')).toHaveLength(0);
  });
});
