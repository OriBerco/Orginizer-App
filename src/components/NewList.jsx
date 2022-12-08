import { useContext, useRef } from "react";
import { Button } from "react-bootstrap";
import { createNewTask, getTasks } from "../service/manageTasks";
import { UserContext } from "./userContext";
import { TasksTitleContext } from "./TasksTitleContext";
import { TasksContext } from "./TasksContext";

function NewList({ cLN, toggleBox2 }) {
  const { user } = useContext(UserContext);
  const { setListName } = useContext(TasksTitleContext);
  const { setTasks } = useContext(TasksContext);
  let taskName = useRef("");
  let endDate = useRef("");
  let description = useRef("");
  let listName = useRef("");

  function onAddList(event) {
    event.preventDefault();
    let taskNameValue = taskName.current.value;
    let endDateValue = endDate.current.value;
    let descriptionValue = description.current.value;
    let listNameValue = listName.current.value;
    const newTask = {
      id: user._id.length + 1,
      userId: user._id,
      title: listNameValue,
      taskName: taskNameValue,
      endDate: endDateValue,
      description: descriptionValue,
      status: false,
    };

    if (!listNameValue) {
      throw alert("please enter a title");
    }

    if (!taskNameValue) {
      throw alert("please enter a task name");
    }
    if (new Date(endDateValue).getTime() < new Date().getTime()) {
      throw alert("please enter a valid end date");
    }

    createNewTask(newTask);
    toggleBox2();
    setListName(listNameValue);
    getTasks().then((res) => setTasks(res.data));
    event.target.reset();
  }

  return (
    <>
      <div id="taskBoxWrapper" className={cLN}>
        <div id="taskAdd" className="container centerContent">
          {" "}
          <div
            className="exit"
            onClick={() => {
              toggleBox2();
            }}
          >
            X
          </div>
          <form onSubmit={onAddList} id="listForm">
            <h2>New List</h2>
            <label htmlFor="taskName">List Title</label>

            <input
              type="text"
              id="listName"
              name="listName"
              placeholder="Enter List Title"
              ref={listName}
            />
            <br />
            <br />
            <h4>Add First Task</h4>
            <label htmlFor="taskName">Task Name</label>
            <br />
            <input
              type="text"
              id="taskName"
              name="taskName"
              placeholder="Task Name"
              ref={taskName}
            />
            <br />
            <label htmlFor="endDate">End Date</label>
            <br />
            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="dd/mm/yyyy"
              ref={endDate}
            />
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter Description"
              ref={description}
            />
            <br />
            <br />
            <Button type="submit">Create List</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewList;
