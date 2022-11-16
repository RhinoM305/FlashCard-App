import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardView from "../Card/CardView";
import BreadCrumb from "../Layout/BreadCrumb";
import { PlusCircleIcon, IterationsIcon } from "@primer/octicons-react";

function StudyView() {
  const [deck, setDeck] = useState([]);
  const [cardTotal, setCardTotal] = useState(0);
  const [error, setError] = useState(undefined);
  const [display, setDisplay] = useState({ pos: 0, side: "front" });

  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((value) => {
        setDeck(value);
        setCardTotal(value.cards.length);
      })
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    console.log(error);
  }

  const flipHandler = () => {
    if (display.side.includes("front")) {
      setDisplay({ ...display, side: "back" });
    } else {
      setDisplay({ ...display, side: "front" });
    }
  };

  const nextHandler = () => {
    setDisplay({ ...display, pos: (display.pos += 1), side: "front" });
  };

  const restartHandler = () => {
    setDisplay({ ...display, pos: 0 });
  };
  const deckIsLoaded = () => {
    return (
      <>
        <CardView
          pos={display.pos}
          side={deck.cards[display.pos][display.side]}
          total={cardTotal}
        />
        <button className="btn btn-secondary" onClick={() => flipHandler()}>
          Flip
        </button>
        {display.pos < cardTotal - 1 ? (
          <button className="btn btn-primary" onClick={() => nextHandler()}>
            Next
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => restartHandler()}>
            <IterationsIcon size={16} />
            Restart
          </button>
        )}
      </>
    );
  };
  if (cardTotal > 3) {
    return (
      <div>
        <BreadCrumb deckName={deck.name} deckId={deckId} currentTab="Study" />
        <h1>Study: {deck.name}</h1>
        <div className="card">
          <div className="card-body">
            {deck.cards ? deckIsLoaded() : "loading..."}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <BreadCrumb deckName={deck.name} deckId={deckId} currentTab="Study" />
        <h1>Study: {deck.name}</h1>
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There are {cardTotal} cards in
          this deck.{" "}
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          <PlusCircleIcon size={16} />
          Add Cards
        </Link>
      </div>
    );
  }
}

export default StudyView;
