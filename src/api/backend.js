import request from 'superagent';

export default function Backend() {
  this.getCredits = albumId => new Promise(function (resolve, reject) {
    request
      .get(`${process.env.REACT_APP_BE_DOMAIN}/data/album/${albumId}`)
      .end((err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
}
