export default {
  get: jest.fn((url) => {
    if (url.endsWith('/data/album/ERROR')) {
      return {
        end: jest.fn(f => f('error', null)),
      };
    }
    return {
      end: jest.fn(f => f(null, { body: 'ok' })),
    };
  }),
};
