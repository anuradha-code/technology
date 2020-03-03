import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';



const productsReducer = (state = initialState.productsReducer, action) => {
    switch(action.type) {
        case ActionType.GET_PRODUCTS_RESPONSE: {
            // '...' spread operator clones the state
            // lodash Object assign simply clones action.products into a new array.
            // The return object is a copy of state and overwrites the state.products with a fresh clone of action.products
            return {
                ...state, 
                products: _.assign(action.products)
            };
        }


        default: { return state; }
    }
};



export default productsReducer;