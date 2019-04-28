import { reduce } from 'state/progress';
import { SET_ALBUM, SET_SEARCH_RESULT, START_ALBUM_LOAD } from 'state/albums';
import { SET_TRACK, START_TRACK_LOAD } from 'state/tracks';
import { SET_ARTIST_ALBUMS, START_ARTIST_LOAD } from 'state/artists';

describe('Progress reducer', () => {
  it('sets the progress of an album search', () => {
    const state = reduce(undefined, {
      type: SET_SEARCH_RESULT,
      data: {
        progress: 50,
      },
    });

    expect(state).toEqual({
      value: 50,
      available: true,
    });
  });

  it('sets the progress of an artist albums load', () => {
    const state = reduce(undefined, {
      type: SET_ARTIST_ALBUMS,
      data: {
        progress: 50,
      },
    });

    expect(state).toEqual({
      value: 50,
      available: true,
    });
  });

  it('makes progress unavailable when album search finishes', () => {
    const state = reduce(undefined, {
      type: SET_SEARCH_RESULT,
      data: {
        progress: 100,
      },
    });

    expect(state).toEqual({
      value: 100,
      available: false,
    });
  });

  it('makes progress unavailable when an artist albums load finishes', () => {
    const state = reduce(undefined, {
      type: SET_ARTIST_ALBUMS,
      data: {
        progress: 100,
      },
    });

    expect(state).toEqual({
      value: 100,
      available: false,
    });
  });

  it('signals the start of an album load', () => {
    const state = reduce({ available: true }, {
      type: START_ALBUM_LOAD,
    });

    expect(state).toEqual({
      available: false,
      loading: 'Loading info from Spotify...',
    });
  });

  it('signals the start of a track load', () => {
    const state = reduce({ available: true }, {
      type: START_TRACK_LOAD,
    });

    expect(state).toEqual({
      available: false,
      loading: 'Loading info from Spotify...',
    });
  });

  it('signals the start of an artist load', () => {
    const state = reduce({ available: true }, {
      type: START_ARTIST_LOAD,
    });

    expect(state).toEqual({
      available: false,
      loading: 'Loading info from Spotify...',
    });
  });

  it('signals the pending search start for an album', () => {
    const state = reduce(undefined, {
      type: SET_ALBUM,
    });

    expect(state).toEqual({
      available: false,
      loading: 'Starting search...',
    });
  });

  it('signals the pending search start for the album of a track', () => {
    const state = reduce(undefined, {
      type: SET_TRACK,
    });

    expect(state).toEqual({
      available: false,
      loading: 'Starting search...',
    });
  });
});
