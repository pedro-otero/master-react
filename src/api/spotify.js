export default function getSpotifyAxiosInstance(axios, authUrl, token, minTimeBetweenRequests) {
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

  spotifyAxios.interceptors.response.use(response => response, (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiry');
      window.location.href = authUrl;
      return Promise.reject(error);
    } else if (error.response.status === 429) {
      nextSafeStart = Number(error.response.headers['retry-after']) * 1000;
      return spotifyAxios.request(error.config);
    }
    return Promise.reject(error);
  });

  return spotifyAxios;
}
