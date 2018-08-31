import { PARSE_TOKEN, parseToken } from './user';

describe('REDUX: User', () => {
  it('creates PARSE_TOKEN action', () => {
    const { type, data: { token } } = parseToken('#access_token=FAKE&token_type=Bearer&expires_in=3600&state=reactApp');
    expect(type === PARSE_TOKEN && token === 'FAKE');
  });
});
