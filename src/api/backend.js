import * as Rx from 'rxjs';

export default class Backend {
  constructor(request, url, pollFreq) {
    this.opts = { request, url, pollFreq };
  }

  getCredits(albumId) {
    const { request, url, pollFreq } = this.opts;
    return Rx.Observable.create((subscriber) => {
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
}
