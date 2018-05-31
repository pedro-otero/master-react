export default (id, bestMatch) => ({
  type: 'ADD_BEST_MATCH',
  data: {
    id,
    value: bestMatch,
  },
});
