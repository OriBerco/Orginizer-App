import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LogOutButton } from "./LogOutButton";

export default function UserBar() {
  const { user } = useContext(UserContext);
  function userBarDisplay() {
    if (!user) {
      return (
        <div className="notUser">
          <Nav.Link as={Link} to="/login" eventKey="5">
            Signin
          </Nav.Link>
          <Nav.Link as={Link} to="/register" eventKey="6">
            Register
          </Nav.Link>
        </div>
      );
    }

    if (user.isAdmin == true) {
      return (
        <>
          <NavDropdown
            title={
              user.name.firstName.charAt(0).toUpperCase() +
              user.name.firstName.slice(1) +
              " " +
              user.name.lastName.charAt(0).toUpperCase() +
              user.name.lastName.slice(1)
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to="/userzone">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/adminzone">
              All Users
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <LogOutButton />
            </NavDropdown.Item>
          </NavDropdown>
        </>
      );
    } else {
      return (
        <NavDropdown
          title={
            user.name.firstName.charAt(0).toUpperCase() +
            user.name.firstName.slice(1) +
            " " +
            user.name.lastName.charAt(0).toUpperCase() +
            user.name.lastName.slice(1)
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item as={Link} to="/userzone">
            User Zone
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <LogOutButton />
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  }
  return <> {userBarDisplay()}</>;
}
