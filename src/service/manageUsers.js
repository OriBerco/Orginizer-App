const url = "https://orginizer-app.herokuapp.com/";
import axios from "axios";
import Cookies from "js-cookie";

export async function getUsers() {
  return await axios
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error.message));
}

export async function registerUser(newUser, navigate) {
  const users = await getUsers();
  let existingUser = users.data.find((u) => u.email == newUser.email);
  if (existingUser) throw alert("email already registered");

  return axios.post(url + "users/register", newUser).then((res) => {
    console.log(res);
    navigate("/login");
  });
}

export async function loginAuthUser(userDetails, navigate) {
  if (userDetails && userDetails.email && userDetails.password) {
    return await axios.post(url + "users/signin", userDetails).then((res) => {
      Cookies.set("jid", res.data, { expires: 0.05 });
      alert("Login Successful");
      navigate("/");
    });
  } else throw alert("invalid user data");
}

export async function getUserDetails() {
  const token = Cookies.get("jid");
try{
    if (token)
    return await axios
      .get(url + "users/getmydetails", { headers: { Authorization: token } })
      .then((res) => {
        return res.data;
      })
      
  else {
    return null
  }
}
catch(err){
console.log(err);
}
}

export async function updateUserDetails(user) {
  return axios
    .put(url + "users/update", user, {
      headers: { Authorization: Cookies.get("jid") },
    })
    .catch((error) => console.log(error.data));
}
export function logout() {
  Cookies.remove("jid");
}
