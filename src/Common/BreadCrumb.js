import { Link } from "react-router-dom";
import { HomeFillIcon } from "@primer/octicons-react";

function BreadCrumb({ deckName, deckId, currentTab }) {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to="/">
              <HomeFillIcon size={16} />
              Home
            </Link>
          </li>
          {deckName && (
            <li className="breadcrumb-item active">
              <Link to={`/decks/${deckId}`}>{deckName}</Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {currentTab}
          </li>
        </ol>
      </nav>
    </>
  );
}

export default BreadCrumb;
