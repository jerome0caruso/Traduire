import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../App.css';

const MainInput = ({toBeTranslated, setToBeTranslated, handleSubmit, handleClear, handleflashCards}) => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col>
                    <Form onSubmit={handleSubmit}>
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
                            <Col>
                                <Button type="Submit" variant="primary">Search</Button>
                                <Button  onClick={handleflashCards} variant="primary">Save</Button>
                                <Button type="Submit" onClick={handleClear} variant="primary">Clear</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
        )
}

export default MainInput;