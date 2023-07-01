import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const context = useContext(noteContext);
  const { host } = context;
  let history = useNavigate();
  const [wrong, setWrong] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [passtype, setPasstype] = useState("password");
  const showpass = () => {
    if (passtype === "password") {
      setPasstype("text");
    } else {
      setPasstype("password");
    }
  };
  const onChange = (e) => {
    setWrong(false);
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password, email, confirmpassword } = credentials;
    if (password !== confirmpassword) {
      setWrong(true);
      props.showAlert("Passwords do not match", "danger");
      return false;
    }
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history("/login");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert(json.error, "danger");
    }
  };
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }}>
          <h2>Sign Up</h2>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            value={credentials.name}
            id="name"
            required
            minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={credentials.email}
            onChange={onChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={passtype}
            className="form-control"
            onChange={onChange}
            value={credentials.password}
            id="password"
            required
            style={
              wrong
                ? { backgroundColor: "#F8D7D8", borderBlockColor: "red" }
                : {}
            }
            minLength={8}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type={passtype}
            className="form-control"
            onChange={onChange}
            value={credentials.confirmpassword}
            id="confirmpassword"
            style={
              wrong
                ? { backgroundColor: "#F8D7D8", borderBlockColor: "red" }
                : {}
            }
            required
            minLength={8}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onClick={showpass}
          />
          <label className="form-check-label" htmlFor="showpass">
            show password
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            alignItems: "center",
            marginLeft: "40%",
            backgroundColor: "#DA4B5B",
            borderColor: "#EFB356",
          }}
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
