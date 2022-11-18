import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import BreadCrumb from "../Common/BreadCrumb";
import CardForm from "../Common/CardForm";

function EditCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({});
  const [error, setError] = useState("");

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

  const changeHandler = ({ target }) => {
    setCard({ ...card, [target.id]: target.value });
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <BreadCrumb deckName={deck.name} deckId={deckId} currentTab="Edit Card" />
      <h1>{deck.name}:Edit Card</h1>
      <CardForm
        deckId={deckId}
        card={card}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default EditCard;
