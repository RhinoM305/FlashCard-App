import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link } from "react-router-dom";
import { TrashIcon, EyeIcon, RepoIcon } from "@primer/octicons-react";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    loadDecks(abortController.signal).catch(setError);

    return () => abortController.abort();
  }, []);

  if (error) {
    console.log(error);
  }
  async function loadDecks(signal) {
    await listDecks(signal).then(setDecks);
  }

  async function deleteHandler(deckId) {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      await deleteDeck(deckId).then(loadDecks());
    }
  }

  if (error) {
    console.log(error);
  }

  const list = decks.map((deck) => (
    <div className="card border-secondary" key={deck.id}>
      <div className="card-body">
        <div className="d-flex flex-row justify-content-between">
          <h5 className="card-title">{deck.name}</h5>
          <span className="badge badge-light">{deck.cards.length} cards</span>
        </div>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="btn btn-primary">
          <EyeIcon size={16} />
          View
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          <RepoIcon size={16} />
          Study
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => deleteHandler(deck.id)}
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  ));
  return (
    <>
      <div>{list}</div>
    </>
  );
}

export default DeckList;
