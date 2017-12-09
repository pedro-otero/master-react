import playback from './mocks/playback.json';
import artist from './mocks/artist.json';

export default function SpotifyApi({clientId, redirectUri}) {

    this.getCurrentPlayback = () => Promise.resolve({body: playback});

    this.getAlbum = () => Promise.resolve({});

    this.getArtist = (id) => Promise.resolve(artist);

    this.setAccessToken = () => undefined;
}