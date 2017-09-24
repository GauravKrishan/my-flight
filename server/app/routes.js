var router = require('express').Router();
var records = require('./data/airports');
var generateFlightsData = require('./getFlightsDetails').generateFlightsData;
var dateFormatter = require('./utilities').dateFormatter;
var path = require('path');

//Provide the Static Content
router.get('/',function(req,res,next){
    res.status(200);
    res.send('index.html',{root:'server/dist/'});
})

//Fetch the matching cities.
router.get('/fetchCities/:city',function(req,res,next){
    var filtered = records.filter(function(record){
        return record.city.toLowerCase().includes(req.params.city.toLowerCase());
    });
    res.status(200);
    res.json(filtered);
})
//Search the flights.
router.post('/searchFlights',function(req,res,next){
    var {originIATA,destinationIATA,departDate,returnDate,selectedMaxPrice} = req.body;
    var flights = generateFlightsData({originIATA,destinationIATA, departDate,returnDate,selectedMaxPrice});
    res.status(200);
    res.json(flights);
})

module.exports = router;