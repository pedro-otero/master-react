import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App container', () => {
  it('gets all playback data', () => {
    const mockApi = {
      getCurrentPlayback: jest.fn(() => Promise.resolve({
        body: {
          item: {
            artists: [{}],
            album: {
              images: [{}],
            },
          },
        },
      })),
      getArtist: jest.fn(() => Promise.resolve({ body: { id: 'AL1' } })),
      getAlbum: jest.fn(() => Promise.resolve({ body: { id: 'AR1' } })),
    };
    const backend = {
      getCredits: jest.fn(() => Promise.resolve({
        progress: 0,
        bestMatch: {
          tracks: [{
            composers: [],
            producers: [],
            credits: {},
          }],
        },
      })),
    };
    shallow(<App
      spotifyApi={mockApi}
      backend={backend}/>);
  });
});
