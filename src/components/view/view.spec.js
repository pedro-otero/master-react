import React from 'react';
import { shallow } from 'enzyme';

import View from './view';

describe('View component', () => {
  it('renders loading message', () => {
    const wrapper = shallow(<View
        loadHeader={() => {}}
        loading
        loadingMessage="I am waiting..."
    />);

    expect(wrapper.find('LoadingCircle[message="I am waiting..."]')).toHaveLength(1);
  });

  it('renders failure message', () => {
    const wrapper = shallow(<View
        loadHeader={() => {}}
        failed
        failedMessage="Could not load this"
    />);

    expect(wrapper.find('h1').text()).toEqual('Could not load this');
  });

  it('renders contents', () => {
    const wrapper = shallow(<View
        loadHeader={() => {}}
        loading={false}
        failed={false}
    >
      <p>Content</p>
    </View>);

    expect(wrapper.find('p').text()).toEqual('Content');
  });
});
