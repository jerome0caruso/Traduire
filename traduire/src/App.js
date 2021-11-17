import { useState, useEffect } from 'react';
import './App.css';
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


const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [toBeTranslated, setToBeTranslated] = useState('');
  const [cardNote, setCardNote] = useState('This is for card notes');
  const getLoggedIn = localStorage.getItem('isLoggedIn');
  const [loggedIn, setLoggedIn] = useState(JSON.parse(getLoggedIn));
  const getUserIn = localStorage.getItem('user');
  const [currentUser, setCurrentUser] = useState(JSON.parse(getUserIn));
  const [language1, setLanguage1] = useState('');
  const [language2, setLanguage2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
 

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  },[currentUser])

  const getLocalStorage = () => {
    localStorage.setItem('isLoggedIn', String(true));
    const getUser = localStorage.getItem('user');
    setCurrentUser(JSON.parse(getUser));
  }
  const isLoadingHandler = () => {
    //make sure to only load on word/phrase search not before
    if(toBeTranslated !== '') {
      setIsLoading(true);
    }
  }

  const handleSubmit = async(e) => {
    console.log(language1, language2)
    e.preventDefault();
    if(toBeTranslated !== '') {
      //get translation
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
        modelId: `${language1}-${language2}`,
      };
      await languageTranslator.translate(translateParams)
        .then(translationResult => {
          const translation = translationResult.result.translations[0].translation;
          cleanInput(translation);
          setIsLoading(false);
        })
        .catch(err => {
          if(language1 && language2) {
            setHasError(true);
          }
          
          console.log('error:', err); //This is to handle models not found!!!!
        });
    }
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
    if (cleanedTranslation.toLowerCase() == toBeTranslated){
      setHasError(true);
    } else {
      setHasError(false);
    }
    setToBeTranslated(cleanedTranslation);
  }

  //writes the word to the database
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
          cardNote: cardNote,
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
    //clears the input fields
    const clearFields = (e) => {   
      e.preventDefault();
      const mainInput = document.getElementById('mainInput');
      mainInput.value = '';
      setToBeTranslated("");
      setHasError(false);
    }
  
  return (
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
            <Route path='/' exact={true} element={<Home />} />
            <Route default path='/home' element={<Home />}/>
            <Route className="appContainer" path='/:id' element={ 
                <MainPage
                  toBeTranslated={toBeTranslated}
                  setToBeTranslated={setToBeTranslated}
                  handleSubmit={handleSubmit}
                  clearFields={clearFields}
                  flashCardsTranslation={flashCardsTranslation}
                  setLanguage1={setLanguage1}
                  setLanguage2={setLanguage2}
                  isLoading={isLoading}
                  isLoadingHandler={isLoadingHandler}
                  hasError={hasError}
                />
              }>
            </Route >
          <Route path='/login' element={
              <Login loggedIn={loggedIn} 
                getLocalStorage={getLocalStorage} 
                setLoggedIn={setLoggedIn} 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
              />
            }>
          </Route>
          <Route path='/loggedout' element={ <LoggedOut/> }></Route>
          <Route path='/myAccount:id' element={ <MyAccount currentUser={currentUser} setCurrentUser={setCurrentUser}/> }></Route>
          <Route path='/myCards:id' element={ 
            <MyCards flashCards={flashCards}  
              currentUser={currentUser}  
              setFlashCards={setFlashCards} 
              toBeTranslated={toBeTranslated}
              cardNote={cardNote}
              setCardNote={setCardNote}
            />} />
          <Route path='/register' element={ <Register />} />
          <Route path='/eachAccount' element={ <EachAccount currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
