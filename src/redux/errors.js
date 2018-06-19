export const reduce = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERROR': {
      return [...state, action.data];
    }
    case 'CLEAR_ERRORS': {
      return [];
    }
    default: {
      return state;
    }
  }
};

export const addError = error => ({
  type: 'ADD_ERROR',
  data: error,
});

export const clearErrors = () => ({ type: 'CLEAR_ERRORS' });
