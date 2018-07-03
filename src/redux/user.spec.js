import { SET_TOKEN, setToken } from './user';

describe('REDUX: User', () => {
  it('creates SET_TOKEN action', () => {
    const { type, data: { token } } = setToken('#access_token=FAKE&token_type=Bearer&expires_in=3600&state=reactApp');
    expect(type === SET_TOKEN && token === 'FAKE');
  });
});
