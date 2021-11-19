import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './LogOut';
import { useState, useEffect } from 'react';
import '../App.css';
const NavBar = (props) => {

  console.log(props)
    return (
      props.loggedIn ? (
        <nav className="navbar navbar-expand-lg navBar text-white">
          <div className="container-fluid">
            <Link style={{listStyleType: 'none'}} className="navbar-brand" to={`/myAccount`}>Traduire</Link>
            <button className="navbar-toggler navBarIcon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon navBarIcon"><i className="fa fa-bars"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#">Game</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Links</a>
                </li>
              </ul>
              <form className="d-flex dropdown">
                <li className="nav-item dropdown" style={{ listStyleType: 'none'}}>
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to={`/myAccount${props.currentUser.id}`}>My Account</Link></li>
                    <li><Link className="dropdown-item" to={`/myCards${props.currentUser.id}`}>My Flash Cards</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li className="logoutButton"><Link to="/home"><Logout loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/></Link></li>
                  </ul>
                </li>
              </form>
            </div>
          </div>
        </nav>
        ) 
        : 
      (
        <nav className="navbar navbar-expand-lg navBar">
        <div className="container-fluid">
          <Link style={{listStyleType: 'none'}} className="navbar-brand" to="/">Traduire</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon navBarIcon"><i class="fa fa-bars"></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">LogIn</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      )
      
    );
}

export default NavBar;









// {
//     "apikey": "_JUAqXHLMJ6XLeZJFiDxPtf1gT_3XZk7yKYu03gbV2cm",
//     "iam_apikey_description": "Auto-generated for key 2efef6e3-0194-4e08-915d-83ec404fcb59",
//     "iam_apikey_name": "Auto-generated service credentials",
//     "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
//     "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/18dcda956a5148659730b6d44953855b::serviceid:ServiceId-6d8d2215-46e4-4455-9e0b-16cdb5f25564",
//     "url": "https://api.us-south.language-translator.watson.cloud.ibm.com/instances/efe12cd6-da34-44e7-9ea5-15f947aec94d"
//   }



// import json
// from ibm_watson import LanguageTranslatorV3
// from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

// authenticator = IAMAuthenticator('_JUAqXHLMJ6XLeZJFiDxPtf1gT_3XZk7yKYu03gbV2cm')
// language_translator = LanguageTranslatorV3(
//     version='2018-05-01',
//     authenticator=authenticator
// )

// language_translator.set_service_url('https://api.us-south.language-translator.watson.cloud.ibm.com/instances/efe12cd6-da34-44e7-9ea5-15f947aec94d')

// translation = language_translator.translate(
//     text='Hello?',
//     model_id='en-es').get_result()
// // print(json.dumps(translation, indent=2, ensure_ascii=False))