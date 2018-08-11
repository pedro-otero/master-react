import React from 'react';
import { shallow } from 'enzyme';

import Progress from './progress';

describe('Progress indicator', () => {
  it('renders accordingly with size', () => {
    const wrapper = shallow(<Progress
        size="big"
        value={50} />);
    expect(wrapper.find('div[className="progress big-progress"]')).toHaveLength(1);
  });
});
