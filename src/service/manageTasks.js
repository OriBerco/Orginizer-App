const url = "https://orginizer-app.herokuapp.com/";
import axios from "axios";
import Cookies from "js-cookie";

const token = { headers: { Authorization: Cookies.get("jid") } };

export async function getTasks() {
  try{
    if (token)
    return await axios
      .get(url + "task/getall", {
        headers: { Authorization: Cookies.get("jid") },
      })
      .then((res) => {
        return res;
      })
  }
  catch(err){
   
  }
}
export function completeTask(task) {
  task.status == false ? (task.status = true) : (task.status = false);
  axios.put(url + "task/update", task, {
    headers: { Authorization: Cookies.get("jid") },
  });
}
export function createNewTask(task) {
  if (task.taskName.length > 0) {
    if (task.description == "") {
      task.description = "none";
      return axios
        .post(url + "task/add", task, {
          headers: { Authorization: Cookies.get("jid") },
        })
        .catch((error) => console.log(error.response.data));
    } else {
      return axios
        .post(url + "task/add", task, {
          headers: { Authorization: Cookies.get("jid") },
        })

        .catch((error) => console.log(error.response.data));
    }
  }
}
export function updateTask(task) {
  return axios
    .put(url + "task/update", task, {
      headers: { Authorization: Cookies.get("jid") },
    })
    .catch((error) => console.log(error));
}

export function deleteTask(id) {
  return axios
    .delete(url + "task/deleteone/", {
      headers: { Authorization: Cookies.get("jid") },
      data: { id: id },
    })
    .catch((error) => console.log(error));
}
export function deleteAllCompleted() {
  return axios
    .delete(url + "task/deleteall/", {
      headers: { Authorization: Cookies.get("jid") },
      data: { status: true },
    })

    .catch((error) => console.log(error));
}
export function deleteAllOverdue() {
  return axios
    .delete(url + "task/deleteall/", {
      headers: { Authorization: Cookies.get("jid") },
      data: { endDate: { $lt: new Date() }, status: false },
    })
    .catch((error) => console.log(error));
}
