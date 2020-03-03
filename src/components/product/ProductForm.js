import React, { PropTypes } from "react";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import FieldTextArea from "../common/FieldTextArea";

import "react-widgets/dist/css/react-widgets.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
//Moment().format("MMMM Do YYYY, h:mm:ss a");
Moment.locale("en");
momentLocalizer();

const renderDateTimePicker = ({
  input: { onChange, value },
  label,
  showTime
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>

    <div className="field">
      <DateTimePicker
        onChange={onChange}
        format="DD-MM-YYYY, h:mm:ss a"
        time={showTime}
        value={!value ? null : new Date(value)}
        placeholder="date and time"
      />
    </div>
  </div>
);

export const ProductForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  handleSave,
  handleCancel
}) => {
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <h1>{heading}</h1>

      <Field
        type="text"
        name="product_name"
        label="Product Name"
        component={FieldInput}
      />

      <Field
        name="product_description"
        label="Product Description"
        component={FieldTextArea}
      />

      <Field
        type="checkbox"
        name="is_active"
        label="Is Active"
        component={FieldInput}
        className="text-center"
      />

      <Field type="text" name="price" label="Price" component={FieldInput} />

      <Field
        type="text"
        name="offer_price"
        label="Offer Price"
        component={FieldInput}
      />

      <Field
        type="text"
        name="offer_start_at"
        label="Offer Start At"
        showTime={true}
        component={renderDateTimePicker}
      />

      <Field
        name="offer_end_at"
        label="Offer End At"
        showTime={true}
        component={renderDateTimePicker}
      />

      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          <i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit
        </button>

        {heading === "Add" && (
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            className="btn btn-default btn-space"
          >
            Clear Values
          </button>
        )}

        <button
          type="button"
          className="btn btn-default btn-space"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};
  if (!values.product_name) {
    errors.product_name = "Required";
  }

  if (!values.product_description) {
    errors.product_description = "Required";
  }

  if (!values.offer_price) {
    errors.offer_price = "Required";
  }

  if (!values.price) {
    errors.price = "Required";
  }

  if (values.offer_price && isNaN(Number(values.offer_price))) {
    errors.offer_price = "Must be a number";
  }

  if (values.price && isNaN(Number(values.price))) {
    errors.price = "Must be a number";
  }

  return errors;
};

ProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "ProductForm",
  validate
})(ProductForm);
