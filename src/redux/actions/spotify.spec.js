import { setPlaybackInfo, loadPlaybackInfo, loadAlbum } from './spotify';

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
    const dispatch = jest.fn();
    thunk(dispatch, null, api).then((response) => {
      expect(response.body).toEqual({});
      expect(api.getCurrentPlayback).toHaveBeenCalled();
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
    const api = {
      getCurrentPlayback: jest.fn(() => Promise.reject(Error())),
    };
    const dispatch = jest.fn()
      .mockImplementationOnce(action => expect(action).toEqual({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      }))
      .mockImplementationOnce((action) => {
        expect(action).toEqual({
          type: 'SET_PLAYBACK_INFO',
          data: 'FAILED',
        });
        expect(api.getCurrentPlayback).toHaveBeenCalled();
        done();
      });
    thunk(dispatch, null, api);
  });

  it('Loads album', (done) => {
    const thunk = loadAlbum('AL1');
    const api = {
      getAlbum: jest.fn(() => Promise.resolve({ body: {} })),
    };
    const dispatch = jest.fn();
    thunk(dispatch, null, api).then((response) => {
      expect(response.body).toEqual({});
      expect(api.getAlbum).toHaveBeenCalledWith('AL1');
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
    const api = {
      getAlbum: jest.fn(() => Promise.reject(Error())),
    };
    const dispatch = jest.fn();
    thunk(dispatch, null, api).then(() => {
      expect(api.getAlbum).toHaveBeenCalledWith('AL1');
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
