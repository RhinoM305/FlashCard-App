import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Home/Decklist";
import StudyView from "../Home/Studyview";
import { Switch, Route  } from "react-router-dom"
import { Link } from "react-router-dom"
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
      <Switch>
        <Route exact path="/">
          <Link to={`/decks/new`} class="btn btn-secondary">Create Deck</Link>
          <DeckList />
        </Route>
        {/* Display Deck */}
        <Route exact path={`/decks/:deckId`}>
          <NotFound />
        </Route>
        {/* Display Deck */}
        <Route exact path={`/decks/:deckId/study`}>
          <StudyView />
        </Route>
        <Route>
          <NotFound />
        </Route>
        
      </Switch>

      </div>
    </>
  );
}

export default Layout;
 