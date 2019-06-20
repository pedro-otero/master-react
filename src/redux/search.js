import { buildReducer } from 'state/base/reducers';

export const SET_VALUE = 'SET_VALUE';

export function setValue(value) {
  return {
    type: SET_VALUE,
    data: value,
  };
}

export const reduce = buildReducer([
  [SET_VALUE, (state, { data }) => ({ ...state, value: data })],
], { value: '' });
