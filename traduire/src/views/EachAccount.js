import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EachAccount = (props) => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    console.log(props.currentUser);
    const handleEdit = (e) => {
        e.preventDefault()
        console.log("editing")
        const username = e.target.u.value
        const email = e.target.e.value
        
        let formData = {
            id: props.currentUser['id'],
            username: username,
            email: email
        }
        const body = JSON.stringify(formData);
        fetch(`http://127.0.0.1:5000/update${props.currentUser['id']}`, {
            method: 'PUT',
            body: body,
        }).then(res => res.json())
            .then(data => {
                if(data['error']) {
                   setError(true);
                } else {
                    props.setCurrentUser(data[1]);
                    localStorage.setItem('user', JSON.stringify(props.currentUser));
                    navigate(`/myAccount:${props.currentUser['id']}`)
                }

            }).catch(err => {console.log(err)})
        }
    return (
        <div className="container w-25">
            <form onSubmit={handleEdit}>
                <h6 className='text-center flashMessage'>Edit User {props.u}</h6>
                {error ? <h5 className="errorMessage">Your username or email is already in use,  Please try a different phrase.</h5> : null}
                <div className='form-group'>
                    <fieldset>
                        <label htmlFor='u'>Username</label>
                        <input type='text' className='form-control' name='u' defaultValue={props.u}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor='e'>Email</label>
                        <input type='text' className='form-control' name='e' defaultValue={props.e}/>
                    </fieldset>
                    <input type='submit' className='btn btn-dark' value='Update User'/>
                </div>
            </form>
        </div>
    )
}

export default EachAccount;