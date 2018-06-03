import { setPlaybackInfo } from './playback-info';

describe('Playback info action creator', () => {
  it('creates SET_PLAYBACK_INFO action', () => {
    const action = setPlaybackInfo('val');
    expect(action).toEqual({
      type: 'SET_PLAYBACK_INFO',
      data: 'val',
    });
  });
});
