function setIntoMap(state = {}, id, data) {
  const incoming = { loading: false, failed: false, ...data };
  const existing = id ? state[id] : state;
  const merged = { ...existing, ...incoming };
  const result = id ? { [id]: merged } : merged;
  return { ...state, ...result };
}

export function setIntoMapFromArray(arrayName) {
  return function (state = {}, action) {
    return action.data[arrayName]
      .reduce((all, datum) => setIntoMap(all, datum.id, datum), state);
  };
}

export function set(...keys) {
  return function (state = {}, action) {
    let finalKeys = keys;
    if (!finalKeys.length) {
      finalKeys = Object.keys(action.data);
    }
    return setIntoMap(state, action.data.id, {
      ...finalKeys.reduce((partial, key) => ({
        ...partial,
        [key]: action.data[key],
      }), {}),
    });
  };
}

export function fail(state = {}, action) {
  const { data: { id } = {} } = action;
  return setIntoMap(state, id, { loading: false, failed: true });
}

export function startLoad(state = {}, action) {
  const { data: { id } = {} } = action;
  return setIntoMap(state, id, { loading: true, failed: false });
}

export function buildReducer(transformations) {
  return function (state = {}, action) {
    const filtered = transformations.filter(([type]) => type === action.type);
    if (filtered.length) {
      const [[_, reduce]] = filtered;
      return reduce(state, action);
    }
    return state;
  };
}
