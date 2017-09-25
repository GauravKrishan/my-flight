import React from 'react';
import AutoComplete from 'material-ui/autocomplete';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SearchService from '../api/search-service';
import {http_req,searchFlightsUrl,fetchCitiesUrl} from '../api/http-config';
import {sliceCollectionByValue} from '../utilities';
import _ from 'lodash';
import moment from 'moment';
import SliderComponent from './refinePrice';
import {flightSearchModel} from '../models';

//Component Level constants.
const maxPassengers = 9;
const minPrice = 5000;;
const maxPrice = 500000;
const color = "#009999";

//Data source config for cities.
const dataSourceConfig = {
  text: 'city',
  value: 'iata',
};

const styles={
  style:{
      height:65,
  },
//   textFieldStyle:{
//       height: 65,
//       fontSize:14
//   },
  hintStyle:{ 
      fontSize: 14 
  },
  inputStyle:{ 
      fontSize: 14
  },
  underlineStyle: {
    borderColor: color
  },
  underlineFocusStyle:{
    borderColor: color
  },
  floatingLabelStyle: {
    color: color,
    fontSize:14,
    padding:0
  },
  floatingLabelFocusStyle: {
    color: color,
    fontSize:14,
    padding:0
  },
}

//Flight Search Component.
export default class FlightSearch extends React.Component{
    constructor(props){
        super(props);
        this.searchService = new SearchService(fetchCitiesUrl);
        this.state={
            dataSourceOrigin:[],
            dataSourceDestination:[],
            originIATA:"",
            destinationIATA:"",
            departDate:{},
            returnDate :null,
            minPrice:minPrice,
            maxPrice:maxPrice,
            selectedMaxPrice:parseInt(maxPrice/2),
            passengers:1,
            errors:{
                origin:"",
                destination:"",
                passengers:""
            }
        }
        this._binds('onSearchValidate','updateMaxPrice')
    }
    //Binds <this> with methods.
    _binds(...methods){
        methods.forEach(method=>{
            this[method] = this[method].bind(this);
        })
    }
    //Focus on element.
    onFocus(ele){
        ele.focus();
    }
    //Update price based on user selection.
    updateMaxPrice(price){
        this.state.selectedMaxPrice = price;
    }
    render(){
        return (
            <div className='flight-search'>
                <AutoComplete hintText='Origin' ref={this.onFocus} floatingLabelText="ORIGIN" dataSource={this.state.dataSourceOrigin} dataSourceConfig={dataSourceConfig} filter={AutoComplete.caseInsensitiveFilter} maxSearchResults={10} onUpdateInput={(value)=>this.handleUpdateOrigin(value)} onBlur={(value)=>this.onValidateOrigin(value)} errorText={this.state.errors.origin} {...styles}/>
                <AutoComplete hintText='Destination' floatingLabelText="DESTINATION" dataSource={this.state.dataSourceDestination} dataSourceConfig={dataSourceConfig} filter={AutoComplete.caseInsensitiveFilter} maxSearchResults={10} onUpdateInput={(value)=>this.handleUpdateDestination(value)}  onBlur={(value)=>this.onValidateDestination(value)} errorText={this.state.errors.destination}  {...styles}/>
                <DatePicker container='inline'  floatingLabelText="DEPARTURE" minDate={moment().toDate()} autoOk = {true} onChange={(e,date)=>this.onDepartDateChange(date)} value={this.state.departDate}/> 
                <DatePicker container='inline'  floatingLabelText="RETURN" minDate={moment().add(1,'d').toDate()} autoOk = {true}  onChange={(e,date)=>this.onReturnDateChange(date)} value={this.state.returnDate}/> 
                <TextField hintText='Passengers'  floatingLabelText="PASSENGERS" onChange={(e,value)=>this.onPassengerChange(value)} errorText={this.state.errors.passengers} value={this.state.passengers}  {...styles}/>
                <br/>
                <RaisedButton label = 'Search' primary={true} onClick={()=>this.onSearch()} disabled={this.onSearchValidate()}/>
                <SliderComponent updateMaxPrice={this.updateMaxPrice} minPrice={this.state.minPrice} maxPrice={this.state.maxPrice} step={10000} price={this.state.selectedMaxPrice}/>
            </div>
        )   
    }
    //Enable or disable button based on fields.
    onSearchValidate(){
        var pass = Date.parse(this.state.departDate) && _.every(this.state.errors,_.isEmpty) ;
        if(pass) return false;
        return true;
    }
    //Mehtod for change of passengers.
    onPassengerChange(value){
        value = value.trim();
        let valid = value>0&&value<10?true:false;
        let errors = _.assign({},this.state.errors);
        if(valid){
            errors.passengers = "";
            this.setState({errors:errors,passengers:value})
        }else{
            errors.passengers="Passengers should be ateast 1 and less than 9 "
            this.setState({errors:errors,passengers:value});
        }
    }
    //Search based on origin field change.
    handleUpdateOrigin(value){
        value = value.trim();
        //set Origin Search to true
        this.state.isOriginSearch=true;
         this.searchService.search({value: value});
    }
    //Update Origin values for search flights.
    onValidateOrigin(event){
        let value = event.target.value.trim();
        var exists = _.find(this.state.dataSourceOrigin,{city:value});
        let errors = _.assign({},this.state.errors);
        if(!exists){
            errors.origin = "Please select a valid Origin";
            this.setState({errors:errors});
        }else{
            errors.origin = "";
            this.origin= exists.city;
            this.setState({errors:errors,originIATA:exists.iata});
        }
    }
    //Search based on destination field change.
    handleUpdateDestination(value){
        //set Origin Search to False
        this.state.isOriginSearch=false;
        this.searchService.search({value: value.trim()});
    }
    //Update Destination values for search flights.
    onValidateDestination(event){
        let value = event.target.value.trim();
        var exists = _.find(this.state.dataSourceDestination,{city:value});
        let errors = _.assign({},this.state.errors);
        if(!exists){
            errors.destination = "Please select a valid Origin";
            this.setState({errors:errors});
        }else{
            errors.destination = "";
            this.destination= exists.city;
            this.setState({errors:errors,destinationIATA:exists.iata});
        }
    }
    //Update the data sources for lookup cities.
    updateDataSource(res){
         let errors = _.assign({},this.state.errors);
        if(this.state.isOriginSearch === true){
            if(res.length === 0)
                errors.origin = "Please select a valid Origin";
            else
                errors.origin = "";
            //remove destination city if present.
            res = sliceCollectionByValue(res,'city',this.destination);
            this.setState({dataSourceOrigin:res,errors:errors});
        }
        else{
            if(res.length === 0)
                errors.destination = "Please select a valid Origin";
            else
                errors.destination = "";
             //remove origin city if present.
            res = sliceCollectionByValue(res,'city',this.origin);
            this.setState({dataSourceDestination:res,errors:errors});
        }
            
    }
    //On change of depart date field.
    onDepartDateChange(date){
        this.setState({departDate : date,returnDate:null});
        
    } 
    //On change of return date.
    onReturnDateChange(date){
        this.setState({returnDate : date});
    }   
    //Submit Post request for flight details.
    onSearch(){
        http_req({
            url:searchFlightsUrl,
            method:"POST",
            data: new flightSearchModel(this.state)
        }).then(res=>{
            let flightSummary =  {
                origin:this.origin,
                destination:this.destination,
                departDate: this.state.departDate,
                returnDate : this.state.returnDate
            }
            this.props.fetchFlights({flights:res.data,flightSummary:flightSummary});
        }).catch(err=>{
                throw err;
        })
    }
    //Mount component callback.
    componentDidMount() {
    this.searchService
        .getResults()
        .subscribe(res => {
          this.updateDataSource(res);
        });
  }
}