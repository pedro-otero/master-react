import { getCurrentPlayback } from './spotify';
import {
  LOAD_ALBUM_SUCCESS, LOAD_ARTIST_SUCCESS, LOAD_CREDITS_SUCCESS, LOAD_PLAYBACK_SUCCESS,
  SET_PROGRESS
} from './types';

describe('Spotify async actions', () => {
  describe('getCurrentPlayback', () => {
    const album = { id: 'A1' };
    const artist = { id: 'AR1' };
    const track = {
      id: 'T1',
      album,
      artists: [artist],
    };
    const credits = {
      bestMatch: {
        tracks: [{
          id: 'T1',
        }],
      },
      progress: 30,
    };
    const spotifyApi = {
      getAlbum: jest.fn(() => Promise.resolve({ body: album })),
      getArtist: jest.fn(() => Promise.resolve({ body: artist })),
      getCurrentPlayback: jest.fn(() => Promise.resolve({
        body: {
          item: track,
        },
      })),
    };
    const backend = {
      getCredits: jest.fn(() => Promise.resolve(credits)),
    };
    const dispatch = jest.fn();
    getCurrentPlayback()(dispatch, null, {
      spotifyApi,
      backend,
    });

    it('calls spotifyApi#getCurrentPlayback once', () => {
      expect(spotifyApi.getCurrentPlayback.mock.calls.length).toEqual(1);
    });

    it('dispatches playback info', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: LOAD_PLAYBACK_SUCCESS,
        track,
      });
    });

    it('calls spotifyApi#getAlbum', () => {
      expect(spotifyApi.getAlbum.mock.calls).toEqual([['A1']]);
    });

    it('dispatches album info', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: LOAD_ALBUM_SUCCESS,
        album,
      });
    });

    it('calls spotifyApi#getArtist', () => {
      expect(spotifyApi.getArtist.mock.calls).toEqual([['AR1']]);
    });

    it('dispatches artist info', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: LOAD_ARTIST_SUCCESS,
        artist,
      });
    });

    it('calls backend#getCredits', () => {
      expect(backend.getCredits.mock.calls).toEqual([[album.id]]);
    });

    it('dispatches credits info', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: LOAD_CREDITS_SUCCESS,
        credits: credits.bestMatch.tracks[0],
      });
    });

    it('dispatches progress info', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: SET_PROGRESS,
        progress: 30,
      });
    });
  });
});
