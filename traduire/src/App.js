import { useState } from 'react';
import './App.css';
import MainInput from './componets/Input';
import MainOutput from './componets/Output';
import NavBar from './componets/NavBar';
import MainPage from './views/MainPage';
import Login from './views/Login';
import MyAccount from './views/MyAccount';
import Register from './views/Register';
import Home from './views/Home'
import MyCards from './views/MyCards';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LoggedOut from './views/loggedOut';
import EachAccount from './views/EachAccount';
import LanguageSelectors from './componets/LanguageSelectors'
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [toBeTranslated, setToBeTranslated] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [language, setLanguage] = useState('');
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    const languageTranslator = new LanguageTranslatorV3({
      version: '2018-05-01',
      authenticator: new IamAuthenticator({
        apikey: 'GcbUMxxRnA2TPAz8HICyogh0nEUsWSV9zAXSdTUNbkO_'
        // apikey: '_JUAqXHLMJ6XLeZJFiDxPtf1gT_3XZk7yKYu03gbV2cm'
      }),
      serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/efe12cd6-da34-44e7-9ea5-15f947aec94d',
    });
    const translateParams = {
      text: `${toBeTranslated.toLowerCase()}?`,
      modelId: 'en-fr',
    };

     await languageTranslator.translate(translateParams)
      .then(translationResult => {
        const translation = translationResult.result.translations[0].translation;
        cleanInput(translation);
      })
      .catch(err => {
        console.log('error:', err);
      });
}  
  const cleanInput = (translation) => {
    let cleanedTranslation;
    if(translation.includes('¿') && translation.includes('?')) {
      cleanedTranslation = translation.slice(1, translation.length -1);
    } else if(translation.includes('?')) {
      cleanedTranslation = translation.slice(0, translation.length -1);
    } else if(translation.includes('¿')) {
      cleanedTranslation = translation.slice(1);
    } else {
      cleanedTranslation = translation;
    }
    setToBeTranslated(cleanedTranslation);
  }

  const flashCardsTranslation = () => {
    const mainInput = document.getElementById('mainInput');
    const cardId = Math.random(0, 10000000)
    setFlashCards([[toBeTranslated, mainInput.value], ...flashCards]);
  
    let myHeaders =  new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let data = JSON.stringify({
        cards: {
          userId: currentUser.id,
          translated: toBeTranslated,
          starterWord: mainInput.value,
          cardId: cardId
        }
    })
    fetch('http://127.0.0.1:5000/cards', {
        method: 'POST',
        headers: myHeaders,
        body: data
    }).then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err))
    }

    const clearFields = (e) => {   
      e.preventDefault();
      const mainInput = document.getElementById('mainInput');
      mainInput.value = '';
      setToBeTranslated("");
    }
  
  return (
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
            <Route path='/' exact={true} element={<Home />} />
            <Route default path='/home' element={<Home />}/>
            <Route className="appContainer" path='/:id' element={
              <div className="appContainer text-center">
                <h1 className="mainHeading">Traduire</h1>
                <div className="input-container ">
                  <div className="eachInputContainer">
                    <LanguageSelectors />
                    <MainInput
                      toBeTranslated={toBeTranslated}
                      setToBeTranslated={setToBeTranslated}
                      handleSubmit={handleSubmit}
                      handleClear={clearFields}
                      handleflashCards={flashCardsTranslation} />
                  </div>
                  <div className="eachInputContainer">
                    <LanguageSelectors />
                    <MainOutput toBeTranslated={toBeTranslated} setToBeTranslated={setToBeTranslated} handleClear={clearFields} />
                  </div>
                </div>
              </div>

            }></Route >
          <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}></Route>
          <Route path='/loggedout' element={ <LoggedOut/> }></Route>
          <Route path='/myAccount:id' element={ <MyAccount currentUser={currentUser} setCurrentUser={setCurrentUser}/> }></Route>
          <Route path='/myCards:id' element={ <MyCards flashCards={flashCards}  currentUser={currentUser}  setFlashCards={setFlashCards} toBeTranslated={toBeTranslated} />} />
          <Route path='/register' element={ <Register />} />
          <Route path='/eachAccount' element={ <EachAccount currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
