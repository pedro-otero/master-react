import { trackToState } from './mappers';

describe('REDUX: Mappers', () => {
  describe('Payload mapper', () => {
    it('trackToState', () => {
      const mappedTrack = trackToState({
        id: 'T1',
        artists: [{ id: 'AR1' }],
        album: { id: 'AL1' },
        duration_ms: 299500,
      });

      expect(mappedTrack).toEqual({
        id: 'T1',
        artistId: 'AR1',
        albumId: 'AL1',
        duration: '4:59',
      });
    });
  });
});
