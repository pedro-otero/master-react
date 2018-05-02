import Backend from './backend';

describe('Backend', () => {
  it('rejects if there is an error from the server', () => {
    const credits = new Backend().getCredits('ERROR');
    return expect(credits).rejects.toEqual('error');
  });

  it('resolves if response from server has no error', () => {
    const credits = new Backend().getCredits('OK');
    return expect(credits).resolves.toEqual('ok');
  });
});
