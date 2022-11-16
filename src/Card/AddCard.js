import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";

function AddCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "" });
  const [error, setError] = useState(undefined);

  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    loadDeck();
    return () => abortController.abort();
  }, []);

  async function loadDeck() {
    readDeck(deckId).then(setDeck).catch(setError);
  }

  const submitHandler = (event) => {
    const abortController = new AbortController();
    createCard(deckId, card, abortController.signal);
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}:Add Card</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="deckNameInput">Name</label>
          <textarea
            className="form-control"
            id="cardFrontInput"
            placeholder="Front Side Of Card"
            onChange={(update) =>
              setCard({ ...card, front: update.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="descriptionInput">Back</label>
          <textarea
            className="form-control"
            id="cardBackInput"
            placeholder="Back Side Of Card"
            onChange={(update) =>
              setCard({ ...card, back: update.target.value })
            }
          ></textarea>
        </div>
        <Link className="btn btn-secondary" to={`/decks/${deckId}`}>
          Done
        </Link>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
