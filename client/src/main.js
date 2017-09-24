import {Provider} from 'react-redux';
import {Router,browserHistory,Route,IndexRoute} from 'react-router';
import React from 'react';
import {render} from 'react-dom';
import configStore from './app/store/store';
import routes from './routes';

//config the app level store.
var store = configStore();

function Application(){
    return (
        <Provider store= {store}>
            {routes}
        </Provider>
        )
}

//Render the application.
render(<Application/>,document.getElementById('main'));