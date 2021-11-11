import React, { useState, useEffect} from 'react'
import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'



const MyCards = (props) => {
    const [tCards, setTCards] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/getCards${props.currentUser['id']}`, {
            method: 'GET'
        }).then(res => res.json())
          .then(data => {
              console.log(data)
              setTCards(data)
         }).catch(err => console.log(err))
            }, [])

    const deleteCard = (cardId) => {
        const newCardList = tCards.filter(card => card[0] !== cardId)
        setTCards(newCardList);
        let formData = {
            cardId: cardId,
            userId: props.currentUser['id']
        }
        const body = JSON.stringify(formData);
        fetch(`http://127.0.0.1:5000/delete/card${cardId}`, {
            method: 'DELETE',
            body: body,
        }).then(res => res.json())
            .then(data => {
                console.log(data, 'redirect')
            })
            
    }
    const updateCard = () => {

    }
    
    return (
        <>
            <div className='container w-50 text-center d-flex justify-content-center flex-column align-items-center'>
                <h1> My FlashCards</h1>
                {/* <h2>Cards:{tCards}, {rCards}</h2> */}
                {tCards.map((element, i) => {
                        return (
                        <div className="card mx-1 w-50">
                                <div className="card-body">
                                    <h5 className="card-title">{element[1]}</h5>
                                    <h5 className="card-title">{element[2]}</h5>
                                    <p className="card-text">Some descirtions</p>
                                    <button>Edit</button><button  onClick={ handleShow }>Delete</button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete Card</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure that you want to delete this card?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={() => { handleClose(); deleteCard(element[0]);}}>
                                                Delete Card
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>)})}
            </div>
        
        </>
        )

}

export default MyCards;