export default (id, bestMatch) => ({
  type: 'SET_SEARCH_RESULT',
  data: {
    id,
    value: bestMatch,
  },
});
