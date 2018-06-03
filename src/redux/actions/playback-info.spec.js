import { setPlaybackInfo, loadPlaybackInfo } from './playback-info';

describe('Playback info action creator', () => {
  it('creates SET_PLAYBACK_INFO action', () => {
    const action = setPlaybackInfo('val');
    expect(action).toEqual({
      type: 'SET_PLAYBACK_INFO',
      data: 'val',
    });
  });

  it('Loads playback info', (done) => {
    const thunk = loadPlaybackInfo();
    const api = {
      getCurrentPlayback: jest.fn(() => Promise.resolve({})),
    };
    const dispatch = jest.fn((action) => {
      expect(action.type).toEqual('SET_PLAYBACK_INFO');
      expect(api.getCurrentPlayback).toHaveBeenCalled();
      done();
    });
    thunk(dispatch, null, api);
  });
});
