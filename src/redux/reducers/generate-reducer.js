export default action => (map = {}, { type, data }) => {
  switch (type) {
    case action: {
      return Object.assign({}, map, {
        [data.id]: data.value,
      });
    }
    default: {
      return map;
    }
  }
};
