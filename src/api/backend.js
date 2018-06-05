import * as Rx from 'rxjs';

export default function Backend(request, url, pollFreq) {
  this.getCredits = albumId => Rx.Observable.create((subscriber) => {
    let timer;
    const retrieve = receive => request.get(`${url}/${albumId}`).end(receive);
    const receive = (err, res) => {
      if (err) {
        subscriber.error(err);
      } else {
        subscriber.next(res.body);
        if (res.body.progress === 100) {
          subscriber.complete();
        } else {
          timer = setTimeout(() => retrieve(receive), pollFreq);
        }
      }
    };
    retrieve(receive);
    return () => {
      clearTimeout(timer);
    };
  });
}
