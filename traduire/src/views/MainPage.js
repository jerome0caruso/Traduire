import '../App.css';
import MainInput from '../componets/Input';
import MainOutput from '../componets/Output';
import LanguageSelector1 from '../componets/LanguageSelector1';
import LanguageSelector2 from '../componets/LanguageSelector2';

import LoadingOverlay from 'react-loading-overlay';


const MainPage = ({toBeTranslated, setToBeTranslated, handleSubmit, clearFields, flashCardsTranslation, setLanguage1, setLanguage2, isLoading, isLoadingHandler, hasError   }) => {
  const handleLanguage1 = (e) => {
    setLanguage1(e.target.value);
    handleSubmit(e);
  }
  const handleLanguage2 = (e) => {
    setLanguage2(e.target.value);
    handleSubmit(e);
  }
    return (

        <div className="appContainer text-center">

        <h1 className="mainHeading">Traduire</h1>
        <div className="input-container ">
          <div className="eachInputContainer">
            <LanguageSelector1 handleLanguage1={handleLanguage1}/>
            <MainInput
              toBeTranslated={toBeTranslated}
              setToBeTranslated={setToBeTranslated}
              handleSubmit={handleSubmit}
              clearFields={clearFields}
              flashCardsTranslation={flashCardsTranslation}
              isLoadingHandler={isLoadingHandler}
              hasError={hasError}
               />
          </div>

          <div className="eachInputContainer">
            <LanguageSelector2 handleLanguage2={handleLanguage2}/>
            <LoadingOverlay active={isLoading} spinner text='Loading your content...'>
              <MainOutput toBeTranslated={toBeTranslated} setToBeTranslated={setToBeTranslated} clearFields={clearFields} />
            </LoadingOverlay>

          </div>
        </div>
      </div>
        )
}

export default MainPage;