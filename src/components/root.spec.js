import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act, fireEvent } from '@testing-library/react';

import { Root } from './root';
import GlobalAppContext from '../context';

const context = {
  spotify: {
    get: url => new Promise((resolve) => {
      if (url === '/me') {
        resolve({
          data: {
            id: 'username',
            display_name: 'User',
            images: [{ url: '' }],
            country: 'CA',
          },
        });
      } else if (url === '/tracks/T1') {
        resolve({
          data: {
            id: 'T1',
            name: 'title of song',
            album: { id: 'L1', name: 'album of song' },
            artists: [{ id: 'R1', name: 'name of the artist' }],
          },
        });
      } else if (url === '/albums/L1') {
        resolve({
          data: {
            name: 'album of song',
            release_date: '2005',
            images: [{ url: '' }],
            artists: [{ id: 'R1' }],
            tracks: {
              items: [{
                id: 'T1',
                name: 'title of song',
                duration_ms: 1000,
              }],
            },
          },
        });
      } else if (url === '/artists/R1') {
        resolve({
          data: {
            name: 'name of the artist',
            images: [{ url: '' }],
          },
        });
      } else if (url === '/artists/R1/albums') {
        resolve({
          data: {
            items: [{
              album_type: 'album',
              album_group: 'album',
              name: 'album #1',
              available_markets: ['CA'],
              release_date: '2005',
              images: [{ url: '' }],
            }],
          },
        });
      } else if (url === '/me/tracks') {
        resolve({
          data: {
            items: [{
              track: {
                name: 'name of track',
                album: { name: 'name of album' },
                artists: [{ name: 'name of artist' }],
              },
            }],
          },
        });
      } else if (url === '/me/albums') {
        resolve({
          data: {
            items: [{
              album: {
                name: 'name of album',
                artists: [{ name: 'name of artist' }],
              },
            }],
          },
        });
      } else if (url === '/me/playlists') {
        resolve({
          data: {
            items: [{
              name: 'name of playlist',
              owner: { display_name: 'name of owner' },
              tracks: { total: '500' },
            }],
          },
        });
      } else if (url === '/playlists/P1') {
        resolve({
          data: {
            name: 'name of playlist',
            owner: { display_name: 'name of owner' },
            images: [{}],
          },
        });
      } else if (url === '/playlists/P1/tracks') {
        resolve({
          data: {
            items: [{
              track: {
                name: 'playlist track #1',
                artists: [{ name: 'name of playlist track artist' }],
                album: { name: 'name of playlist track album' },
              },
            }],
          },
        });
      } else if (url === '/me/player') {
        resolve({
          data: {
            item: {
              id: 1,
              name: 'Song being played',
              artists: [{ name: 'Artist of the song that is being played' }],
              album: { images: [{ url: '' }] },
            },
          },
        });
      }
    }),
  },
  observeAlbumSearch: () => ({
    subscribe: (subscriber) => {
      subscriber.next({
        bestMatch: {
          tracks: [{
            id: 'T1',
            name: 'track #1',
            composers: ['composer 1', 'composer 2'],
            producers: ['producer 1', 'producer 2'],
            credits: { musician: ['instrument 1', 'instrument 2'] },
          }],
        },
        progress: 100,
      });
      return { unsubscribe: () => {} };
    },
  }),
};

describe('Application', () => {
  beforeAll(() => {
    global.window.matchMedia = () => ({ matches: true });
  });

  it('shows home', async () => {
    const { getByText } = await render(<GlobalAppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>
    </GlobalAppContext.Provider>);

    expect(getByText('@username')).toBeInTheDocument();
  });

  it('loads tracks', async () => {
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/track/T1']}>
          <Root />
        </MemoryRouter>
      </GlobalAppContext.Provider>);
    });

    expect(utils.getByText('title of song')).toBeInTheDocument();
    expect(utils.getByText('name of the artist')).toBeInTheDocument();
    expect(utils.getByText('(composer 1, composer 2)')).toBeInTheDocument();
    expect(utils.getByText('[producer 1, producer 2]')).toBeInTheDocument();
    expect(utils.getByText('musician:')).toBeInTheDocument();
    expect(utils.getByText('instrument 1, instrument 2')).toBeInTheDocument();
  });

  it('loads albums', async () => {
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/album/L1']}>
          <Root />
        </MemoryRouter>
      </GlobalAppContext.Provider>);
    });

    expect(utils.getByText('album of song')).toBeInTheDocument();
    expect(utils.getByText('name of the artist')).toBeInTheDocument();
    expect(utils.getByText('title of song')).toBeInTheDocument();
    expect(utils.getByText('(composer 1, composer 2)')).toBeInTheDocument();
    expect(utils.getByText('0:01')).toBeInTheDocument();
  });

  it('loads artists', async () => {
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/artist/R1']}>
          <Root />
        </MemoryRouter>
      </GlobalAppContext.Provider>);
    });

    expect(utils.getByText('name of the artist')).toBeInTheDocument();
    expect(utils.getByText('Albums (1)')).toBeInTheDocument();
    expect(utils.getByText('album #1')).toBeInTheDocument();
    expect(utils.getByText('2005')).toBeInTheDocument();
  });

  it('loads playlists', async () => {
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/playlist/P1']}>
          <Root />
        </MemoryRouter>
      </GlobalAppContext.Provider>);
    });

    expect(utils.getByText('playlist track #1')).toBeInTheDocument();
    expect(utils.getByText('name of playlist track artist - name of playlist track album')).toBeInTheDocument();
  });

  it('loads saved tracks', async () => {
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/user/tracks']}>
          <Root />
        </MemoryRouter>
      </GlobalAppContext.Provider>);
    });

    expect(utils.getByText('name of track')).toBeInTheDocument();
    expect(utils.getByText('name of artist - name of album')).toBeInTheDocument();
  });

  it('loads saved albums', async () => {
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/user/albums']}>
          <Root />
        </MemoryRouter>
      </GlobalAppContext.Provider>);
    });

    expect(utils.getByText('name of album')).toBeInTheDocument();
    expect(utils.getByText('name of artist')).toBeInTheDocument();
  });

  it('loads user playlists', async () => {
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/user/playlists']}>
          <Root />
        </MemoryRouter>
      </GlobalAppContext.Provider>);
    });

    expect(utils.getByText('name of playlist')).toBeInTheDocument();
    expect(utils.getByText('name of owner (500)')).toBeInTheDocument();
  });

  it('logs out', async () => {
    window.location.reload = jest.fn();
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/']}>
          <Root />
        </MemoryRouter>
      </GlobalAppContext.Provider>);
    });

    fireEvent.click(utils.getByLabelText('Logout'));

    expect(window.location.reload).toHaveBeenCalled();
  });
});
