//taking current state and action
//action is an object that has a type and type is STRING
// in case of data we will send payload
const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "GET_USER_AND_REPOS":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    // case "GET_REPOS":
    //   return {
    //     ...state,
    //     repos: action.payload,
    //     loading: false,
    //   };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_CLEAR":
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};

export default githubReducer;
