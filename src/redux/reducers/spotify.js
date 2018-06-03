export default (state = null, action) => {
  switch (action.type) {
    case 'SET_PLAYBACK_INFO': {
      return action.data;
    }
    default:
      return state;
  }
};
