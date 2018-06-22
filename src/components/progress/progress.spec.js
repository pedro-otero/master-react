import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Progress from './progress';

Enzyme.configure({ adapter: new Adapter() });

describe('Progress indicator', () => {
  it('renders accordingly with size', () => {
    const wrapper = shallow(<Progress
        size="big"
        value={50} />);
    expect(wrapper.find('div[className="progress big-progress"]')).toHaveLength(1);
  });
});
