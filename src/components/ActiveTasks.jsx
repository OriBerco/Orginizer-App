import { PopUpEdit } from "./PopUpEdit";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TasksTitleContext } from "./TasksTitleContext";
import { TasksContext } from "./TasksContext";
import { usePopper } from "react-popper";

export default function ActiveTasks() {
  const { setListName } = useContext(TasksTitleContext);
  const [selectedData, setSelectedData] = useState();
  const [searchData, setSearchData] = useState("");
  TasksTitleContext;
  const { tempTasks } = useContext(TasksContext);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "auto-end",
  });

  function showPop(task, event) {
    if (selectedData) setSelectedData(null);

    setSelectedData(
      <PopUpEdit
        setSelectedData={setSelectedData}
        task={task}
        event={event}
        filtered={filtered}
      />
    );
  }
  let filtered = tempTasks.filter(
    (task) =>
      new Date(task.endDate) > new Date() &&
      task.status == false &&
      task.taskName.includes(searchData)
  );

  let taskRows = filtered
    .sort((a, b) => {
      return a.endDate < b.endDate ? -1 : 1;
    })
    .map((task, i) => {
      return (
        <tr
          key={i}
          className={task.status == true ? "Completed" : "Uncompleted"}
          onClick={(event) => {
            setSelectedData(null);
            showPop(task, event);
          }}
        >
          <td>{task.title}</td>
          <td>{task.taskName}</td>
          <td>{task.endDate.split("-").reverse().join("/")}</td>
        </tr>
      );
    });
  function activeTasksDisplay() {
    if (filtered.length < 1) {
      return (
        <>
          <p>None</p>
        </>
      );
    }
    return (
      <>
        {" "}
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
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
      </>
    );
  }
  return (
    <div className="centerContent" ref={setReferenceElement}>
      <h3 className="homeTitles">Active Tasks ({filtered.length})</h3>
      
      <input
        type="search"
        placeholder="Search"
        onChange={(event) => setSearchData(event.target.value)}
      />
      {activeTasksDisplay()}
      <div>
        <Link to="/lists">
          <Button onClick={() => setListName("")}>All Tasks</Button>
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
}
