export const reduce = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERROR': {
      return [...state, action.data];
    }
    default: {
      return state;
    }
  }
};
