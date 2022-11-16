import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import BreadCrumb from "../Layout/BreadCrumb";

function EditCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);

  const { deckId, cardId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    loadDeck();
    return () => abortController.abort();
  }, [deckId, cardId]);

  async function loadDeck() {
    readDeck(deckId).then(setDeck).catch(setError);
    readCard(cardId).then(setCard).catch(setError);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(card, abortController.signal);
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <BreadCrumb deckName={deck.name} deckId={deckId} currentTab="Edit Card" />
      <h1>
        {deck.name}:Edit Card {cardId}
      </h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="deckNameInput">Front </label>
          <textarea
            className="form-control"
            id="cardFrontInput"
            value={card.front}
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
            value={card.back}
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

export default EditCard;
