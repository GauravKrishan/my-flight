import React from 'react';
import moment from 'moment'
import {currencyFormatter,getTime} from '../utilities';

//page level styles.
const styles = {
    flightsDesc: {
        color:'#e8641b'
    }
}

//Flight description Component.
export default function FlightDescription(props)  {
        let {flight} = props;
        return (
            <div className='flight-description'>
                <div className='details'>
                    <div className='price'>{currencyFormatter(flight.price)}</div>
                    <div className='depart-arrival'>
                        <div className='depart'>
                            <div style={styles.flightsDesc}>{flight.flight_code}</div>          
                            <div style={styles.flightsDesc}>{flight.depart.iata} <span className='img'></span> {flight.arrival.iata}</div>
                            <div>Depart : {moment(flight.depart.date).format('hh:mm a')} <span>{moment(flight.depart.date).format('ddd Do MMM YYYY')}</span></div>
                            <div>Arrival: {moment(flight.arrival.date).format('hh:mm a')} <span>{moment(flight.arrival.date).format('ddd Do MMM YYYY')}</span></div>
                        </div>

                        {flight.return&&<div className='arrival'>
                            <div style={styles.flightsDesc} > {flight.flight_code}</div>
                            <div style={styles.flightsDesc} > {flight.return.depart.iata} <span className='img'></span> {flight.return.arrival.iata}</div>
                            <div>Depart : {moment(flight.return.depart.date).format('hh:mm a')} <span>{moment(flight.return.depart.date).format('ddd Do MMM YYYY')}</span></div>
                            <div>Arrival: {moment(flight.return.arrival.date).format('hh:mm a')} <span>{moment(flight.return.arrival.date).format('ddd Do MMM YYYY')}</span></div>
                        </div>}
                    </div>
                </div>
                <div className='flight-image' onClick={(eve)=>selectFlight(eve)}>
                        <div className='flight-icon'></div>
                        <div className='select-flight'>SELECT THIS FLIGHT</div>
                </div>
            </div>
        )
        function selectFlight(eve){
            let ele = eve.currentTarget;
            let parent = eve.currentTarget.parentElement.parentElement;
            //Remove all active classes.
            for(var i=0;i < parent.childNodes.length; i++){
                let current = parent.childNodes[i].querySelector('.flight-image');
				    current.className = current.className.replace(' active','');
            }
            //attach active to current selection.
            ele.className += ' active';
        }
}

