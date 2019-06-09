import { artistToState, artistAlbumsToState, setArtistAlbums, SET_ARTIST_ALBUMS, reduce } from './artists';

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

  it('maps own albums', () => {
    const mappedAlbums = artistAlbumsToState({
      items: [{
        id: 'AL1',
        album_group: 'album',
        album_type: 'album',
        name: 'Own album',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }],
    });

    expect(mappedAlbums).toEqual([{
      name: 'Albums',
      items: [{
        id: 'AL1',
        name: 'Own album',
        year: '2018',
        image: 'img1',
      }],
    }]);
  });

  it('maps own singles', () => {
    const mappedAlbums = artistAlbumsToState({
      items: [{
        id: 'AL1',
        album_group: 'single',
        album_type: 'single',
        name: 'Own single',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }],
    });

    expect(mappedAlbums).toEqual([{
      name: 'Singles',
      items: [{
        id: 'AL1',
        name: 'Own single',
        year: '2018',
        image: 'img1',
      }],
    }]);
  });

  it('maps own compilations', () => {
    const mappedAlbums = artistAlbumsToState({
      items: [{
        id: 'AL1',
        album_group: 'compilation',
        album_type: 'compilation',
        name: 'Own compilation',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }],
    });

    expect(mappedAlbums).toEqual([{
      name: 'Compilations',
      items: [{
        id: 'AL1',
        name: 'Own compilation',
        year: '2018',
        image: 'img1',
      }],
    }]);
  });

  it('maps albums appearances', () => {
    const mappedAlbums = artistAlbumsToState({
      items: [{
        id: 'AL1',
        album_group: 'appears_on',
        album_type: 'album',
        name: 'Collab album',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }],
    });

    expect(mappedAlbums).toEqual([{
      name: 'Featured: Albums',
      items: [{
        id: 'AL1',
        name: 'Collab album',
        year: '2018',
        image: 'img1',
      }],
    }]);
  });

  it('maps singles appearances', () => {
    const mappedAlbums = artistAlbumsToState({
      items: [{
        id: 'AL1',
        album_group: 'appears_on',
        album_type: 'single',
        name: 'Collab single',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }],
    });

    expect(mappedAlbums).toEqual([{
      name: 'Featured: Singles',
      items: [{
        id: 'AL1',
        name: 'Collab single',
        year: '2018',
        image: 'img1',
      }],
    }]);
  });

  it('maps compilations appearances', () => {
    const mappedAlbums = artistAlbumsToState({
      items: [{
        id: 'AL1',
        album_group: 'appears_on',
        album_type: 'compilation',
        name: 'Collab compilation',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }],
    });

    expect(mappedAlbums).toEqual([{
      name: 'Featured: Compilations',
      items: [{
        id: 'AL1',
        name: 'Collab compilation',
        year: '2018',
        image: 'img1',
      }],
    }]);
  });

  it('calculates artist albums load progress', () => {
    const action = setArtistAlbums('AR1', {
      items: [[], []],
      total: 10,
      offset: 4,
    });

    expect(action.data.progress).toEqual(60);
  });

  it('maps artist albums without images to state', () => {
    const mappedAlbums = artistAlbumsToState({
      items: [{
        id: 'AL1',
        name: 'Album #1',
        release_date: '2018-01-05',
        images: [],
        album_group: 'album',
        album_type: 'album',
      }],
      limit: 30,
      offset: 0,
    });

    expect(mappedAlbums).toEqual([{
      name: 'Albums',
      items: [{
        id: 'AL1',
        name: 'Album #1',
        year: '2018',
        image: undefined,
      }],
    }]);
  });

  it('adds album groups to an artist without any groups yet', () => {
    const state = reduce({
      AR1: {
        albums: {},
      },
    }, {
      type: SET_ARTIST_ALBUMS,
      data: {
        id: 'AR1',
        items: [{
          name: 'Group',
          items: [2],
        }],
      },
    });

    expect(state.AR1.albums.items).toEqual([{
      name: 'Group',
      items: [2],
    }]);
  });

  it('merges albums groups', () => {
    const state = reduce({
      AR1: {
        albums: {
          items: [{
            name: 'Group',
            items: [1],
          }],
        },
      },
    }, {
      type: SET_ARTIST_ALBUMS,
      data: {
        id: 'AR1',
        items: [{
          name: 'Group',
          items: [2],
        }],
      },
    });

    expect(state.AR1.albums.items).toEqual([{
      name: 'Group',
      items: [1, 2],
    }]);
  });

  it('adds yet non existent album groups', () => {
    const state = reduce({
      AR1: {
        albums: {
          items: [{
            name: 'Group',
            items: [1],
          }],
        },
      },
    }, {
      type: SET_ARTIST_ALBUMS,
      data: {
        id: 'AR1',
        items: [{
          name: 'Another group',
          items: [2],
        }],
      },
    });

    expect(state.AR1.albums.items).toEqual([{
      name: 'Group',
      items: [1],
    }, {
      name: 'Another group',
      items: [2],
    }]);
  });
});
