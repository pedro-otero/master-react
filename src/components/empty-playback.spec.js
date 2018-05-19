import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EmptyPlayback from './empty-playback';

Enzyme.configure({ adapter: new Adapter() });

describe('Empty playback component', () => {
  it('just works', () => {
    shallow(<EmptyPlayback />);
  });
});
