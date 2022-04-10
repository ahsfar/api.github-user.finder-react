//taking current state and action
//action is an object that has a type and type is STRING
// in case of data we will send payload
const githubReducer = (state, action) => {
  switch (action.type) {
      case "GET_USERS":
          return{
              ...state,
              users: action.payload,
              loading: false
          }
    default:
      return state;
  }
};

export default githubReducer;
