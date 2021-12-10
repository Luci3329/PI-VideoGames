import { createStore, applyMiddleware, compose } from 'redux';
// applyMiddleware -> me permite hacer llamados a apis externas / servidor con Redux a través de ACCIONES
//import { composeWithDevtools } from 'redux-devtools-extension';
// extención para poder ver todo en el browser
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunk)));

