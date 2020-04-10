export default function getSpotifyAxiosInstance(axios, token, minTimeBetweenRequests) {
  const spotifyAxios = axios.create({ baseURL: 'https://api.spotify.com/v1' });
  let nextSafeStart = new Date().getTime();
  spotifyAxios.interceptors.request.use((config) => {
    const now = new Date().getTime();
    let interval = 0;
    if (nextSafeStart > now) {
      interval = nextSafeStart - now;
    }
    nextSafeStart = now + interval + minTimeBetweenRequests;
    return new Promise((resolve) => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setTimeout(resolve({ ...config, headers }), interval);
    });
  });
  return spotifyAxios;
}
