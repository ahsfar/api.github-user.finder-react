import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  // dispatch the action to our reducers
  const [state, dispatch] = useReducer(githubReducer, initialState);
  // no longer using useState
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState([true]);

  // below: created asynchronous function to get users data from the github api link and with token
  //Get initial users (testing purposes)
  // const fetchUsers = async () => {

  //   setLoading();
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const data = await response.json();

  //   dispatch({
  //     type: "GET_USERS",
  //     payload: data
  //   })
  // };



  // //Clear Users
  // const clearUsers = () =>
  //   dispatch({
  //     type: "SET_CLEAR",
  //   });

  // // Set Loading
  // const setLoading = () =>
  //   dispatch({
  //     type: "SET_LOADING",
  //   });
  return (
    <GithubContext.Provider
      value={{
        // users: state.users,
        // loading: state.loading,
        // user: state.user,
        // repos: state.repos,
        //instead of above states we can just return ...state
        ...state,
        dispatch,
        // searchUsers,
        // clearUsers,
        // getUser,
        // getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
