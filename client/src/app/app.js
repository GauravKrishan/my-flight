import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import SearchFlightsComponent from './containers/searchFlight.js';
import FlightDetailsComponent from './containers/flightDetails.js';
import HeaderComponent from './components/common/header.component';

//include styles
import './styles/common.less';
import './styles/styles.less';

injectTapEventPlugin();

//App component.
export default class AppComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const containerStyle = {height: '100%', width: '100%'};
        return (
            <div style={containerStyle} className='app-container'>
                    <MuiThemeProvider muiTheme = {getMuiTheme(lightBaseTheme)}>
                        <div>
                            <HeaderComponent/>
                            <div className='main'>
                                <SearchFlightsComponent/>
                                <FlightDetailsComponent/>
                            </div>
                        </div>
                    </MuiThemeProvider>
            </div>
        )
    }
}