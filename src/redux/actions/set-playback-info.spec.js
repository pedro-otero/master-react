import setPlaybackInfo from './set-playback-info';

describe('Set playback info action creator', () => {
  it('creates action', () => {
    const action = setPlaybackInfo('val');
    expect(action).toEqual({
      type: 'SET_PLAYBACK_INFO',
      data: 'val',
    });
  });
});
