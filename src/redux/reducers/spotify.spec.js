import reduce from './spotify';

describe('Playback info reducer', () => {
  it('sets playback info', () => {
    const playbackInfo = reduce(null, {
      type: 'SET_PLAYBACK_INFO', data: 'val',
    });
    expect(playbackInfo).toEqual('val');
  });
});
