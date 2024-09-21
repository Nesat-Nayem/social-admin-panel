import PropTypes from 'prop-types';

InputGroup4.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  decoration: PropTypes.node,
  inputClassName: PropTypes.string,
  decorationClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default function InputGroup4({
  label,
  name,
  value,
  onChange,
  type = 'text',
  decoration,
  inputClassName = '',
  decorationClassName = '',
  disabled,
}) {
  return (
    <div style={styles.inputGroupContainer}>
      <div style={{ ...styles.inputAddon, ...(disabled && styles.disabled) }}>
        {/* Add your icon here */}

        <div style={styles.inputContainer}>
          <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            style={styles.input}
            placeholder={label}
            aria-label={label}
            className={`peer block w-full p-3 text-gray-600 bg-gray-100 border border-l-0 focus:border-red-400 focus:bg-white focus:outline-none focus:ring-0 appearance-none rounded-tl-none rounded-bl-none rounded transition-colors duration-300 ${
              disabled ? 'bg-gray-200' : ''
            } ${inputClassName}`}
            disabled={disabled}
          />
          <div
            className={`flex items-center rounded-tr-none rounded-br-none rounded pl-3 py-3 text-gray-600 bg-gray-100 border border-r-0 peer-focus:border-red-400 peer-focus:bg-white transition-colors duration-300 ${
              disabled ? 'bg-gray-200' : ''
            } ${decorationClassName}`}
          >
            {decoration}
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  inputGroupContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    // float: 'inline-start',
  },
  inputAddon: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#4a5568',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRight: 0,
    transition: 'border-color 0.3s, background-color 0.3s',
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#4a5568',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderLeft: 0,
    outline: 'none',
    transition: 'border-color 0.3s, background-color 0.3s',
  },
  disabled: {
    backgroundColor: '#edf2f7',
  },
};
