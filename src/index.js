import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

console.log('store', store.getState());

/**
 * следит за изменением state в store
 */
store.subscribe(() => {
    console.log('subscribe', store.getState());
});

/**
 * событие изменения state в store
 */
// store.dispatch({type: 'SHOW_USERS'});
