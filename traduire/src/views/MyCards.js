import React, { useState, useEffect } from 'react'

const MyCards = (props) => {
    const [tCards, setTCards] = useState([]);
    const [rCards, setRCards] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/getCards${props.currentUser['id']}`, {
            method: 'GET'
        }).then(res => res.json())
          .then(data => {
              setTCards(data)
         }).catch(err => console.log(err))
            }, [])

    return (
        <div className='container w-50'>
            <h1> My Saved phrases</h1>
            {/* <h2>Cards:{tCards}, {rCards}</h2> */}
            {tCards.map((element, i) => {
                    return (
                    <div className="card mx-1">
                            <div className="card-body">
                                <h5 className="card-title">{element[1]}</h5>
                                <h5 className="card-title">{element[2]}</h5>
                                <p className="card-text">Some descirtions</p>
                                <button>Edit</button><button>Delete</button>
                            </div>
                        </div>)})}
        </div>)

}

export default MyCards;