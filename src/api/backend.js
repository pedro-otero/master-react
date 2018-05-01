import request from 'superagent';

export default function Backend() {
  this.getCredits = (track, album) => new Promise(function (resolve, reject) {
    request
      .get(`http://localhost:3001/data/album/${album.id}`)
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
