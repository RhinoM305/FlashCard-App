function CardView({ pos, side, total }) {
  return (
    <>
      <h5 className="card-title">
        Card {pos + 1} of {total}
      </h5>
      <p className="card-text">{side}</p>
    </>
  );
}

export default CardView;
