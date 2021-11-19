import React, { useState } from 'react'
import { Navigate  } from 'react-router-dom';

const Login = (props) => {
    const [isValid, setIsValid] = useState(true)
    
    const logIn = async(e) => {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        let encodedString = btoa(`${username}:${password}`)
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${encodedString}`)
    
         await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: myHeaders,
        }).then(res =>res.json())
          .then(data => {
              console.log(data)
            if(data === "Invalid" || data === false) {
                props.setLoggedIn(false)
                setIsValid(false)
            } else {
                props.setCurrentUser(data[1])
                props.setLoggedIn(true)
                setIsValid(true)
                props.getLocalStorage()
            }

         }).catch(err => console.log(err))
    }
    console.log(props.loggedIn)
    return (
        props.loggedIn ? <Navigate to={`/${props.currentUser.id}`} /> : isValid ? 
        <div className="container my-5 loginContainer">
        <form className="form" defaultValue="form" onSubmit={logIn}>
            <h3 className='text-center'>Login Here</h3>
            <div className='form-group'>
                <fieldset>
                    <label htmlFor='username'>Username</label>
                    <input type='text' className='form-control' name='username' defaultValue="Username" />
                </fieldset>
                <fieldset>
                    <label htmlFor='password'>Password</label>
                    <input type='password' className='form-control' name='password' defaultValue="Password" />
                </fieldset>
                <input type='submit' className='btn btn-primary' defaultValue="Login" />
            </div>
        </form>
        </div> :
            <div className="container loginContainer my-5">
            <form className="form" defaultValue="form" onSubmit={logIn}>
                
                <h3 className='text-center'>Login Here</h3>
                <h5 className="errorMessage">Your username or password is incorrect.  Please try again.</h5>
                <div className='form-group'>
                    <fieldset>
                        <label htmlFor='username'>Username</label>
                        <input type='text' className='form-control' name='username' defaultValue="Username" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor='password'>Password</label>
                        <input type='password' className='form-control' name='password' defaultValue="Password" />
                    </fieldset>
                    <input type='submit' className='btn btnls btn-primary' defaultValue="Login" />
                </div>
            </form>
            </div>
        
    )
}
export default Login;