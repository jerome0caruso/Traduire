import React, { useState, useEffect} from 'react'
import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'
import DeleteCard from '../componets/DeleteCard';
import UpdateCard from '../componets/updateCard';

const MyCards = (props) => {
    const [tCards, setTCards] = useState([]);
    const [cardToBeDeleted, setCardToBeDeleted] = useState('');
    const [cardToBeUpdated, setCardToBeUpdated] = useState('');
    const [deleteOrUpdate, setDeleteOrUpdate] = useState('');

    console.log(deleteOrUpdate)
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/getCards${props.currentUser['id']}`, {
            method: 'GET'
        }).then(res => res.json())
          .then(data => {
              console.log(data)
              setTCards(data)
         }).catch(err => console.log(err))
            }, [])

    const handleCardToDelete = (id) => {
        setCardToBeDeleted(id)
    }
    const handleCardToUpdated = (id) => {
        setCardToBeUpdated(id)
    }
    const handleCardUpdate = (comp) => {
        console.log("here")
        setDeleteOrUpdate(comp)
    }
    
    return (
        <>
            <div className='container w-50 text-center d-flex justify-content-center flex-column align-items-center'>
                <h1> My FlashCards</h1>
                {/* <h2>Cards:{tCards}, {rCards}</h2> */}
                {tCards.map((element, i) => {
                        return (
                        <div className="card mx-1 w-50" key={i}>
                                <div className="card-body">
                                    <h5 className="card-title">{element[1]}</h5>
                                    <h5 className="card-title">{element[2]}</h5>
                                    <p className="card-text">{ element[3] }</p>
                                    <button onClick={() => { handleCardUpdate('update'); handleCardToUpdated(element[0])} }>Edit</button><button onClick={() => { setDeleteOrUpdate('delete'); handleCardToDelete(element[0])} }>Delete</button>
                                    { deleteOrUpdate === 'delete' ? <DeleteCard currentUser={props.currentUser} cardToBeDeleted={cardToBeDeleted} tCards={tCards} setTCards={setTCards} deleteOrUpdate={deleteOrUpdate} setDeleteOrUpdate={setDeleteOrUpdate}/> : null }
                                    {deleteOrUpdate === 'update' ? <UpdateCard currentUser={props.currentUser} cardToBeUpdated={cardToBeUpdated} cardNote={props.cardNote} setCardNote={props.setCardNote} deleteOrUpdate={deleteOrUpdate} setDeleteOrUpdate={setDeleteOrUpdate}                     cardNote={props.cardNote} setCardNote={props.setCardNote}/> : null}
                                </div>
                            </div>)})}
            </div>
        
        </>
        )

}

export default MyCards;