import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import image from "./list-1882326_1920.png";

export const Navbar = (props) => {
  const context = useContext(noteContext);
  const { setNotes } = context;
  let location = useLocation();
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token"); //remove auth-token
    navigate("/login"); //auto naivgate to Login page
    setNotes([]); //delete notes from the user device
    props.showAlert("logged out successfully", "info");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg border-bottom border-bottom-dark "
        style={{ backgroundColor: "black" }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <img
            src={image}
            alt=""
            style={{ width: "35px", marginRight: "10px" }}
          />
          <Link className="navbar-brand" to="#">
            Mynotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token") === null ? (
              <>
                <Link
                  to="/login"
                  style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
                  className="btn btn-primary"
                  role="button"
                >
                  Login
                </Link>
                <div
                  className="mx-2"
                  style={{ color: "white", paddingTop: "5px" }}
                >
                  or
                </div>
                <Link
                  to="/signup"
                  style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
                  className="btn btn-primary"
                  role="button"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/changepass"
                  style={{ color: "#EFB356" }}
                  className="link-underline-danger mx-3"
                >
                  Change Password
                </Link>
                <button
                  style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
                  className="btn btn-primary"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
