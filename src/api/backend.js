import * as Rx from 'rxjs';

export default class Backend {
  constructor(request, url, pollFreq) {
    this.opts = { request, url, pollFreq };
    this.timers = [];
  }

  getCredits(albumId) {
    const { request, url, pollFreq } = this.opts;
    return Rx.Observable.create((subscriber) => {
      let timer;
      const retrieve = receive => request.get(`${url}/${albumId}`).end(receive);
      const receive = (err, res) => {
        if (err) {
          subscriber.error(err);
        } else if (res.body.progress === 100) {
          subscriber.next(res.body);
          subscriber.complete();
        } else {
          timer = setTimeout(() => retrieve(receive), pollFreq);
          this.timers[albumId] = timer;
          subscriber.next(res.body);
        }
      };
      retrieve(receive);
      return () => {
        clearTimeout(timer);
      };
    });
  }

  stopSearch(id) {
    clearTimeout(id);
    delete this.timers[id];
  }

  stopAllSearches() {
    Object.keys(this.timers).forEach(this.stopSearch.bind(this));
  }
}
