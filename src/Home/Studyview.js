import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard, readDeck } from "../utils/api/index";
import CardView from "./CardView";

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
  }, []);

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
  const cardsAreLoaded = () => {
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
            Restart
          </button>
        )}
      </>
    );
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <div className="card">
        <div className="card-body">
          {deck.cards ? cardsAreLoaded() : "loading..."}
        </div>
      </div>
    </div>
  );
}

export default StudyView;
