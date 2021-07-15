export const initialState = {
  colors: [],
};

const reducer = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case "SET_COLORS":
      return { ...state, colors: action.colors };
    default:
      return state;
  }
};

export default reducer;
