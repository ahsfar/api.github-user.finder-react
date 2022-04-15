import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

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

  //Get Search Results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //Get a single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/not foun";
    } else {
      const data = await response.json();
      // paylod is gonna be singler user data that is gonna come from above data
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //Get  User Repos function
  const getUserRepos = async (login) => {
    setLoading();
      // getting the latest 10 repositories
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10
    });
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  //Clear Users
  const clearUsers = () =>
    dispatch({
      type: "SET_CLEAR",
    });

  // Set Loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
