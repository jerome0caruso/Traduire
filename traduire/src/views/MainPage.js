import { useState } from 'react';
import '../App.css';
import MainInput from '../componets/Input';
import MainOutput from '../componets/Output';


const MainPage = (props) => {
    return (
        <div className="input-container appContainer">
            <div className="eachInputContainer">
                <MainInput
                toBeTranslated={props.toBeTranslated}
                setToBeTranslated={props.setToBeTranslated}
                handleSubmit={props.handleSubmit}
                handleClear={props.clearFields}
                handleflashCards={props.flashCardsTranslation} />
            </div>
            {/* <div className="eachInputContainer">
            <h1 className="mainHeading">Traduire</h1>
                <MainOutput toBeTranslated={props.toBeTranslated} setToBeTranslated={props.setToBeTranslated} handleClear={props.clearFields} />
            </div> */}
        </div>
        )
}

export default MainPage;