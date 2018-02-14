import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './fontello.css';
import './fonts/fontello.woff';

import App from './containers/App/App.js';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { ConnectedRouter, routerMiddleware} from 'react-router-redux'
import reducer from './reducers/reducer'

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(middleware));

ReactDOM.render((
    <Provider store = {store}>
        <ConnectedRouter history={history}>
            <Router>
                <Route path='/' render={ props => <App {...props}/> } />
            </Router>
        </ConnectedRouter>
    </Provider>
),document.getElementById('root'));

registerServiceWorker();
