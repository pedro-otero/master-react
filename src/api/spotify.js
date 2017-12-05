import playback from './mocks/playback.json';

export default function SpotifyApi({clientId, redirectUri}) {

    this.getCurrentPlayback = () => Promise.resolve({body: playback});

    this.getAlbum = () => Promise.resolve({});

    this.setAccessToken = () => undefined;
}