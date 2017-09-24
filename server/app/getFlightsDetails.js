var airports = require('./data/airports.js');
var dateFormatter = require('./utilities').dateFormatter;
var  _ = require('lodash');
var moment = require('moment');

//Constants
const maxFlightDuration = 15; //hours
const minFlightDuration = 3; //hours
const maxFlightsInADay = 10; //hours

//Get a random number between minimum and maximum
function getRangeBoundNumber({ min, max }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Generate the flight depart and arrival times based on date.
 function getFlightDepartAndArriveTimes(date) {
    const   departDate = moment(date);
    const   arrivalDate = moment(date);
    //Max hours for depart date
    var  maxHoursRange = 23 - departDate.hour();
    departDate.add(getRangeBoundNumber({min:1,max:maxHoursRange}),'hours');
    arrivalDate.add(departDate.hours()+getRangeBoundNumber({min:minFlightDuration,max:maxFlightDuration}),'hours');
    //Max Minutes for depart Date
    var  maxMinutesRange = 59 - departDate.minute();
    departDate.add(getRangeBoundNumber({min:1,max:maxMinutesRange}),'minutes');
    arrivalDate.add(getRangeBoundNumber({min:1,max:55}),'minutes');
    return {departureTime: departDate.toISOString(), arrivalTime: arrivalDate.toISOString()}
}

//Generate the flight data.
function generateFlightsData(input){
    if(input){
        
            let {originIATA,destinationIATA, departDate,returnDate,selectedMaxPrice} = input;
            let totalFlights = getRangeBoundNumber({min:1,max:maxFlightsInADay});
            let flightsData = generateRandomFlightsdData(departDate,originIATA,destinationIATA,totalFlights,selectedMaxPrice);
            if(returnDate!=null){
                var returnFlights = generateRandomFlightsdData(returnDate,destinationIATA,originIATA,totalFlights,selectedMaxPrice);
                //Merging the return flights with departure.
                if(flightsData.length){
                    returnFlights.forEach((flight,index)=>{
                       flightsData[index]['return'] = {depart: flight.depart,arrival:flight.arrival}
                    })
                } 
            }
            return flightsData;
    }
}

// Generate random flights.
function generateRandomFlightsdData(date,originIATA,destinationIATA,totalFlights,selectedMaxPrice){
        
        let flights = [];
        
        for(let i=1;i<=totalFlights;i++){
                let departure =   _.find(airports,{iata:originIATA});
                let arrival = _.find(airports,{iata:destinationIATA});
                let departCity = departure.city;
                let arrivalCity = arrival.city
                let {departureTime , arrivalTime} = getFlightDepartAndArriveTimes(date);

                let flight={
                    id:i,
                    type:"Economy",
                    price:getRangeBoundNumber({min:5000,max:selectedMaxPrice}),
                    flight_code: 'AI-'+getRangeBoundNumber({min:100,max:150}),
                    depart:{
                        city: departCity,
                        date: departureTime,
                        iata:originIATA
                    },
                    arrival:{
                        city:arrivalCity,
                        date:arrivalTime,
                        iata:destinationIATA
                    }
                } 

                flights.push(flight)
     }
     return flights;
}

module.exports= {
    generateFlightsData : generateFlightsData
}