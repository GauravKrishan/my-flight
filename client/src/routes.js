import React from 'react';
import {Route,IndexRoute,Router,browserHistory} from 'react-router';
import AppComponent from './app/app';   

export default (  <Router history={browserHistory}>
                        <Route path='/'>
                            <IndexRoute component={AppComponent}/>
                        </Route>
                 </Router>
)