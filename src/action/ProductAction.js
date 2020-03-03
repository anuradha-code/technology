import * as ActionType from "./ActionType";
import ProductApi from "../api/ProductApi";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getProductsResponse = products => ({
  type: ActionType.GET_PRODUCTS_RESPONSE,
  products
});

export function getProductsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return ProductApi.getAllProducts()
      .then(products => {
        console.log(products, "----products1");
        dispatch(getProductsResponse(products));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewProductResponse = () => ({
  type: ActionType.ADD_NEW_PRODUCT_RESPONSE
});

export const updateExistingProductResponse = () => ({
  type: ActionType.UPDATE_EXISTING_PRODUCT_RESPONSE
});

export function saveProductAction(productBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());

    return ProductApi.saveProduct(productBeingAddedOrEdited)
      .then(() => {
        if (productBeingAddedOrEdited.id) {
          dispatch(updateExistingProductResponse());
        } else {
          dispatch(addNewProductResponse());
        }
      })
      .then(() => {
        dispatch(getProductsAction());
      })
      .catch(error => {
        dispatch(ApiCallErrorAction());
        throw error;
      });
  };
}

export const getProductResponse = productFound => ({
  type: ActionType.GET_PRODUCT_RESPONSE,
  product: productFound
});

export function getProductAction(productId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return ProductApi.getProduct(productId)
      .then(product => {
        dispatch(getProductResponse(product));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteProductResponse = () => ({
  type: ActionType.DELETE_PRODUCT_RESPONSE
});

export function deleteProductAction(productId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return ProductApi.deleteProduct(productId)
      .then(() => {
        dispatch(deleteProductResponse());
      })
      .then(() => {
        dispatch(getProductsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
