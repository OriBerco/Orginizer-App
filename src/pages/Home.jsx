import  { useContext } from "react";
import CompletedTasks from "../components/CompletedTasks";
import OverdueTasks from "../components/OverdueTasks";
import ActiveTasks from "../components/ActiveTasks";
import { UserContext } from "../components/userContext";

export default function Home() {
  const { user } = useContext(UserContext);

  function greet() {
    return user ? (
      <>
        <h1>
          Hi{" "}
          {user.name.firstName.charAt(0).toUpperCase() +
            user.name.firstName.slice(1)}
          !
        </h1>
        <p className="homeParagraph">Thank you for staying orginized!</p>
        <hr />
        <div id="homePageLists">
          <div id="homeTopLists">
            <div>
              <OverdueTasks />
            </div>
            <div>
              <CompletedTasks />
            </div>
          </div>
          <div id="homeBottomLists">
            <div></div>
            <div>
              <ActiveTasks />
            </div>
            <div></div>
          </div>
        </div>
      </>
    ) : (
      <>
        <h1>Welcome to Orginizer</h1>
        <br />
        <p>Your day to day helper to staying orginized!</p>
        <p>Just register or log in and start orginizing! </p>
      </>
    );
  }

  return <>{greet()}</>;
}
