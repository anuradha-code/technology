import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const saveToLocalStorage = (state) => {
    try {
        console.log('saveToLocalStorage');
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      // die
      console.log(err);
    }
  };

const loadState = () => {
    try {
        console.log('loadState');
      const serializedState = localStorage.getItem('state');
  
      if (serializedState === null) {
        return undefined;
      }
  
      return JSON.parse(serializedState);
  
    } catch (err) {
      return undefined;
    }
  };

  const persistateState = loadState();
console.log(persistateState, 'persistateState')

const configureStore = () => {
    return createStore(
        rootReducer, 
        persistateState,
        composeWithDevTools(applyMiddleware(thunk))
    );
};




export default configureStore;