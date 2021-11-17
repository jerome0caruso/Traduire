import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../App.css';
import LoadingOverlay from 'react-loading-overlay';

const MainOutput = ({toBeTranslated, setToBeTranslated, handleClear}) => {
    console.log(toBeTranslated)
    
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col>
                    <Form onSubmit={handleClear}>
                        <Row>
                            <Col>
                                <textarea
                                type="text"
                                id="mainOutput"
                                value={toBeTranslated}
                                placeholder="Word translated"
                                />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
        )
}

export default MainOutput;