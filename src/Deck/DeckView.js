import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { PlusCircleIcon, TrashIcon, PencilIcon } from "@primer/octicons-react";
import BreadCrumb from "../Layout/BreadCrumb";

function DeckView() {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);

  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    loadDeck(deckId, abortController.signal).catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    console.log(error);
  }

  async function loadDeck(deckId, signal) {
    readDeck(deckId, signal).then(setDeck);
  }

  async function deleteHandler(deckId) {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      await deleteDeck(deckId).then(history.push("/")).catch(setError);
    }
  }

  async function cardDeleteHandler(cardId) {
    await deleteCard(cardId).then(loadDeck(deckId));
  }

  const deckIsLoaded = () => {
    const list = deck.cards.map((card) => (
      <div className="card border-secondary">
        <div className="card-body">
          <div className="d-flex flex-row">
            <p>{card.front}</p>
            <p>{card.back}</p>
          </div>
          <Link
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
            className="btn btn-secondary"
          >
            <PencilIcon size={16} />
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => cardDeleteHandler(card.id)}
          >
            <TrashIcon size={16} />
          </button>
        </div>
      </div>
    ));
    return <>{list}</>;
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <BreadCrumb currentTab={deck.name} />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
        Edit Deck
      </Link>
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
        Study
      </Link>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        <PlusCircleIcon size={16} />
        Add Card
      </Link>
      <button className="btn btn-danger" onClick={() => deleteHandler(deckId)}>
        <TrashIcon size={16} />
      </button>
      <h2>Cards</h2>
      <div>{deck.cards ? deckIsLoaded() : "Loading..."}</div>
    </div>
  );
}

export default DeckView;
