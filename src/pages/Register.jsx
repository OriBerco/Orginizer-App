import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/manageUsers";

export default function Register() {
  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const Navigate = useNavigate();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  function addUser(event) {
    event.preventDefault();
    const firstNameValue = firstName.current.value;
    const lastNameValue = lastName.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (passwordValue.length > 50) {
      setPasswordError("Password too long");
      return null;
    } else if (passwordValue.search(/\d/) == -1) {
      setPasswordError("Password needs one number");
      return null;
    } else if (passwordValue.search(/[a-zA-Z]/) == -1) {
      setPasswordError("Password needs one letter");
      return null;
    } else if (
      passwordValue.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1
    ) {
      setPasswordError("Password bad_char");
      return null;
    } else {
      setPasswordError("");

      const newUser = {
        name: {
          firstName:
            firstNameValue.charAt(0).toUpperCase() + firstNameValue.slice(1),
          lastName:
            lastNameValue.charAt(0).toUpperCase() + lastNameValue.slice(1),
        },
        email: emailValue,
        password: passwordValue,
        isAdmin: false,
      };
      registerUser(newUser, Navigate).catch((err) => {
        if (err.response.data.includes("Email")) {
          setEmailError(err.response.data);
        } else {
          setEmailError("");
        }
        if (err.response.data.includes("Password")) {
          setPasswordError(err.response.data);
        } else {
          setPasswordError("");
        }
        if (err.response.data.includes("First")) {
          setFNameError(err.response.data);
        } else {
          setFNameError("");
        }
        if (err.response.data.includes("Last")) {
          setLNameError(err.response.data);
        } else {
          setLNameError("");
        }
      });
    }
  }
  return (
    <div className="centerContent">
      <form onSubmit={(event) => addUser(event)} id="registerArea">
        <h2>Register</h2>
        <label htmlFor="firstName">First Name:</label>
        <br />

        <input
          type="text"
          id="firstName"
          name="firstName"
          ref={firstName}
          onChange={() => setFNameError("")}
        />
        <br />
        <div className="text-danger" id="errDiv">
          {fNameError}
        </div>
        <label htmlFor="lastName">Last Name:</label>
        <br />

        <input
          type="text"
          id="lastName"
          name="lastName"
          ref={lastName}
          onChange={() => setLNameError("")}
        />

        <br />
        <div className="text-danger" id="errDiv">
          {lNameError}
        </div>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          ref={email}
          onChange={() => setEmailError("")}
        />

        <br />
        <div className="text-danger" id="errDiv">
          {emailError}
        </div>
        <label htmlFor="password">Password:</label>
        <br />

        <input
          type="password"
          name="password"
          id="password"
          ref={password}
          onChange={() => setPasswordError("")}
        />

        <br />
        <div className="text-danger" id="errDiv">
          {passwordError}
        </div>
        <br />
        <div>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
}
