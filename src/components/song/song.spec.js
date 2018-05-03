import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Song } from './song';
import initialState from '../../store/initalState';

Enzyme.configure({ adapter: new Adapter() });

describe('Song component', () => {
  describe('initial state', () => {
    const wrapper = shallow(<Song
      data={initialState.song.credits}
      track={initialState.song.track}
      album={initialState.song.album}
      artist={initialState.song.artist}/>);

    it('hides composers list', () => {
      expect(wrapper.find('span[className="composers"]')).toHaveLength(0);
    });

    it('hides producers list', () => {
      expect(wrapper.find('span[className="producers"]')).toHaveLength(0);
    });

    it('shows all-data-empty section', () => {
      expect(wrapper.find('div[className="all-data-empty"]')).toHaveLength(1);
    });
  });

  describe('search responded without credits', () => {
    const wrapper = shallow(<Song
      data={initialState.song.credits}
      track={Object.assign({}, initialState.song.track, { id: 'T1' })}
      album={initialState.song.album}
      artist={initialState.song.artist}/>);

    it('displays big progress indicator', () => {
      expect(wrapper.find('progress[className="big-progress"]')).toHaveLength(1);
    });
  });
});
