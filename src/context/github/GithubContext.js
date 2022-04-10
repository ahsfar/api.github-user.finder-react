import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
      users: [],
      loading: true
    }
// dispatch the action to our reducers
    const [state, dispatch] = useReducer(githubReducer, initialState)
  // no longer using useState
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState([true]);

  // below: created asynchronous function to get users data from the github api link and with token
  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    
    dispatch({
      type: "GET_USERS",
      payload: data
    })

  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
