import * as Rx from 'rxjs';

export default (request, url, pollFreq) => function Backend() {
  this.getCredits = albumId => Rx.Observable.create((subscriber) => {
    const retrieve = receive => request.get(`${url}/${albumId}`).end(receive);
    const receive = (err, res) => {
      if (err) {
        console.error(err);
        subscriber.error(err);
      } else {
        subscriber.next(res.body);
        if (res.body.progress === 100) {
          subscriber.complete();
        } else {
          setTimeout(() => retrieve(receive), pollFreq);
        }
      }
    };
    retrieve(receive);
  });
};
