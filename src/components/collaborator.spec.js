import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Collaborator from './collaborator';

Enzyme.configure({ adapter: new Adapter() });

describe('Collaborator component', () => {
  const wrapper = shallow(<Collaborator
      name="P1"
      roles={['R1']} />);

  it('shows name', () => {
    expect(wrapper.find('h5[className="collaboratorName"]')).toHaveLength(1);
  });
});
