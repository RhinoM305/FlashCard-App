import React from "react";
import { Link } from "react-router-dom"
import DeleteHandler from "./DeleteHandler";

function Deck({deck}) {
    return (
        
        <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>
        <div>
        <Link to={`/decks/${deck.id}`} className="btn btn-primary">View</Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
        <button onClick={() => DeleteHandler(deck.id)} className="btn btn-danger">Delete</button>
        </div>
        </div>
        
    )
}

export default Deck;