import React from "react";
import { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";


function UserResults() {
// using usetate with context api and importing users, loading and fetchUsers
//from global state from GithubContext.jsx
const {users, loading } = useContext(GithubContext)

  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  // // above: fetching data once the page loads


  // below: putting condition if it's not lodaing then show the users from UserItem and passing user with ID
  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-col-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    // passing Spinner component if it loads then it'll be showing spinnger gif
    return <Spinner />;
  }
}

export default UserResults;
