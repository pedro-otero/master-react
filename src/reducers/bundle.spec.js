import reduce from './bundle';
import {LOAD_ALBUM_SUCCESS, LOAD_ARTIST_SUCCESS, LOAD_CREDITS_SUCCESS, LOAD_PLAYBACK_SUCCESS} from "../actions/types";

describe('Main reducer', () => {
  describe('returns default state', () => {
    const bundle = reduce(undefined, {
      type: 'ASDFG'
    });

    describe('data from backend', () => {
      test('producers', () => {
        expect(bundle.credits.producers.length === 0)
      });

      test('composers', () => {
        expect(bundle.credits.composers.length === 0)
      });

      test('credits', () => {
        expect(Object.keys(bundle.credits.credits).length === 0)
      });
    });

    test('album', () => {
      expect(bundle.album);
    });

    test('track', () => {
      expect(bundle.track);
    });

    test('artist', () => {
      expect(bundle.artist);
    });
  });

  it('sets playback data', () => {
    const bundle = reduce(undefined, {
      type: LOAD_PLAYBACK_SUCCESS,
      track: { id: 1 }
    });
    expect(bundle.track.id);
  });

  it('sets album', () => {
    const bundle = reduce(undefined, {
      type: LOAD_ALBUM_SUCCESS,
      album: { id: 1 }
    });
    expect(bundle.album.id);
  });

  it('sets artist', () => {
    const bundle = reduce(undefined, {
      type: LOAD_ARTIST_SUCCESS,
      artist: { id: 1 }
    });
    expect(bundle.artist.id);
  });

  it('sets credits', () => {
    const bundle = reduce(undefined, {
      type: LOAD_CREDITS_SUCCESS,
      artist: { id: 1 }
    });
    expect(bundle.artist.id);
  });
});
