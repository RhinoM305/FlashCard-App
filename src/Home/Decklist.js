import Deck from "./Deckview";
import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index";

function DeckList() {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);
    useEffect(() => {
        const abortController = new AbortController();

        listDecks(abortController.signal).then(setDecks).catch(setError);

        return () => abortController.abort();
    }, []);

    if (error) {
        
    }
    const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);
    return (
        <div className="card border-secondary mt-2">
        <div>{list}</div>
        </div>
    )
}

export default DeckList;