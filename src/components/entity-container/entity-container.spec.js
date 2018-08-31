import React from 'react';
import { shallow } from 'enzyme';
import { EntityContainer } from 'components/EntityContainer';

describe('Entity container', () => {
  const Dummy = () => <span></span>;
  const Wrapped = EntityContainer(Dummy, 'itemId');
  const mocks = [jest.fn(), jest.fn(), jest.fn()];
  const [load, clearErrors, loadSearchResult] = mocks;

  const wrapper = shallow(<Wrapped
      itemId="1"
      clearErrors={clearErrors}
      loadSearchResult={loadSearchResult}
      load={load}
  />);

  it('calls clearErrors', () => {
    expect(clearErrors).toBeCalled();
  });

  it('calls load', () => {
    expect(load).toBeCalled();
  });
});
