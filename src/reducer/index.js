import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import productsReducer from "./productsReducer";
import selectedProductReducer from "./selectedProductReducer";

export default combineReducers({
  productsReducer,
  selectedProductReducer,
  form: formReducer
});
