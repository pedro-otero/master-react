export default type => (id, value) => ({
  type,
  data: {
    id,
    value,
  },
});
