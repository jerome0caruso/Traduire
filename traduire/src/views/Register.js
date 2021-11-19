import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../index.css';

const Register = () => {
    const [hasError, setHasError] = useState(false);
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');
    const [pass2Error, setPass2Error] = useState('');
    const [emailError, setEmailError] = useState('');
    const [serverError, setServerError] = useState(false);

    const navigate = useNavigate();
    const filterUser = (username, pw1, pw2, email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(username.length < 3 || username.length > 15) {
            setHasError(true);
            setUserError('Username is not vaild!');
        }
        if (pw1 !== pw2) {
            setHasError(true);
            setPassError('Passowords did not match!');
        }
        if (pw1.length < 3) {
            setHasError(true);
            setPass2Error('Passoword not valid!');
        }

        if(re.test(String(email).toLowerCase()) === false){
            setHasError(true);
            setEmailError('Email is not not valid!');
        }

    }
    const handleChange = () => {
        setHasError(false);
    }

    const handleSubmit = (e) => {
        console.log("trying to submit", hasError)
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPass = e.target.confirmPass.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        filterUser(username, password, confirmPass, email);
        if (hasError === false) {
            console.log('Form Submitted!');
            let myHeaders =  new Headers();
            myHeaders.append('Content-Type', 'application/json');
            let data = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
            fetch('http://127.0.0.1:5000/signup', {
                method: 'POST',
                headers: myHeaders,
                body: data
            }).then(res => res.json())
              .then(data => {
                if(data['error']) {
                    setHasError(true)
                    setServerError(data['error'])
                } else {
                    navigate('/login');
                }
              })
              .catch(err => console.log(err))
        }
    }
    return (
        <div className="registerContainer container">
            <div className="formContainer">
                <form className="form" onSubmit={handleSubmit} >
                    <h3 className='text-center'>Register Here</h3>
                    <h4 className="errorMessage"> {serverError}</h4>
                    <div className='form-group'>
                        <fieldset>
                        <h4 className="errorMessage"> {userError}</h4>
                            <label htmlFor='username'>Username</label>
                            <input onChange={handleChange} type='text' name='username' className='form-control' placeholder='Username' />
                        </fieldset>
                        <fieldset>
                        <h4 className="errorMessage"> {emailError}</h4>
                            <label htmlFor='email'>Email</label>
                            <input type='text' onChange={handleChange} name='email' className='form-control' placeholder='Email' />
                        </fieldset>
                        <fieldset>
                        <h4 className="errorMessage"> {pass2Error}</h4>
                            <label htmlFor='password'>Password</label>
                            <input type='password' onChange={handleChange}  name='password' className='form-control' placeholder='Password' />
                        </fieldset>
                        <fieldset>
                        <h4 className="errorMessage"> {passError}</h4>
                            <label htmlFor='confirmPass'>Confirm Password</label>
                            <input type='password' name='confirmPass' onChange={handleChange}  className='form-control' placeholder='Confirm Password' />
                        </fieldset>
                        <input type='submit' className='btn btnls btn-secondary' />
                    </div>
                </form>
            </div>
            <div className="formCriContainer">
                <ul>
                    <li><p>Username must be at least 3 characters</p></li>
                    <li>Username must be less than 15 characters</li>
                    <li>Password must be at least 3 characters</li>
                    <li>only email.example.com formats are considered valid</li>
                </ul>
            </div>
        </div>
    )

}

export default Register;