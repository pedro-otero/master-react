import { Observable } from 'rxjs';

const makeGetRelease = (axios, throttleMs) => id => new Observable((subscriber) => {
  let nextUpdate;
  const updateOnce = () => axios.get(`/data/album/${id}`).then((res) => {
    subscriber.next(res.data);
    const { progress } = res.data;
    if (progress < 100) {
      nextUpdate = setTimeout(updateOnce, throttleMs);
    } else {
      subscriber.complete();
    }
  }).catch(err => subscriber.error(err));

  updateOnce();
  return function unsubscribe() {
    clearInterval(nextUpdate);
  };
});

export default makeGetRelease;
