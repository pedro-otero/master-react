export default (id, search) => ({
  type: 'SET_SEARCH_RESULT',
  data: {
    id,
    value: search,
  },
});
