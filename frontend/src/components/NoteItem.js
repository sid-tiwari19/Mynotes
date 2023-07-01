import React from "react";

export default function NoteItem(props) {
  const { note, updateNote } = props;
  const handleClick = async () => {
    await props.setId(note._id);
    props.confirm2();
  };

  return (
    <div className="col-md-3 my-2">
      <div
        className="card my-2"
        style={{ minHeight: "300px", backgroundColor: "#F9FFEA" }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between mx-1">
            <div>
              {note.tag.map((t) => (
                <span className="badge text-bg-danger my-2 mx-1">{t}</span>
              ))}
            </div>
            <div>
              <i
                className="bi bi-pencil-square mx-3"
                style={{ color: "green", fontSize: "20px" }}
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
              <i
                className="bi bi-x-circle-fill"
                style={{
                  color: "red",
                  fontSize: "20px",
                }}
                onClick={handleClick}
              ></i>
            </div>
          </div>
          <div className="d-flex align-items-cemter justify-content-between">
            <h5 className="card-title">{note.title}</h5>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
        <div
          className="my-1 mx-2"
          style={{
            color: "gray",
            fontFamily: "Times New Roman, Times, serif",
            fontStyle: "italic",
            fontSize: "12px",
          }}
        >
          created on - {new Date(note.date).toDateString()} at{" "}
          {new Date(note.date).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
