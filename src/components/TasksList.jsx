import { PopUpEdit } from "./PopUpEdit";
import { UserContext } from "./userContext.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TasksTitleContext } from "./TasksTitleContext";
import { TasksContext } from "./TasksContext";
import { usePopper } from "react-popper";

export default function TasksList({ toggleBox }) {
  const [selectedData, setSelectedData] = useState();
  const { user } = useContext(UserContext);
  const { listName } = useContext(TasksTitleContext);
  const { tempTasks } = useContext(TasksContext);
  const [searchData, setSearchData] = useState("");
  const [optionsData, setOptionsData] = useState("task.taskName != null");
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "auto-end",
    flip: {
      behavior: ["left", "right", "top", "bottom"],
    },
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top", "bottom"],
        },
      },
    ],
  });
  useEffect(() => {
    setSearchData("");
  }, [listName]);
  let filtered = tempTasks.filter(
    (task) =>
      task.title == listName &&
      task.taskName.includes(searchData) &&
      eval(optionsData)
  );
  function showPop(task) {
    if (selectedData) setSelectedData(null);

    setSelectedData(
      <PopUpEdit
        setSelectedData={setSelectedData}
        task={task}
        filtered={filtered}
      />
    );
  }
  const handleSelectChange = (e) => {
    if (e.target.value == "1") {
      setOptionsData("task.taskName != null");
    }
    if (e.target.value == "2") {
      setOptionsData("task.status == true");
    }
    if (e.target.value == "3") {
      setOptionsData("task.status == false");
    }
    if (e.target.value == "4") {
      setOptionsData("new Date(task.endDate) < new Date()");
    }
  };
  let taskRows = filtered.map((task, i) => {
    return (
      <tr
        key={i}
        className={
          task.status == true
            ? " Completed"
            : " Uncompleted" && new Date(task.endDate) < new Date()
            ? "overdue"
            : ""
        }
        onClick={() => {
          showPop(task);
        }}
      >
        <td>{i + 1 + "."}</td>
        <td>{task.taskName}</td>
        <td>{task.endDate.split("-").reverse().join("/")}</td>
        <td>{task.description}</td>
        <td>{task.status == true ? "Completed" : "Uncompleted"}</td>
      </tr>
    );
  });

  function taskListDisplay() {
    if (!user) {
      return (
        <div>
          <h3>Log in to see lists</h3>
          <Link to="/login">
            <Button>Signin</Button>
          </Link>
          <br />
          <br />

          <p> Dont have an account yet?</p>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      );
    }
    if (listName.length < 1) {
      return <div>Choose a list or make a new one</div>;
    }
    return (
      <>
        <div id="taskListBox">
          <h3>{listName}</h3>
          <select onChange={handleSelectChange}>
            <option value="1">All</option>
            <option value="2">Completed</option>
            <option value="3">Uncompleted</option>
            <option value="4">Overdue</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => setSearchData(event.target.value)}
            value={searchData}
            className="search"
          />
          <br />
          <Button onClick={() => toggleBox("Add")}>&#10798; Add Task</Button>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {selectedData}

            <div ref={setArrowElement} style={styles.arrow} />
          </div>
          <div id="taskList">
            {taskRows.length > 0 ? (
              <table ref={setReferenceElement}>
                <thead>
                  <tr className="tableHeadRow">
                    <th>#</th>
                    <th>Task</th>
                    <th>End Date</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="task">{taskRows}</tbody>
              </table>
            ) : (
              <p>None </p>
            )}
          </div>
        </div>
      </>
    );
  }

  return <>{taskListDisplay()}</>;
}
