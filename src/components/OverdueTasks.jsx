import { PopUpEdit } from "./PopUpEdit";
import { deleteAllOverdue, getTasks } from "../service/manageTasks.js";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { TasksTitleContext } from "./TasksTitleContext";
import { TasksContext } from "./TasksContext";
import { usePopper } from "react-popper";
import { ToRenderContext } from "./ToRenderContext";

export default function OverdueTasks() {
  const { setToRender } = useContext(ToRenderContext);
  const [selectedData, setSelectedData] = useState();
  TasksTitleContext;
  const { tempTasks, setTasks } = useContext(TasksContext);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "left",
  });

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
  function deleteTasks() {
    if (!confirm("Are you sure you want to clear tasks?")) {
      return null;
    }
    deleteAllOverdue().then((resp) => {
      resp
        ? getTasks().then((res) => {
            setTasks([...res.data]);
          })
        : null;
    });
    setToRender((prev) => (prev == 1 ? 2 : 1));
  }
  let filtered = tempTasks.filter(
    (task) => new Date(task.endDate) < new Date() && task.status == false
  );

  let taskRows = filtered
    .sort((a, b) => {
      return a.endDate < b.endDate ? -1 : 1;
    })
    .map((task, i) => {
      return (
        <tr
          key={i}
          className="overdue"
          onClick={() => {
            setSelectedData(null);
            showPop(task);
          }}
        >
          <td>{task.title}</td>
          <td>{task.taskName}</td>
          <td>{task.endDate.split("-").reverse().join("/")}</td>
        </tr>
      );
    });

  if (filtered.length < 1) {
    return (
      <>
        <h3 className="homeTitles">Overdue Tasks ({filtered.length})</h3> <p>None</p>
      </>
    );
  }
  return (
    <div className="centerContent" ref={setReferenceElement}>
      <h3 className="homeTitles">Overdue Tasks ({filtered.length})</h3>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {selectedData}
      </div>
      <div id="homeList" className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>List</th>
              <th>Task</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody id="homeTask">{taskRows}</tbody>
        </table>
      </div>{" "}
      <div>
        <Button onClick={() => deleteTasks()}>Clear</Button>
      </div>
    </div>
  );
}
