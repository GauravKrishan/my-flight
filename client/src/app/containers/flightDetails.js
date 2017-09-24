import React from 'react';
import {connect} from 'react-redux';
import FlightSummary from '../components/flightSummary';
import AllFlightsDetails from '../components/allFlightsDetails';

//Flight details container connected with store.
export  class FlightDetails extends React.Component{

    constructor(props){
        super(props)
    }
    render(){
        var {flights,flightSummary} = this.props;
        return (     
                flights.length!=0&&<div className='right'><FlightSummary flights={flights} flightSummary={flightSummary}/>
                <AllFlightsDetails flights={flights} /></div>
                
        )
    }
} 

//Connection with store.
export default connect(state=>{
    return {
        flights:state.app.flights,flightSummary:state.app.flightSummary
    }
},null)(FlightDetails)