import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Album } from './album';

Enzyme.configure({ adapter: new Adapter() });

describe('Album component', () => {
  it('renders empty OK', () => {
    shallow(<Album />);
  });
});
