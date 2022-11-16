import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import BreadCrumb from "../Layout/BreadCrumb";

function EditDeck() {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);

  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    loadDeck();
    return () => abortController.abort();
  }, []);

  async function loadDeck() {
    readDeck(deckId).then(setDeck).catch(setError);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateDeck(deck, abortController.signal).then((value) =>
      history.push(`/decks/${value.id}`)
    );
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <BreadCrumb currentTab="Edit Deck" />
      <h1>Edit Deck</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="deckNameInput">Name</label>
          <input
            className="form-control"
            id="deckNameInput"
            value={deck.name}
            onChange={(update) =>
              setDeck({ ...deck, name: update.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionInput">Description</label>
          <textarea
            className="form-control"
            id="descriptionInput"
            value={deck.description}
            onChange={(update) =>
              setDeck({ ...deck, description: update.target.value })
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

export default EditDeck;
