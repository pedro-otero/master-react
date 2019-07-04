import React from 'react';
import { shallow } from 'enzyme';

import Connected, { TrackDetails } from './track-details';

describe('TrackDetails component', () => {
  describe('Isolated', () => {
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

  describe('Connected', () => {
    it('finds data', () => {
      const store = {
        getState: () => ({
          tracks: {
            T1: {
              artistId: 'R1',
              albumId: 'L1',
              name: 'Track',
            },
          },
          albums: { L1: {} },
          artists: { R1: { name: 'Artist' } },
        }),
        subscribe: () => {},
      };

      const wrapper = shallow(<Connected trackId="T1" store={store} />);

      expect(wrapper.find('TrackDetails[name="Track"][artist="Artist"]').exists()).toEqual(true);
    });

    it('renders without data', () => {
      const store = {
        getState: () => ({
          tracks: {},
          albums: {},
          artists: {},
        }),
        subscribe: () => {},
      };

      const wrapper = shallow(<Connected trackId="T1" store={store} />);

      expect(wrapper.find('TrackDetails').prop('name')).toEqual(undefined);
    });
  });
});
