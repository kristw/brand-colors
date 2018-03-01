import Types from './actionTypes';

const reducer = (state = {
}, action) => {
  const { payload } = action;

  let nextState = state;
  switch (action.type) {
    case Types.INIT:
      nextState = { ...state };
      break;
    case Types.BUILD_STATE:
      nextState = { ...state };
      break;
    case Types.FLIP:
      nextState = { ...state };
      break;
  }
  return nextState;
};

export default reducer;
