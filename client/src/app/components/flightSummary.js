import React from 'react';
import moment from 'moment';

//Flight summary Component.
export default function FlightsSummary(props) {
    let {flights,flightSummary} = props;
    return (
        <div className='flight-summary'>
                 <span className='route-details'>{flightSummary.origin}&nbsp;<image/>&nbsp;{flightSummary.destination}&nbsp;{flightSummary.returnDate!=null&&<span>&nbsp;<image/>&nbsp;{flightSummary.origin}</span>}</span>
                 <span className='side-text'>
                           
                         <span><b>Depart :</b> {moment(flightSummary.departDate).format('DD-MMM-YYYY')}</span>
                         {flightSummary.arrivalDate}
                         {flightSummary.returnDate&&<span><b>Return :</b> {moment(flightSummary.returnDate).format('DD-MMM-YYYY')}</span>}
                 </span>
        </div>
    )
}