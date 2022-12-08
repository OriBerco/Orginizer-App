import { LogOutButton } from "../components/LogOutButton";
import { useContext, useRef } from "react";
import { UserContext } from "../components/userContext";
import { Button } from "react-bootstrap";
import { updateUserDetails } from "../service/manageUsers";

export default function UserZone() {
  const { user } = useContext(UserContext);
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  function onUpdate(e) {
    e.preventDefault();
    if (!confirm("Are you sure you want to update?")) {
      return null;
    }
    const firstNameValue = firstName.current.value;
    const lastNameValue = lastName.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const userDetails = {
      _id: user._id,
      name: {
        firstName:
          firstNameValue.charAt(0).toUpperCase() + firstNameValue.slice(1),
        lastName:
          lastNameValue.charAt(0).toUpperCase() + lastNameValue.slice(1),
      },
      email: emailValue,

      isAdmin: user.isAdmin,
    };
    if (passwordValue) {
      userDetails.password = passwordValue;
    }
    updateUserDetails(userDetails);
  }

  return (
    <>
      <h1>Hello {user.name.firstName}</h1>
      <div className="centerContent">
        <form
          onSubmit={(e) => onUpdate(e)}
          id="registerArea"
        >
          <h2>Update Details</h2>
          <label htmlFor="">First Name</label>
          <br />
          <input
            type="text"
            defaultValue={user.name.firstName}
            ref={firstName}
          />
          <br />
          <label htmlFor="">Last Name </label>
          <br />
          <input type="text" defaultValue={user.name.lastName} ref={lastName} />
          <br />
          <label htmlFor="">Email</label>
          <br />
          <input type="text" defaultValue={user.email} ref={email} />
          <br />
          <label htmlFor="">Password</label>
          <br />
          <input type="password" ref={password} />
          <br />
          <div>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
      <br />
      <LogOutButton />
    </>
  );
}
