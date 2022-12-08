import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../service/manageTasks";
import { getUserDetails, loginAuthUser } from "../service/manageUsers";
import { TasksContext } from "../components/TasksContext";
import { UserContext } from "../components/userContext";
import { Button } from "react-bootstrap";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const { setTasks } = useContext(TasksContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  async function loginUser(event) {
    event.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const userDetails = {
      email: emailValue,
      password: passwordValue,
    };
    await loginAuthUser(userDetails, navigate).catch((error) => {
      setError(error.response.data);
    });
    getUserDetails().then((user) => setUser(user));
    getTasks().then((tasks) => setTasks(tasks.data));
  }

  return (
    <div className="centerContent">
      <form id="loginArea" onSubmit={loginUser}>
        <h2>Sign in</h2>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          ref={email}
          onChange={() => setError("")}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          ref={password}
          onChange={() => setError("")}
        />
        <br />
        <br />
        <div>
          <p className="text-danger">{error}</p>
          <Button type="submit">Signin</Button>
        </div>
      </form>
    </div>
  );
}
