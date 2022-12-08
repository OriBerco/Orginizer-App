import { useRef, useContext } from "react";
import { Button } from "react-bootstrap";
import { getTasks, updateTask } from "../service/manageTasks";
import { completeTask, deleteTask } from "../service/manageTasks.js";
import { TasksTitleContext } from "./TasksTitleContext";
import $ from "jquery";
import { TasksContext } from "./TasksContext";
import { ToRenderContext } from "./ToRenderContext";

export function PopUpEdit({ task, setSelectedData, filtered }) {
  const { setListName } = useContext(TasksTitleContext);
  const { setTasks } = useContext(TasksContext);
  const { setToRender } = useContext(ToRenderContext);

  const taskName = useRef();
  const endDate = useRef();
  const description = useRef();
  const rerender = (resp) => {
    resp
      ? getTasks().then((res) => {
          setTasks([...res.data]);
        })
      : null;
  };
  const completeTaskHandle = (task) => {
    if (!confirm("are you sure you want to change task status?")) return null;
    completeTask(task);
    setToRender((prev) => (prev == 1 ? 2 : 1));
    setSelectedData(null);
  };

  const deleteTaskHandle = (task) => {
    if (!confirm("are you sure you want to delete task?")) return null;
    deleteTask(task).then(rerender);
    setToRender((prev) => (prev == 1 ? 2 : 1));
    setSelectedData(null);

    if (filtered.length <= 1) {
      setListName("");
    }
  };

  function onUpdate(e) {
    e.preventDefault();
    if (!confirm("are you sure you want to update?")) return null;

    const taskNameValue = taskName.current.value;
    const endDateValue = endDate.current.value;
    const descriptionValue = description.current.value;
    const updatedDetails = {
      _id: task._id,
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
    updateTask(updatedDetails).then(rerender);

    setSelectedData(null);
    e.target.reset();
  }
  function show() {
    if (task) {
      return (
        <div id="editPopUp">
          <div>
            <div
              className="x"
              onClick={() => {
                setSelectedData(null);
              }}
            >
              X
            </div>
            <div className="hidden" id="editNoMobile">
              <form
                onSubmit={(e) => {
                  onUpdate(e);
                }}
              >
                <input
                  type="text"
                  defaultValue={task.taskName}
                  ref={taskName}
                />
                <input
                  type="date"
                  defaultValue={task.endDate.split(".").reverse().join("-")}
                  ref={endDate}
                />
                <input
                  type="text"
                  defaultValue={task.description}
                  ref={description}
                />
                <div>
                  <Button type="submit" padding="5">
                    Update
                  </Button>
                </div>
              </form>
            </div>
            <br />
            {task.taskName}
          </div>
          <div className="centerContent" style={{ flexDirection: "row" }}>
            <div
              onClick={() => {
                deleteTaskHandle(task._id);
              }}
              className="del"
            >
              <img src=".\delete.png" alt="garbage" />
            </div>
            <span className="poperDel"> Delete</span>
            <div
              className="comp"
              onClick={() => {
                completeTaskHandle(task);
              }}
            >
              <img src=".\checklist.png" alt="check" />
            </div>
            <span className="poperComp">Complete</span>
            <div
              className="ed"
              onClick={() => {
                $("#editNoMobile").hasClass("hidden")
                  ? $("#editNoMobile").removeClass("hidden").addClass("visible")
                  : $("#editNoMobile")
                      .removeClass("visible")
                      .addClass("hidden");
              }}
            >
              <img src="public\pencil.png" alt="pencil" />
            </div>
            <span className="poperEd">Edit</span>
          </div>
        </div>
      );
    }
  }

  return show();
}
