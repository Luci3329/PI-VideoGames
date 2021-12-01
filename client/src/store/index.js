import { createStore, applyMiddleware } from 'redux';
// applyMiddleware -> me permite hacer llamados a apis externas / servidor con Redux a través de ACCIONES
//import { composeWithDevtools } from 'redux-devtools-extension';
// extención para poder ver todo en el browser
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';


export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk));

