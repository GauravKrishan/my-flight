import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

//Configure the store for the application.
function configureStore(){
    const middlewares = [
        thunk
    ];

    return createStore(rootReducer,applyMiddleware(thunk));
}

export default configureStore;