import React from 'react';
import ReactDOM from 'react-dom';
import Region from './components/Region';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { getTag } from './actions';


const store = createStore(rootReducer);
console.log('data',store.getState());

store.subscribe(() => console.log('store',store.getState()));

ReactDOM.render(

    <Provider store={store}>
        <Region />
    </Provider>


    , document.getElementById('root'));