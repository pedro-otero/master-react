import { FAIL_TRACK_LOAD, reduce, SET_TRACK, setTrack, START_TRACK_LOAD } from './tracks';

describe('REDUX: Tracks', () => {
  const track = {
    id: 'T1',
    artists: [{ id: 'AR1' }],
    album: { id: 'AL1' },
    duration_ms: 299500,
  };

  describe('reducer', () => {
    it('adds tracks', () => {
      const tracks = reduce({}, {
        type: SET_TRACK,
        data: track,
      });
      expect(tracks.T1).toEqual(Object.assign({
        loading: false,
        failed: false,
      }, track));
    });

    it('sets track as loading', () => {
      const tracks = reduce({}, {
        type: START_TRACK_LOAD,
        data: {
          id: track.id,
        },
      });
      expect(tracks.T1).toEqual({ loading: true, failed: false });
    });

    it('sets track as failed', () => {
      const tracks = reduce({}, {
        type: FAIL_TRACK_LOAD,
        data: {
          id: track.id,
        },
      });
      expect(tracks.T1).toEqual({ loading: false, failed: true });
    });
  });

  describe('Actions', () => {
    it('setTrack', () => {
      const action = setTrack(track);
      expect(action).toEqual({
        type: SET_TRACK,
        data: {
          id: 'T1',
          artistId: 'AR1',
          albumId: 'AL1',
          duration: '4:59',
        },
      });
    });
  });
});
