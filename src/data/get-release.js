import { Observable } from 'rxjs';

const makeGetRelease = (request, url, throttleMs) => id => new Observable((subscriber) => {
  let nextUpdate;
  const updateOnce = () => request.get(`${url}/${id}`).end((err, res) => {
    if (res) {
      subscriber.next(res.body);
      const { progress } = res.body;
      if (progress < 100) {
        nextUpdate = setTimeout(updateOnce, throttleMs);
      } else {
        subscriber.complete();
      }
    } else if (err) {
      subscriber.error(err);
    }
  });

  updateOnce();
  return function unsubscribe() {
    clearInterval(nextUpdate);
  };
});

export default makeGetRelease;
