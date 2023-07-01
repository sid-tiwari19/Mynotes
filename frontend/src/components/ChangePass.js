import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const ChangePass = (props) => {
  const context = useContext(noteContext);
  const { host } = context;
  let history = useNavigate();
  const [wrong, setWrong] = useState(false);
  const [credentials, setCredentials] = useState({
    oldpassword: "",
    newpassword: "",
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
    const { oldpassword, newpassword, confirmpassword } = credentials;
    console.log(credentials);
    if (newpassword !== confirmpassword) {
      setWrong(true);
      props.showAlert("New Passwords do not match", "danger");
      return false;
    }
    const response = await fetch(`${host}/api/auth/changepass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ oldpassword, newpassword }),
    });

    const json = await response.json();
    if (json.success) {
      history("/");
      props.showAlert("Password changed successfully", "success");
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
            Old password
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            value={credentials.oldpassword}
            id="oldpassword"
            required
            minLength={8}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            New password
          </label>
          <input
            type={passtype}
            className="form-control"
            onChange={onChange}
            value={credentials.newpassword}
            id="newpassword"
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
            marginLeft: "10%",
            backgroundColor: "#DA4B5B",
            borderColor: "#EFB356",
          }}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePass;
