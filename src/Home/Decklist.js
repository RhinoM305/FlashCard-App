import Deck from "./DeckView";
import { Link } from "react-router-dom";

function DeckList({ decks }) {
  const list = decks.map((deck) => (
    <div className="card-body">
      <Deck key={deck.id} deck={deck} />
      <Link to={`/decks/${deck.id}`} className="btn btn-primary">
        View
      </Link>
      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
        Study
      </Link>
      <button className="btn btn-danger">Delete</button>
    </div>
  ));

  return (
    <div className="card border-secondary mt-2">
      <div>{list}</div>
    </div>
  );
}

export default DeckList;
