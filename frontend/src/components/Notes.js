import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function Notes(props) {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const { notes, getNotes, editNote, deleteNote } = context;
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
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/");
    }

    // eslint-disable-next-line
  }, []);

  const [filteredTags, setFilteredTags] = useState([]);

  const handleFilter = (e) => {
    setFilteredTags(Array.isArray(e) ? e.map((x) => x.label) : []);
    if (filteredTags.size === 0) {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter((note) =>
          filteredTags.some((tag) => note.tag.includes(tag))
        )
      );
    }
  };

  useEffect(() => {
    if (notes.length > 0) {
      if (filteredTags.length === 0) {
        setFilteredNotes(notes);
      } else {
        setFilteredNotes(
          notes.filter((note) =>
            filteredTags.some((tag) => note.tag.includes(tag))
          )
        );
      }
    }

    // eslint-disable-next-line
  }, [notes, filteredTags]);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: [],
  });

  const ref2 = useRef(null);
  const refClose2 = useRef(null);
  const confirm2 = () => {
    ref2.current.click();
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleTag = (e) => {
    setNote((prevNote) => ({
      ...prevNote,
      etag: Array.isArray(e) ? e.map((x) => x.label) : [],
    }));
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note has been updated", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <i
          className="bi bi-funnel-fill mx-2"
          style={{ color: "#DA4B5B", fontSize: "25px" }}
        ></i>
        <Select
          isMulti
          name="hello"
          onChange={handleFilter}
          options={options}
          styles={{
            container: (provided) => ({
              ...provided,
              width: 200,
              minWidth: 100,
            }),
          }}
        ></Select>
      </div>
      <button
        type="button"
        ref={ref2}
        className="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#example"
        style={{ visibility: "hidden" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="example"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <b>Are you sure you want to delete this note?</b>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose2}
              >
                Close
              </button>
              <button
                onClick={() => {
                  deleteNote(id);
                  props.showAlert("Note has been deleted", "danger");
                  refClose2.current.click();
                }}
                type="button"
                className="btn btn-danger"
                style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        ref={ref}
        className="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ visibility: "hidden" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                    name="edescription"
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <Select
                    isMulti
                    required
                    value={options.filter((option) =>
                      note.etag.includes(option.label)
                    )}
                    options={options}
                    onChange={handleTag}
                  ></Select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
                disabled={
                  note.etitle.length < 3 ||
                  note.edescription.length < 5 ||
                  note.etag.length === 0
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ margin: "-10px" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Your notes</h2>
        </div>
        <div className="my-3" style={{ textAlign: "center" }}>
          {filteredNotes.length === 0
            ? "No notes to display, Click on '+' to add a new note"
            : ""}
        </div>
        {filteredNotes.map((note) => {
          return (
            <NoteItem
              confirm2={confirm2}
              key={note._id}
              note={note}
              setId={setId}
              updateNote={updateNote}
            />
          );
        })}
      </div>
    </>
  );
}
