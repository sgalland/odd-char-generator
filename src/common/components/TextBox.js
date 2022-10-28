import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const TextBox = ({ id, label, value = '', onChange }) => {

    const changeHandler = () => { }
    const handleOnChange = onChange || changeHandler;

    return (
        <Form.Group className='mb-3' controlId={`component-${id}`}>
            <Form.Label htmlFor={id}>{label}:</Form.Label>
            <Form.Control id={id} type='text' value={value} onChange={handleOnChange} />
        </Form.Group>);

    // return (
    //     <Row>
    //         <Col sm={1}>
    //             <Form.Label htmlFor={id}>{label}:</Form.Label>&nbsp;</Col>
    //         <Col>
    //             <Form.Control id={id} type='text' value={value} onChange={handleOnChange} />
    //         </Col>
    //     </Row>);
}

TextBox.propTypes = {
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func
}