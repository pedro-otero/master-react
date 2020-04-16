import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act, fireEvent } from '@testing-library/react';

import GlobalAppContext from '../../context';
import Search from './search';

const context = {
  spotify: {
    get: url => new Promise((resolve) => {
      if (url === '/search') {
        resolve({
          data: {
            tracks: {
              items: [{
                id: 1,
                name: 'Track result',
                artists: [{ name: 'Track result artist' }],
                album: { images: [] },
              }],
            },
            albums: {
              items: [{
                id: 1,
                name: 'Album result',
                artists: [{ name: 'Track result artist' }],
                images: [],
                release_date: '2004',
              }],
            },
            artists: {
              items: [{
                id: 1,
                name: 'Artist result',
                images: [],
              }],
            },
            playlists: {
              items: [{
                id: 1,
                name: 'Playlist result',
                images: [],
                tracks: { total: 50 },
              }],
            },
          },
        });
      }
    }),
  },
};

describe('Search', () => {
  it('displays results', async () => {
    jest.useFakeTimers();
    let utils;
    await act(async () => {
      utils = render(<GlobalAppContext.Provider value={context}>
        <MemoryRouter initialEntries={['/']}>
          <Search />
        </MemoryRouter>
      </GlobalAppContext.Provider>);

      fireEvent.change(utils.container.querySelector('input'), { target: { value: 'query' } });
      jest.runAllTimers();
    });

    expect(utils.getByText('Track result')).toBeInTheDocument();
    expect(utils.getByText('Album result')).toBeInTheDocument();
    expect(utils.getByText('Artist result')).toBeInTheDocument();
    expect(utils.getByText('Playlist result')).toBeInTheDocument();
  });
});
