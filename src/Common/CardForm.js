import React from "react";
import { Link } from "react-router-dom";

function CardForm({ deckId, card, changeHandler, submitHandler }) {
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="deckNameInput">Front </label>
        <textarea
          className="form-control"
          id="front"
          value={card.front || ""}
          onChange={(event) => changeHandler(event)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="descriptionInput">Back</label>
        <textarea
          className="form-control"
          id="back"
          value={card.back || ""}
          onChange={(event) => changeHandler(event)}
        ></textarea>
      </div>
      <Link className="btn btn-secondary" to={`/decks/${deckId}`}>
        Done
      </Link>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}

export default CardForm;
