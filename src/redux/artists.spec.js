import { artistToState } from './artists';

describe('REDUX: Artists', () => {
  it('maps artists without images to state', () => {
    const mappedArtist = artistToState({
      id: 'AR1',
      name: 'The Artist',
      images: [],
    });
    expect(mappedArtist).toEqual({
      name: 'The Artist',
      id: 'AR1',
    });
  });

  it('maps artist to state', () => {
    const mappedArtist = artistToState({
      id: 'AR1',
      name: 'The Artist',
      images: [{
        url: 'imgUrl',
      }],
    });
    expect(mappedArtist).toEqual({
      id: 'AR1',
      name: 'The Artist',
      image: 'imgUrl',
    });
  });
});
