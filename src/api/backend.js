import credits from './mocks/credits.json';

export default function Backend() {
  this.getCredits = (track, album) => Promise.resolve(credits);
}
