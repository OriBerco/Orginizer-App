import { useEffect, useState } from "react";
import { getUsers, updateUserDetails } from "../service/manageUsers";
import { usePopper } from "react-popper";
import { UserContext } from "../components/userContext";
import { useContext } from "react";
import PageNotFound from "./PageNotFound";

export default function AdminZone() {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",

  });
  const { user } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const rolePopUp = (user) => {
    if (selectedPopup) {
      setSelectedPopup(null);
    }
    const changeRole = (role) => {
      const userDetails = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: role,
      };
     
      updateUserDetails(userDetails).then((res) =>
        res ? getUsers().then((users) => setUsers(users.data)) : null
      );
      setSelectedPopup(null);
    };
    setSelectedPopup(
      <>
        <div
          className="roleChooser"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="x" onClick={() => setSelectedPopup(null)}>
            X
          </div>
          <div className="admin" onClick={() => changeRole(true)}>
            Admin
          </div>
          <div className="user" onClick={() => changeRole(false)}>
            User
          </div>
         
        </div>
      </>
    );
  };

  useEffect(() => {
    getUsers().then((users) => setUsers(users.data));
  }, []);

  let usersRow = users.map((u, i) => {
    return (
      <tr key={i}>
        <td>
          {u.name.firstName} {u.name.lastName}
        </td>
        <td>{u.email}</td>
        <td>
          <div
            className={!u.isAdmin ? "user" : "admin"}
            onClick={(e) => rolePopUp(u)}
          >
            {!u.isAdmin ? "User" : "Admin"} ↕
          </div>
        </td>
      </tr>
    );
  });
  const displayUsers = () => {
    if (user == null || user.isAdmin == false) return <PageNotFound />;

    return (
      <>
        <h2>All Users</h2>
        <div id="userList">
          <table
            border={1}
            id="usersTable"
            className="content"
            
          >
            <thead ref={setReferenceElement}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>{usersRow}</tbody>
          </table>
        </div>
        {selectedPopup}
      </>
    );
  };
  return <> {displayUsers()}</>;
}
