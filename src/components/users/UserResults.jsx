import React from "react";
import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    fetchUsers();
  }, []);
  // above: fetching data once the page loads

  // below: created asynchronous function to get users data from the github api link and with token
  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };
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
