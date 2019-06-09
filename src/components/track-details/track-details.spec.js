import React from 'react';
import { shallow } from 'enzyme';

import { TrackDetails } from './track-details';

describe('TrackDetails component', () => {
  it('hides composers and producers list', () => {
    const wrapper = shallow(<TrackDetails />);

    expect(wrapper.find('JointList')).toHaveLength(0);
  });

  it('displays the banner', () => {
    const wrapper = shallow(<TrackDetails
        name="Track name"
        background="ImgUrl" />);

    expect(wrapper.find('ArtistWork').prop('title')).toEqual('Track name');
  });

  it('does not display small progress indicator', () => {
    const wrapper = shallow(<TrackDetails
        name="Track name"
        progress={0} />);

    expect(wrapper.find('Progress[size="small"]')).toHaveLength(0);
  });

  it('does not display big progress indicator', () => {
    const wrapper = shallow(<TrackDetails
        name="Track name"
        progress={10} />);

    expect(wrapper.find('Progress[size="big"]')).toHaveLength(0);
  });

  it('does not display big progress indicator', () => {
    const wrapper = shallow(<TrackDetails
        name="Track name"
        progress={100} />);

    expect(wrapper.find('Progress[className="big-progress"]')).toHaveLength(0);
  });

  it('does not display small progress indicator', () => {
    const wrapper = shallow(<TrackDetails
        name="Track name"
        progress={100} />);

    expect(wrapper.find('Progress[className="small-progress"]')).toHaveLength(0);
  });

  it('clears the album in view', () => {
    const clearAlbumInView = jest.fn();
    const wrapper = shallow(<TrackDetails clearAlbumInView={clearAlbumInView} />);

    wrapper.unmount();

    expect(clearAlbumInView).toHaveBeenCalled();
  });
});
