import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const NumericTextBox = ({ id, label, value = 0, onChange }) => {
    return (
        <Form.Group className='mb-3' controlId={`component-${id}`}>
            <Form.Label htmlFor={id}>{label}:</Form.Label>&nbsp;
            <Form.Control id={id} type='number' value={value} onChange={onChange} />
        </Form.Group>);
    // return (
    //     <Row>
    //         <Col md={1}>
    //             <Form.Label htmlFor={id}>{label}:</Form.Label>&nbsp;
    //         </Col>
    //         <Col>
    //             <Form.Control id={id} type='number' value={value} onChange={onChange} />
    //         </Col>
    //     </Row >);
}

NumericTextBox.propTypes = {
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    value: PropTypes.number,
    onChange: PropTypes.func
}