import SpotifyWebApi from 'spotify-web-api-node';

export default function SpotifyApi({clientId, redirectUri}) {

    const api = new SpotifyWebApi({clientId, redirectUri});

    this.getCurrentPlayback = () => api.getMyCurrentPlaybackState();

    this.getAlbum = (id) => api.getAlbum(id);

    this.getArtist = (id) => api.getArtist(id);

    this.setAccessToken = (token) => api.setAccessToken(token);
}