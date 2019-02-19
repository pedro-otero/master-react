import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'components/View';

describe('View', () => {
  it('calls clearErrors', () => {
    const clearErrors = jest.fn();

    shallow(<View
        canStartLoadingDetails={() => true}
        clearErrors={clearErrors}
        loadSearchResult={() => {}}
        load={() => {}}
        shouldStopSearching={() => {}}
    >
      <span></span>
    </View>);

    expect(clearErrors).toBeCalled();
  });

  it('calls load', () => {
    const load = jest.fn();

    shallow(<View
        canStartLoadingDetails={() => true}
        clearErrors={() => {}}
        loadSearchResult={() => {}}
        load={load}
        shouldStopSearching={() => {}}
    />);

    expect(load).toBeCalled();
  });

  it('starts album search on mount', () => {
    const loadSearchResult = jest.fn();

    shallow(<View
        canStartLoadingDetails={() => true}
        clearErrors={() => {}}
        loadSearchResult={loadSearchResult}
        load={() => {}}
        shouldStopSearching={() => {}}
    />);

    expect(loadSearchResult).toBeCalled();
  });

  it('starts album search on update', () => {
    const loadSearchResult = jest.fn();

    const wrapper = shallow(<View
        canStartLoadingDetails={jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true)}
        clearErrors={() => {}}
        loadSearchResult={loadSearchResult}
        load={() => {}}
        shouldStopSearching={() => {}}
    />);
    wrapper.setProps({});

    expect(loadSearchResult).toBeCalled();
  });

  it('stops album search when done', () => {
    const clearIntervalSpy = jest.spyOn(global.window, 'clearInterval');
    const wrapper = shallow(<View
        canStartLoadingDetails={() => true}
        clearErrors={() => {}}
        loadSearchResult={() => {}}
        load={() => {}}
        shouldStopSearching={() => true}
    />);
    wrapper.setProps({ progress: 100 });

    expect(clearIntervalSpy).toBeCalled();

    clearIntervalSpy.mockRestore();
  });

  it('stops album search on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global.window, 'clearInterval');
    const wrapper = shallow(<View
        canStartLoadingDetails={() => true}
        clearErrors={() => {}}
        loadSearchResult={() => {}}
        load={() => {}}
        shouldStopSearching={() => {}}
    />);
    wrapper.unmount();

    expect(clearIntervalSpy).toBeCalled();

    clearIntervalSpy.mockRestore();
  });

  it('renders loading message', () => {
    const wrapper = shallow(<View
        load={() => {}}
        clearErrors={() => {}}
        canStartLoadingDetails={() => false}
        loading
        loadingMessage="I am waiting..."
    />);

    expect(wrapper.find('LoadingCircle[message="I am waiting..."]')).toHaveLength(1);
  });

  it('renders failure message', () => {
    const wrapper = shallow(<View
        load={() => {}}
        clearErrors={() => {}}
        canStartLoadingDetails={() => false}
        failed
        failedMessage="Could not load this"
    />);

    expect(wrapper.find('h1').text()).toEqual('Could not load this');
  });

  it('renders contents', () => {
    const wrapper = shallow(<View
        load={() => {}}
        clearErrors={() => {}}
        canStartLoadingDetails={() => false}
        loading={false}
        failed={false}
    >
      <p>Content</p>
    </View>);

    expect(wrapper.find('p').text()).toEqual('Content');
  });
});
