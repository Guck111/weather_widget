import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App root={root}/>
    </Provider>, root);

registerServiceWorker();

/**
 * следит за изменением state в store
 */
// store.subscribe(() => {
//     console.log('subscribe', store.getState());
// });

/**
 * событие изменения state в store
 */
// store.dispatch({type: 'SHOW_USERS'});
