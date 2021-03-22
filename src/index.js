import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from "react-router-dom";

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import RootReducer from "./redux/RootReducer";
import reduxThunk from 'redux-thunk'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const loggerMiddleware = store => next => action => {
    const result = next(action)
    return result
}

const store = createStore(RootReducer, composeEnhancers(applyMiddleware(loggerMiddleware, reduxThunk)))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
