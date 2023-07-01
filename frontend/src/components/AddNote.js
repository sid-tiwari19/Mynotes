import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Select from "react-select";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const options = [
    { label: "Work", value: 1 },
    { label: "Personal", value: 2 },
    { label: "To-Do", value: 3 },
    { label: "Meetings", value: 4 },
    { label: "Ideas", value: 5 },
    { label: "Events", value: 6 },
    { label: "Recipes", value: 7 },
    { label: "Travel", value: 8 },
    { label: "Health and Fitness", value: 9 },
    { label: "Goals", value: 10 },
    { label: "Learning", value: 11 },
  ];

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: [],
  });

  const handleTag = (e) => {
    setNote((prevNote) => ({
      ...prevNote,
      tag: Array.isArray(e) ? e.map((x) => x.label) : [],
    }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note has been added successfully", "success");
    props.handleClose();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container">
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              value={note.title}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>

            <textarea
              type="text"
              className="form-control"
              id="description"
              onChange={onChange}
              name="description"
              rows={5}
              minLength={5}
              value={note.description}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <Select isMulti options={options} onChange={handleTag}></Select>
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
            style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
            disabled={
              note.title.length < 3 ||
              note.description.length < 5 ||
              note.tag.length === 0
            }
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
