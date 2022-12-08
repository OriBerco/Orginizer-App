import { useContext, useState } from "react";
import { TasksContext } from "./TasksContext";
import { TasksTitleContext } from "./TasksTitleContext";
import { UserContext } from "./userContext";
import { Button } from "react-bootstrap";
import { getTasks } from "../service/manageTasks";
import { useEffect } from "react";

export function UserLists({ toggleBox2 }) {
  const { setListName } = useContext(TasksTitleContext);
  const { tempTasks } = useContext(TasksContext);
  const [tempTitle, setTempTitle] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getTasks().then((res) => {
      setTempTitle([
        ...res.data.map((task) => {
          return task.title;
        }),
      ]);
    });
  }, [tempTasks]);

  const titleArr = [...new Set(tempTitle)].map((task, i) => {
    return (
      <div className="centerContent" key={i}>
        <div
          className="listTitle"
          key={i}
          onClick={() => {
            setListName(task);
          }}
        >
          {task}
        </div>
        <span> |</span>
      </div>
    );
  });
  const displaytitles = () => {
    if (!user) {
      return (
        <>
          <br />
        </>
      );
    }
    if (titleArr < 1) {
      return (
        <>
          <Button onClick={() => toggleBox2()}>New List</Button>
          <br />
          <hr />
          <div> No Lists </div>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={() => toggleBox2()}>New List</Button>
          <br />
          <br />
          <div id="allTasksBar">|{titleArr}</div>
        </>
      );
    }
  };

  return <>{displaytitles()}</>;
}
