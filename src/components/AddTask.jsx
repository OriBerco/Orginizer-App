import { useContext, useRef } from "react";
import { Button } from "react-bootstrap";
import { createNewTask, getTasks } from "../service/manageTasks";
import { UserContext } from "./userContext";
import { TasksTitleContext } from "./TasksTitleContext";
import { TasksContext } from "./TasksContext";

export default function AddTask({ cN, toggleBox }) {
  const { user } = useContext(UserContext);
  const { listName } = useContext(TasksTitleContext);
  const { setTasks } = useContext(TasksContext);
  let taskName = useRef("");
  let endDate = useRef("");
  let description = useRef("");
  async function onAdd(event) {
    event.preventDefault();
    let taskNameValue = taskName.current.value;
    let endDateValue = endDate.current.value;
    let descriptionValue = description.current.value;
    const newTask = {
      id: user._id.length + 1,
      userId: user._id,
      title: listName,
      taskName: taskNameValue,
      endDate: endDateValue,
      description: descriptionValue,
      status: false,
    };

    if (new Date(endDateValue) < new Date()) {
      throw alert("please enter a valid end date");
    }
    if (!taskNameValue) {
      throw alert("please enter a task name");
    }
    createNewTask(newTask).then((resp) => {
      
      resp
        ? getTasks().then((res) => {
           
            setTasks([...res.data]);
          })
        : console.log("no");
      {
      }
    });
    toggleBox();
    event.target.reset();
  }

  return (
    <>
      <div id="taskBoxWrapper" className={cN}>
        <div id="taskAdd" className="container centerContent">
          {" "}
          <div
            className="exit"
            onClick={() => {
              toggleBox();
            }}
          >
            X
          </div>
          <h2>Add Task</h2>
          <form onSubmit={onAdd} id="listForm">
            <label htmlFor="taskName">Task Name:</label>
            <br />
            <input
              type="text"
              id="taskName"
              name="taskName"
              placeholder="Enter Name"
              ref={taskName}
            />
            <br />
            <label htmlFor="endDate">End Date:</label>
            <br />

            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="dd/mm/yyyy"
              ref={endDate}
            />
            <br />
            <label htmlFor="description">Description:</label>
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
            <Button type="submit">Create Task</Button>
          </form>
        </div>
      </div>
    </>
  );
}
