import { setPlaybackInfo, loadPlaybackInfo, loadAlbum } from './spotify';

describe('Spotify actions', () => {
  const dispatch = jest.fn();
  const successApi = {
    getCurrentPlayback: jest.fn(() => Promise.resolve({ body: {} })),
    getAlbum: jest.fn(() => Promise.resolve({ body: {} })),
  };
  const failureApi = {
    getCurrentPlayback: jest.fn(() => Promise.reject(Error())),
    getAlbum: jest.fn(() => Promise.reject(Error())),
  };

  it('SET_PLAYBACK_INFO', () => {
    const action = setPlaybackInfo('val');
    expect(action).toEqual({
      type: 'SET_PLAYBACK_INFO',
      data: 'val',
    });
  });

  it('Loads playback info', (done) => {
    const thunk = loadPlaybackInfo();
    thunk(dispatch, null, successApi).then((response) => {
      expect(response.body).toEqual({});
      expect(successApi.getCurrentPlayback).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: {},
      });
      done();
    });
  });

  it('Informs of failure when loading playback info', (done) => {
    const thunk = loadPlaybackInfo();
    thunk(dispatch, null, failureApi).then((response) => {
      expect(response.body).toEqual({});
      expect(failureApi.getCurrentPlayback).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'FAILED',
      });
      done();
    });
  });

  it('Loads album', (done) => {
    const thunk = loadAlbum('AL1');
    thunk(dispatch, null, successApi).then((response) => {
      expect(response.body).toEqual({});
      expect(successApi.getAlbum).toHaveBeenCalledWith('AL1');
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ALBUM',
        data: {
          id: 'AL1',
          value: 'LOADING',
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ALBUM',
        data: {
          id: 'AL1',
          value: {},
        },
      });
      done();
    });
  });

  it('Fails album load', (done) => {
    const thunk = loadAlbum('AL1');
    thunk(dispatch, null, failureApi).then(() => {
      expect(failureApi.getAlbum).toHaveBeenCalledWith('AL1');
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ALBUM',
        data: {
          id: 'AL1',
          value: 'LOADING',
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ALBUM',
        data: {
          id: 'AL1',
          value: 'FAILED',
        },
      });
      done();
    });
  });
});
