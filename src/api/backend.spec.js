import getBackEndConstructor from './backend';

const getMock = jest.fn(id => ({
  end: (f) => {
    if (id === 'http://myapp.com/ERROR') {
      f('ERROR', null);
    } else if (id === 'http://myapp.com/OK') {
      f(null, { body: { id, bestMatch: {}, progress: 100 } });
    }
  },
}));
const mockRequest = {
  get: getMock,
};
const Backend = getBackEndConstructor(mockRequest, 'http://myapp.com');
const backend = new Backend();

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

  it('resolves if response from server has no error', (done) => {
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
});
