import React from "react";
import DeleteHandler from "./DeleteHandler";

function Deck({ deck }) {
  return (
    <>
      <h5 className="card-title">{deck.name}</h5>
      <p className="card-text">{deck.description}</p>
    </>
  );
}

export default Deck;
