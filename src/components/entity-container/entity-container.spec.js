import React from 'react';
import { shallow } from 'enzyme';
import { EntityContainer } from 'components/EntityContainer';

describe('Entity container', () => {
  const Dummy = () => <span></span>;

  it('calls clearErrors', () => {
    const Wrapped = EntityContainer(Dummy, () => true);
    const clearErrors = jest.fn();

    shallow(<Wrapped
        clearErrors={clearErrors}
        loadSearchResult={() => {}}
        load={() => {}}
        album={{}}
    />);

    expect(clearErrors).toBeCalled();
  });

  it('calls load', () => {
    const Wrapped = EntityContainer(Dummy, () => true);
    const load = jest.fn();

    shallow(<Wrapped
        clearErrors={() => {}}
        loadSearchResult={() => {}}
        load={load}
        album={{}}
    />);

    expect(load).toBeCalled();
  });

  it('starts album search on mount', () => {
    const Wrapped = EntityContainer(Dummy, () => true);
    const loadSearchResult = jest.fn();

    shallow(<Wrapped
        clearErrors={() => {}}
        loadSearchResult={loadSearchResult}
        load={() => {}}
        album={{}}
    />);

    expect(loadSearchResult).toBeCalled();
  });

  it('starts album search on update', () => {
    const Wrapped = EntityContainer(Dummy, jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(true));
    const loadSearchResult = jest.fn();

    const wrapper = shallow(<Wrapped
        clearErrors={() => {}}
        loadSearchResult={loadSearchResult}
        load={() => {}}
        album={{}}
    />);
    wrapper.setProps({});

    expect(loadSearchResult).toBeCalled();
  });

  it('stops album search when done', () => {
    const clearIntervalSpy = jest.spyOn(global.window, 'clearInterval');
    const Wrapped = EntityContainer(Dummy, () => true);
    const wrapper = shallow(<Wrapped
        clearErrors={() => {}}
        loadSearchResult={() => {}}
        load={() => {}}
        album={{}}
    />);
    wrapper.setProps({ progress: 100 });

    expect(clearIntervalSpy).toBeCalled();

    clearIntervalSpy.mockRestore();
  });

  it('stops album search on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global.window, 'clearInterval');
    const Wrapped = EntityContainer(Dummy, () => true);
    const wrapper = shallow(<Wrapped
        clearErrors={() => {}}
        loadSearchResult={() => {}}
        load={() => {}}
        album={{}}
    />);
    wrapper.unmount();

    expect(clearIntervalSpy).toBeCalled();

    clearIntervalSpy.mockRestore();
  });
});
