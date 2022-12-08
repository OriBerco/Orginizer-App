import { UserLists } from "../components/UserLists";
import React, { useState } from "react";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList.jsx";
import NewList from "../components/NewList";

export default function TaskZone() {
  const [cN, setCn] = useState("hidden");
  const [cLN, setCLN] = useState("hidden");

  function toggleBox() {
    if (cN == "hidden") setCn("visible");
    else setCn("hidden");
  }
  function toggleBox2() {
    if (cLN == "hidden") setCLN("visible");
    else setCLN("hidden");
  }

  return (
    <>
      <h1>My Lists</h1>
      <UserLists toggleBox2={toggleBox2} />
      <NewList cLN={cLN} toggleBox2={toggleBox2} />
      <hr />
      <AddTask cN={cN} toggleBox={toggleBox} />
      <TasksList toggleBox={toggleBox} />
    </>
  );
}
