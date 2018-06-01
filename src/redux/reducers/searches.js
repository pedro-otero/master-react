export default (bestMatches = {}, { type, data }) => {
  switch (type) {
    case 'SET_SEARCH_RESULT': {
      return Object.assign({}, bestMatches, {
        [data.id]: data.value,
      });
    }
    default: {
      return bestMatches;
    }
  }
};
