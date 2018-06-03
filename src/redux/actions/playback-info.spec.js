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
      getCurrentPlayback: jest.fn(() => Promise.resolve({ body: {} })),
    };
    const dispatch = jest.fn()
      .mockImplementationOnce(action => expect(action).toEqual({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      }))
      .mockImplementationOnce((action) => {
        expect(action).toEqual({
          type: 'SET_PLAYBACK_INFO',
          data: {},
        });
        expect(api.getCurrentPlayback).toHaveBeenCalled();
        done();
      });
    thunk(dispatch, null, api);
  });
});
