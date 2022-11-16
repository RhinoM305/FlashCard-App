import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Home/Decklist";
import StudyView from "../Deck/Studyview";
import DeckView from "../Deck/DeckView";
import CreateDeckView from "../Deck/CreateDeck";
import EditDeck from "../Deck/EditDeck";
import AddCard from "../Card/AddCard";
import EditCard from "../Card/EditCard";
import { PlusCircleIcon } from "@primer/octicons-react";
import { Switch, Route, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Link to={`/decks/new`} className="btn btn-secondary">
              <PlusCircleIcon size={16} />
              Create Deck
            </Link>
            <DeckList />
          </Route>
          <Route exact path={`/decks/new`}>
            <CreateDeckView />
          </Route>
          <Route exact path={`/decks/:deckId`}>
            <DeckView />
          </Route>
          {/* Display Deck */}
          <Route exact path={`/decks/:deckId/study`}>
            <StudyView />
          </Route>
          <Route exact path={`/decks/:deckId/edit`}>
            <EditDeck />
          </Route>
          <Route exact path={`/decks/:deckId/cards/new`}>
            <AddCard />
          </Route>
          <Route exact path={`/decks/:deckId/cards/:cardId/edit`}>
            <EditCard />
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
