import { Form } from 'react-bootstrap';

const LanguageSelectors = (props) => {
    
    return (
        <div>
            <Form.Select aria-label="Default select example">
                <option>Languages</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
            </Form.Select>
        </div>
    )
}

export default LanguageSelectors;