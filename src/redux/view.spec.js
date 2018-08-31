import { viewTrack } from './view';

describe('View actions', () => {
  describe('View track', () => {
    const track = { albumId: 'L1', artistId: 'R1' };
    const dispatch = jest.fn(() => Promise.resolve(track));
    const loadTrack = jest.fn(() => track);
    const mocks = [jest.fn(), jest.fn()];
    const [loadAlbum, loadArtist] = mocks;
    const actions = { loadTrack, loadAlbum, loadArtist };

    beforeAll(() => {
      const thunk = viewTrack('T1');
      thunk(dispatch, () => ({}), { actions });
    });

    it('calls loadTrack', () => {
      expect(loadTrack).toBeCalledWith('T1');
    });

    it('calls loadAlbum', () => {
      expect(loadAlbum).toBeCalledWith('L1');
    });

    it('calls loadArtist', () => {
      expect(loadArtist).toBeCalledWith('R1');
    });
  });
});
