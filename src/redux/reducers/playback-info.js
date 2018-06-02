export default (state, action) => {
  switch (action.type) {
    case 'SET_PLAYBACK_INFO': {
      return action.data;
    }
    default:
      return state;
  }
};
