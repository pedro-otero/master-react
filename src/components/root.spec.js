import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Root } from './root';

Enzyme.configure({ adapter: new Adapter() });

describe('Root component', () => {
  it('Loads profile if user is authenticated', () => {
    const mock = jest.fn();
    shallow(<Root isAuthenticated={true} loadProfile={mock} />);
    expect(mock).toBeCalled();
  });
});
