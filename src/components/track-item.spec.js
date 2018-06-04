import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TrackItem from './track-item';

Enzyme.configure({ adapter: new Adapter() });

describe('Track item component', () => {
  it('renders OK', () => {
    shallow(<TrackItem />);
  });
});
