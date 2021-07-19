export const initialState = {
  colors: [],
  recipes: [],
};

const reducer = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case "SET_COLORS":
      return { ...state, colors: action.colors };
    // case "SET_SAVED":
    //   return { ...state, saved: action.saved };
    case "SET_GLOBAL_RECIPES":
      return { ...state, recipes: action.recipes };

    case "FILTER_RECIPE_BY_SEARCH":
      // action.recipes.filter((r) =>
      //      r.title.includes(action.searchTerm)

      return {
        ...state,
        recipes: action.recipes,
      };

    default:
      return state;
  }
};

export default reducer;
