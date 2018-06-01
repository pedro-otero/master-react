export default (searches = {}, { type, data }) => {
  switch (type) {
    case 'SET_SEARCH_RESULT': {
      return Object.assign({}, searches, {
        [data.id]: data.value,
      });
    }
    default: {
      return searches;
    }
  }
};
