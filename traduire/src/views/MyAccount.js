import '../App.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal, Button} from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';

const MyAccout = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const navigate = useNavigate();

    const deleteUser = () => {
        let formData = {
            userId: props.currentUser['id']
        }
        const body = JSON.stringify(formData);
        fetch(`http://127.0.0.1:5000/delete${props.currentUser['id']}`, {
            method: 'DELETE',
            body: body,
        }).then(res => res.json())
            .then(data => {
                console.log(data, 'redirect')
    
            })
    
       //navigate('/home');
        window.location.href = "/home";
    }
    
    return (
        <div className="myAccountContainer">
            <div className="container myAccoutInnerContainer">
                <h1>Hello {props.currentUser['username']}</h1>
                <h2>UserName: {props.currentUser['username']}</h2>
                <h2>Email: {props.currentUser['email']}</h2>
                <h2>UserId: {props.currentUser['id']} </h2>
                <div>
                <Link to="/eachAccount" className="btn editBtn btn-primary mx-3">Edit</Link>
                <Button to="/deleteAccount" className="btn btn-danger" onClick={ handleShow }>Delete</Button>
                </div>
            </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to delete this account?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => { handleClose(); deleteUser();}}>
                    Delete Account
                </Button>
            </Modal.Footer>
        </Modal>

        </div>

    )

}

export default MyAccout;