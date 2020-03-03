import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as productAction from '../../action/ProductAction';
import ProductList from './ProductList';
import '../../style/style.css';



export class ProductListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedProductId: [], selected: []};

        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleEditProduct = this.handleEditProduct.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }


    componentDidMount() {
        this.props.action.getProductsAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleAddProduct() {
        this.props.history.push('/Create');
    }

    arrayRemove(arr, value) {

        return arr.filter(function(ele){
            return ele != value;
        });
     
     }
     



    handleEditProduct() {
        const selectedProductId = this.state.selectedProductId;

        if (selectedProductId) {
            this.setState({selectedProductId: undefined});            
            this.props.history.push(`/${selectedProductId}`);
        }        
    }



    handleDelete() {
        const selectedProductId = this.state.selectedProductId;

        if (selectedProductId) {
            this.setState({selectedProductId: undefined});                        
            this.props.action.deleteProductAction(selectedProductId)
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

     onAfterDeleteRow(rowKeys) {
        if (rowKeys) {
            this.props.action.deleteProductAction(rowKeys)
                .catch(error => {
                    toastr.error(error);
                });
        }
      }
      



    // handleRowSelect(row, isSelected) {
    //     if (isSelected) {
    //         this.setState({selectedProductId: row.id});
    //     }
    // }

    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({
                selectedProductId: [ ...this.state.selectedProductId, row.id ].sort(),
            //   selectedProductId: row.id
            });
          }else{
            this.setState({
                selectedProductId: this.arrayRemove(this.state.selectedProductId,row.id)
              });
          }
    }

    render() {
        const { products } = this.props;

        if (!products) {
            return (
                <div>Loading...</div>
            );
        }

        let disableProp = this.state.selectedProductId.length != 1 ? true : false;

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Products</h1>                        
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col tablebtn">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddProduct}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> New
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditProduct} 
                                disabled={disableProp}
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>                                

                            
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ProductList products={products} handleRowSelect={this.handleRowSelect} onAfterDeleteRow={this.onAfterDeleteRow}/>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    products: state.productsReducer.products
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(productAction, dispatch)

});



ProductListContainer.propTypes = {
    products: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
