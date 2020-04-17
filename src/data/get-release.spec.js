import makeGetRelease from './get-release';

describe('Get release observable', () => {
  it('emits results', (done) => {
    const axios = {
      get: jest.fn().mockResolvedValueOnce({
        data: {
          progress: 50,
          value: 1,
        },
      }).mockResolvedValueOnce({
        data: {
          progress: 100,
          value: 2,
        },
      }),
    };
    const getRelease = makeGetRelease(axios, 1);
    const emittedValues = [];

    getRelease('x').subscribe({
      next: value => emittedValues.push(value),
      complete: () => {
        expect(emittedValues[0]).toEqual({
          progress: 50,
          value: 1,
        });
        expect(emittedValues[1]).toEqual({
          progress: 100,
          value: 2,
        });
        done();
      },
    });
  });

  it('emits errors', (done) => {
    const request = {
      get: jest.fn().mockRejectedValueOnce('ERROR'),
    };
    const getRelease = makeGetRelease(request, 'whatevs', 1);

    getRelease('x').subscribe({
      error: (error) => {
        expect(error).toEqual('ERROR');
        done();
      },
    });
  });
});
