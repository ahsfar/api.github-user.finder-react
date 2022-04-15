import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {     
         Authorization: `token ${GITHUB_TOKEN}`,
}
})


//Get Search Results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
 const response = await github.get(`/search/users?${params}`)
  return response.data.items
  // using axios(used for HTTP requests) above so don't need below code
//   const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });
//   const { items } = await response.json();

//   return items;
};

// get user and repos
export const getUserAndRepos = async (login)=>{
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])
    return {user: user.data, repos: repos.data}
}


// getting rid of both below functions as we're gonna use only one function for both
// //Get a single user
// export const getUser = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });

//   if (response.status === 404) {
//     window.location = "/not foun";
//   } else {
//     const data = await response.json();
//     // paylod is gonna be singler user data that is gonna come from above data
//     //   dispatch({
//     //     type: "GET_USER",
//     //     payload: data,
//     //   });
//     return data;
//   }
// };

// //Get  User Repos function
// export const getUserRepos = async (login) => {
// //   setLoading();
//   // getting the latest 10 repositories
//   const params = new URLSearchParams({
//     sort: "created",
//     per_page: 10,
//   });
//   const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });
//   const data = await response.json();
//   return data;
// //   dispatch({
// //     type: "GET_REPOS",
// //     payload: data,
// //   });
// };
