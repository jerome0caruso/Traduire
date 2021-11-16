import { Modal, Button} from 'react-bootstrap';
import React, { useState} from 'react'

const DeleteCard = (props) => {
    const [show, setShow] = useState(true);
    const handleClose = () => {setShow(false); props.setDeleteOrUpdate('');}


    const deleteCard = (cardId) => {
        console.log(cardId)
    const newCardList = props.tCards.filter(card => card[0] !== cardId);
        props.setTCards(newCardList);
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

return (
    <Modal show={show} onHide={handleClose}>, 
        <Modal.Header closeButton>
            <Modal.Title>Delete Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this card?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => { handleClose(); deleteCard(props.cardToBeDeleted);}}>
                Delete Card
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default DeleteCard;