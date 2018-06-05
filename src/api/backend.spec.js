import Backend from './backend';

let pollTimes = 0;
const progresses = [30, 60, 100];
const getMock = jest.fn(id => ({
  end: (f) => {
    if (id === 'http://myapp.com/ERROR') {
      f('ERROR', null);
    } else if (id === 'http://myapp.com/OK') {
      f(null, { body: { id, bestMatch: {}, progress: 100 } });
    } else if (id === 'http://myapp.com/POLL') {
      f(null, { body: { id, bestMatch: {}, progress: progresses[pollTimes] } });
      pollTimes += 1;
    }
  },
}));
const mockRequest = {
  get: getMock,
};
const backend = new Backend(mockRequest, 'http://myapp.com', 0);

describe('Backend', () => {
  it('emits error if there is an error from the server', (done) => {
    backend.getCredits('ERROR')
      .subscribe(
        () => {
          done('with error');
        },
        (err) => {
          expect(err).toEqual('ERROR');
          done();
        },
        () => done('with error'),
      );
  });

  it('emits data', (done) => {
    backend.getCredits('OK')
      .subscribe(
        (value) => {
          expect(value.id).toEqual('http://myapp.com/OK');
        },
        () => {
          done('with error');
        },
        () => done(),
      );
  });

  it('polls album data endpoint', (done) => {
    const values = [];
    backend.getCredits('POLL')
      .subscribe(
        (value) => {
          values.push(value);
        },
        () => {
          done('with error');
        },
        () => {
          expect(values[0].progress).toEqual(30);
          expect(values[1].progress).toEqual(60);
          expect(values[2].progress).toEqual(100);
          done();
        },
      );
  });

  it('clears timer when unsubscribing', () => {
    global.clearTimeout = jest.fn();
    const subscription = backend.getCredits('OK')
      .subscribe(
        (value) => {
          expect(value.id).toEqual('http://myapp.com/OK');
        },
        () => {
          throw Error('with error');
        },
        () => {},
      );
    subscription.unsubscribe();
    expect(global.clearTimeout.mock.calls).toEqual([[undefined]]);
  });

  it('registers timers', (done) => {
    backend.getCredits('POLL').subscribe(() => {
      expect(backend.timers.POLL).toBeDefined();
      done();
    });
  });
});
