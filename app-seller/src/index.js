import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import  {store}  from './redux/helpers/store';
import {App} from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {history} from './redux/helpers/history';

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  
), document.getElementById('root'));

serviceWorker.unregister();
