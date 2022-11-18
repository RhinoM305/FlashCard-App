import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import BreadCrumb from "../Common/BreadCrumb";
import CardForm from "../Common/CardForm";

function AddCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "" });
  const [error, setError] = useState(undefined);

  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    loadDeck();
    return () => abortController.abort();
  }, []);

  async function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  const submitHandler = (event) => {
    const abortController = new AbortController();
    createCard(deckId, card, abortController.signal);
  };

  const changeHandler = ({ target }) => {
    setCard({ ...card, [target.id]: target.value });
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <BreadCrumb
        deckName={deck.name}
        deckId={deckId}
        currentTab={"Add Card"}
      />
      <h1>{deck.name} :Add Card</h1>
      <CardForm
        deckId={deckId}
        card={card}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default AddCard;
