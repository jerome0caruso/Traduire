import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect} from 'react'

const UpdateCard = (props) => {
    const [show, setShow] = useState(true);
    const handleClose = () =>  {setShow(false); props.setDeleteOrUpdate('');}
    const [input, setInput] = useState('');

    const updateCard = (cardId) => {
        let formData = {
            cardId: cardId,
            userId: props.currentUser['id'],
            updatedInfo: input
        }
        const body = JSON.stringify(formData);
        fetch(`http://127.0.0.1:5000/updateCard/card${cardId}`, {
            method: 'PUT',
            body: body,
        }).then(res => res.json())
            .then(data => {
                console.log(data, 'redirect');
            })
    }

return (
    <Modal show={show} onHide={handleClose}>, 
        <Modal.Header closeButton>
            <Modal.Title>Update Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <fieldset>
                    <label htmlFor='notes'>Enter your notes here: </label>
                    <input type='text' name='notes' id={props.cardToBeUpdated} className='form-control' value={input} onInput={(e) => setInput(e.target.value)} placeholder='Notes...' />
                </fieldset>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => { handleClose(); updateCard(props.cardToBeUpdated);}}>
                Update Card
            </Button>
        </Modal.Footer>
    </Modal>)

}

export default UpdateCard;