import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/manageUsers";
import { TasksContext } from "./TasksContext";
import { TasksTitleContext } from "./TasksTitleContext";
import { UserContext } from "./userContext";

export function LogOutButton() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setTasks } = useContext(TasksContext);
  const { setListName } = useContext(TasksTitleContext);
  return (
    <Button
      onClick={() => {
        logout();
        setUser(null);
        setTasks([]);
        setListName("");
        navigate("/");
      }}
    >
      Logout
    </Button>
  );
}
