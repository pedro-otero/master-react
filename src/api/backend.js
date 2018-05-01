import request from 'superagent';

export default function Backend() {
  this.getCredits = (track, album) => new Promise(function (resolve, reject) {
    request
      .get(`${process.env.REACT_APP_BE_DOMAIN}/data/album/${album.id}`)
      .end((err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(res.body.bestMatch.tracks.find(t => t.id === track.id));
        }
      });
  });
}
