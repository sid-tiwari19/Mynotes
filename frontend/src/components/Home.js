import { useEffect, useRef } from "react";
import React from "react";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";

export const Home = (props) => {
  const navigate = useNavigate();

  const ref2 = useRef(null);
  const refClose2 = useRef(null);

  const handleClose = () => {
    refClose2.current.click();
  };

  const handleClick = () => {
    ref2.current.click();
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <Notes showAlert={props.showAlert} />

      <button
        type="button"
        onClick={handleClick}
        className="btn btn-primary"
        style={{
          position: "fixed",
          bottom: "40px",
          right: "min(50px,10%)",
          width: "50px",
          height: "min(50px,10%)",
          padding: "0 0",
          borderRadius: "20%",
          backgroundColor: "white",
          borderColor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <i
          class="bi bi-plus-square-fill d-flex"
          style={{
            fontSize: "50px",
            textAlign: "center",
            margin: "0 0",
            color: "#2CA949",
          }}
        ></i>
      </button>

      {/* Modal */}
      <button
        type="button"
        ref={ref2}
        className="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#addnote"
        style={{ visibility: "hidden" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="addnote"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add a new Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose2}
              ></button>
            </div>

            <div className="modal-body">
              <AddNote showAlert={props.showAlert} handleClose={handleClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
