import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Home/Decklist";
import StudyView from "../Home/Studyview";
import { Switch, Route, Link, useParams } from "react-router-dom";
import { listDecks, readDeck } from "../utils/api/index";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(setError);

    return () => abortController.abort();
  }, []);

  if (error) {
  }
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Link to={`/decks/new`} className="btn btn-secondary">
              Create Deck
            </Link>
            <DeckList decks={decks} />
          </Route>
          <Route exact path={`/decks/:userId`}></Route>
          {/* Display Deck */}
          <Route exact path={`/decks/:deckId/study`}>
            <StudyView decks={decks} />
          </Route>
          {/* Display Deck */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
