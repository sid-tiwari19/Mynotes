import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mt-5">
      <div
        className="card bg-light  mb-4"
        style={{ color: "#DA4B5B", borderColor: "#EFB356" }}
      >
        <div className="card-body">
          <h2 className="card-title  mb-0" style={{ color: "#DA4B5B" }}>
            About MyNotes
          </h2>
          <p className="card-text">
            MyNotes is a personalized note-taking application that allows you to
            create, read, update, and delete notes. With MyNotes, you can easily
            organize your thoughts, ideas, and important information in one
            secure place.
          </p>
        </div>
      </div>

      <h4>Key Features:</h4>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Personalized Notes</h5>
              <p className="card-text">
                Each user has their own account to create and manage their
                notes.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage notes</h5>
              <p className="card-text">
                Easily Add, Edit, and Delete your notes.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tagging System</h5>
              <p className="card-text">
                Assign tags to your notes for easy categorization and
                organization.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Secure and Accessible</h5>
              <p className="card-text">
                Your notes are securely stored and accessible anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p>
          Ready to get started?{" "}
          <Link
            to="/signup"
            style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
            className="btn btn-primary"
          >
            Sign up
          </Link>{" "}
          or{" "}
          <Link
            to="/login"
            style={{ backgroundColor: "#DA4B5B", borderColor: "#EFB356" }}
            className="btn btn-primary"
          >
            log in
          </Link>{" "}
          to start taking notes with MyNotes.
        </p>
      </div>
    </div>
  );
};

export default About;
