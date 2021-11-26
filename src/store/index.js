import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './cartReducer';

export const store = createStore(cartReducer, composeWithDevTools());
