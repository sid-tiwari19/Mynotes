import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const context = useContext(noteContext);
  const { host } = context;
  const [passtype, setPasstype] = useState("password");
  const showpass = () => {
    if (passtype === "password") {
      setPasstype("text");
    } else {
      setPasstype("password");
    }
  };
  let history = useNavigate();
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      if (response.ok) {
        localStorage.setItem("token", json.authtoken);
        history("/");
        props.showAlert("Login successful", "success");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "min(5%,150px)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }}>
          <h2>Login</h2>
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
            style={{ width: "min(350px,100%)" }}
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
            style={{ width: "min(350px,100%)" }}
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
          style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
