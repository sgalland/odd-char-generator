import PropTypes from 'prop-types';

export const TextBox = ({ label, style, value = '', onChange }) => {

    const changeHandler = () => { }
    const handleOnChange = onChange || changeHandler;

    return (
        <div>
            <label style={{ fontWeight: 'bold' }}>{label}:</label>&nbsp;
            <input style={{ ...style }} type='text' value={value} onChange={handleOnChange} />
        </div>);
}

TextBox.propTypes = {
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func
}