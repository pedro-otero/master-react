import React from 'react';
import { shallow } from 'enzyme';
import { EntityContainer } from 'components/EntityContainer';

describe('Entity container', () => {
  const Dummy = () => <span></span>;
  const Wrapped = EntityContainer(Dummy, 'itemId');
  const mocks = [jest.fn(), jest.fn(), jest.fn()];
  const [load, clearErrors, loadSearchResult] = mocks;
  const album = { id: '3' };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Wrapped
        itemId="1"
        clearErrors={clearErrors}
        loadSearchResult={loadSearchResult}
        load={load}
        album={album}
      />);
  });

  it('calls clearErrors', () => {
    expect(clearErrors).toBeCalled();
  });

  it('calls load', () => {
    expect(load).toBeCalled();
  });

  it('stops album search', () => {
    const albumSearch = {
      unsubscribe: jest.fn(),
    };
    wrapper.instance().albumSearch = albumSearch;

    wrapper.unmount();

    expect(albumSearch.unsubscribe).toBeCalled();
  });

  it('loads the new album', () => {
    wrapper.setProps({ itemId: '2' });

    expect(load).toBeCalled();
  });

  afterEach(() => {
    mocks.forEach(mock => mock.mockClear());
  });
});
