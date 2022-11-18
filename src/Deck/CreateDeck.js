import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import React, { useState } from "react";
import BreadCrumb from "../Common/BreadCrumb";

function CreateDeckView() {
  const [deckForm, setDeckForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createDeck(deckForm, abortController.signal)
      .then((value) => history.push(`/decks/${value.id}`))
      .catch(setError);
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <BreadCrumb currentTab="Create Deck" />
      <h1>Create Deck</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="deckNameInput">Name</label>
          <input
            className="form-control"
            id="deckNameInput"
            placeholder="Deck Name"
            onChange={(update) =>
              setDeckForm({ ...deckForm, name: update.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionInput">Description</label>
          <textarea
            className="form-control"
            id="descriptionInput"
            placeholder="brief description of deck"
            onChange={(update) =>
              setDeckForm({ ...deckForm, description: update.target.value })
            }
          ></textarea>
        </div>
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeckView;
