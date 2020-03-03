import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as productAction from "../../action/ProductAction";
import ProductForm from "./ProductForm"; // eslint-disable-line import/no-named-as-default

export class AddOrEditProductContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.action
      .getProductAction(this.props.match.params.id)
      .catch(error => {
        toastr.error(error);
      });
  }

  handleSave(values) {
    const product = {
      id: values.id,
      product_name: values.product_name,
      product_description: values.product_description,
      is_active: values.is_active || false,
      price: values.price,
      offer_price: values.offer_price,
      offer_start_at: values.offer_start_at,
      offer_end_at: values.offer_end_at,
      offer_priccreated_ate: values.created_at,
      updated_at: values.updated_at
    };

    this.props.action
      .saveProductAction(product)
      .then(() => {
        toastr.success("Product saved");
        this.props.history.push("/");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/");
  }

  render() {
    const { initialValues } = this.props;
    console.log(initialValues, "initialValues");
    const heading = initialValues && initialValues.id ? "Edit" : "Add";

    return (
      <div className="container">
        <ProductForm
          heading={heading}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          initialValues={this.props.initialValues}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const productId = ownProps.match.params.id; //from the path '/product/:id'

  if (
    productId &&
    state.selectedProductReducer.product &&
    productId === state.selectedProductReducer.product.id
  ) {
    return {
      initialValues: state.selectedProductReducer.product
    };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...productAction }, dispatch)
});

AddOrEditProductContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditProductContainer);
