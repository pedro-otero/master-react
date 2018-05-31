export default (bestMatches = {}, { type, data }) => {
  switch (type) {
    case 'ADD_BEST_MATCH': {
      return Object.assign({}, bestMatches, {
        [data.id]: data.value,
      });
    }
    default: {
      return bestMatches;
    }
  }
};
