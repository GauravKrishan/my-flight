import React from 'react';
import FlightDescription from './flightDescription';

//Flight details component.
export default class AllFlightDetails extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        let {flights} = this.props;
        
        var allFlightDetails = flights.map((flight,key)=>{
             return <FlightDescription key={key} flight={flight}/>
        });
        return (
            <div className='all-flight-details'>
                {allFlightDetails}
            </div>
        )

    }
}