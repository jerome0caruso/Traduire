import React, { useState, useEffect} from 'react'
import DeleteCard from '../componets/DeleteCard';
import UpdateCard from '../componets/UpdateCard';

const MyCards = (props) => {
    const [tCards, setTCards] = useState([]);
    const [cardToBeDeleted, setCardToBeDeleted] = useState('');
    const [cardToBeUpdated, setCardToBeUpdated] = useState('');
    const [deleteOrUpdate, setDeleteOrUpdate] = useState('');
    const [input, setInput] = useState('');
    
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
        setDeleteOrUpdate(comp)
    }
    
    return (
        <>
            <div className='container card text-center d-flex justify-content-center my-5 flex-column align-items-center'>
                <h1 className="my-5 flashMessage">FlashCards</h1>
                <div className="cardlistContainer">
                    {tCards.map((element, i) => {
                        return (
                        <div className="card mx-1 w-50" key={i}>
                            <div className="card-body">
                                <h5 className="card-title">{element[1]}</h5>
                                <h5 className="card-title">{element[2]}</h5>
                                <p className="card-text">{ element[3] }</p>
                                <button onClick={() => { handleCardUpdate('update'); handleCardToUpdated(element[0])} }>Edit</button><button onClick={() => { setDeleteOrUpdate('delete'); handleCardToDelete(element[0])} }>Delete</button>
                                { deleteOrUpdate === 'delete' ? <DeleteCard currentUser={props.currentUser} cardToBeDeleted={cardToBeDeleted} tCards={tCards} setTCards={setTCards} deleteOrUpdate={deleteOrUpdate} setDeleteOrUpdate={setDeleteOrUpdate}/> : null }
                                {deleteOrUpdate === 'update' ? <UpdateCard currentUser={props.currentUser} cardToBeUpdated={cardToBeUpdated} cardNote={props.cardNote} setCardNote={props.setCardNote} deleteOrUpdate={deleteOrUpdate} setDeleteOrUpdate={setDeleteOrUpdate} cardNote={props.cardNote} setCardNote={props.setCardNote} input={input} setInput={setInput} tCards={tCards} setTCards={setTCards}/> : null}
                            </div>
                        </div>)})}
                </div>
            </div>
        
        </>
        )

}

export default MyCards;