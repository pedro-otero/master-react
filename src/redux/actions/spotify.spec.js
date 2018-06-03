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

  describe('Succesful playback info load', () => {
    let response;
    beforeAll((done) => {
      const thunk = loadPlaybackInfo();
      thunk(dispatch, null, successApi).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.body).toEqual({});
    });


    it('calls api method', () => {
      expect(successApi.getCurrentPlayback).toHaveBeenCalled();
    });

    it('informs load started', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      });
    });

    it('informs load finished', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: {},
      });
    });

    afterAll(() => successApi.getCurrentPlayback.mockClear());
  });

  describe('Failed playback info load', () => {
    beforeAll((done) => {
      const thunk = loadPlaybackInfo();
      thunk(dispatch, null, failureApi).then(done);
    });

    it('calls api method', () => {
      expect(failureApi.getCurrentPlayback).toHaveBeenCalled();
    });

    it('informs load started', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      });
    });

    it('informs load failed', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'FAILED',
      });
    });

    afterAll(() => failureApi.getCurrentPlayback.mockClear());
  });

  describe('Succesful album load', () => {
    let response;
    beforeAll((done) => {
      const thunk = loadAlbum('AL1');
      thunk(dispatch, null, successApi).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.body).toEqual({});
    });

    it('calls api method', () => {
      expect(successApi.getAlbum).toHaveBeenCalledWith('AL1');
    });

    it('informs load started', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ALBUM',
        data: {
          id: 'AL1',
          value: 'LOADING',
        },
      });
    });


    it('informs load finished', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ALBUM',
        data: {
          id: 'AL1',
          value: {},
        },
      });
    });

    afterAll(() => successApi.getAlbum.mockClear());
  });

  describe('Album load failure', () => {
    beforeAll((done) => {
      const thunk = loadAlbum('AL1');
      thunk(dispatch, null, failureApi).then(done);
    });

    it('calls api method', () => {
      expect(failureApi.getAlbum).toHaveBeenCalledWith('AL1');
    });

    it('informs load started', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ALBUM',
        data: {
          id: 'AL1',
          value: 'LOADING',
        },
      });
    });

    it('informs load failed', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_ALBUM',
        data: {
          id: 'AL1',
          value: 'FAILED',
        },
      });
    });

    afterAll(() => failureApi.getAlbum.mockClear());
  });
});
