import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../App.css';

const MainInput = ({toBeTranslated, setToBeTranslated, handleSubmit, clearFields, flashCardsTranslation, isLoadingHandler, hasError }) => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col>
                    <Form>
                        <Row>
                            <Col>
                                <textarea
                                type="text"
                                id="mainInput"
                                onChange={(e) => setToBeTranslated(e.target.value)}
                                placeholder="Enter a word"
                                resize="false"
                                />
                            </Col>
                            <Col className="mainBtn">
                                <Button type="Submit" onClick={(e) => { isLoadingHandler(); handleSubmit(e)} } variant="primary">Search</Button>
                                <Button  onClick={flashCardsTranslation} variant="primary">Save</Button>
                                <Button type="Submit" onClick={clearFields} variant="primary">Clear</Button>
                                {hasError ? (<div className="errorBox">
                                    <p>I didn't find that, try using a different word/phrase or try using an article before the word/phrase.</p>
                                </div>): null }
                                
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
        )
}

export default MainInput;