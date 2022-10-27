import PropTypes from 'prop-types';

export const NumericTextBox = ({ label, style, value = 0, onChange }) => {
    return (
        <div>
            <label style={{ fontWeight: 'bold' }}>{label}:</label>&nbsp;
            <input style={{ ...style }} type='number' value={value} onChange={onChange} />
        </div>);
}

NumericTextBox.propTypes = {
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    value: PropTypes.number,
    onChange: PropTypes.func
}