import { Link } from "react-router-dom";
import UserBar from "./UserBar";
import { Nav, Navbar, Container } from "react-bootstrap";


export default function NavigationBar() {
  return (
    <>
      <Navbar id="userBar" collapseOnSelect expand="lg">
        <Container>
          {" "}
          <img
            src="public\to-do-list.png"
            alt="todo"
            style={{ width: "40px" }}
          />
          <Navbar.Brand href="/">Orginizer</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" eventKey="1">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" eventKey="2">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/lists" eventKey="3">
                My Lists
              </Nav.Link>
              <Nav.Link as={Link} to="/contacts" eventKey="4">
                Contact Us
              </Nav.Link>
            </Nav>

            <UserBar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
