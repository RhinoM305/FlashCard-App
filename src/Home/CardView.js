import React from "react";
import flipHandler from "./Studyview";

function CardView({ pos, side = "loading...", total }) {
  if (total > 1) {
    return (
      <>
        <h5 className="card-title">
          {pos + 1} of {total}
        </h5>
        <p className="card-text">{side}</p>
      </>
    );
  } else {
    return <p>random</p>;
  }
}

export default CardView;
