import React, { useEffect, useState } from "react"
import { Link,useParams } from "react-router-dom"
import { readCard, readDeck } from "../utils/api/index"


function StudyView() {
    const [deck, setDeck] = useState([]);
    const [cardTotal,setCardTotal] = useState(0);
    const [error, setError] = useState(undefined);
    const [stack, setStack] = useState([])
    const [count, setCount] = useState({pos:1,side:"front"});

    const {deckId} = useParams();

    const abortController = new AbortController();

    useEffect(() => {
        
        readDeck(deckId,abortController.signal)
        .then((value) => {setDeck(value); setCardTotal(value.cards.length)})
                          .catch(setError);
                                                            
        return () => abortController.abort();
    }, [])

    // useEffect(() => {

    // },[deck])
    
    console.log(deck)

    const flipHandler = ({pos,side}) => {
        console.log(pos)
        console.log(side)
        if(count.side.includes("front")) {
            setCount({side:"back"})
        } else {setCount({side:"front"})}
        
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">1 of {cardTotal}</h5>
                <p className="card-text"></p>
                <button type="button" className="btn btn-secondary" onClick={() => flipHandler(count)}>Flip</button>
                </div>
            </div>
        </div>
    )
}

export default StudyView;