import React, { PropTypes } from "react";

const FieldTextArea = ({
  input,
  name,
  label,
  placeholder,
  meta: { touched, error, warning }
}) => {
  console.log(input, "input---");
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <div className="field">
        <textarea
          {...input}
          rows="4"
          cols="50"
          name={name}
          className="form-control"
          placeholder={placeholder}
        />

        {touched &&
          ((error && <p className="text-danger">{error}</p>) ||
            (warning && <p className="text-danger">{warning}</p>))}
      </div>
    </div>
  );
};

FieldTextArea.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired
};

export default FieldTextArea;
