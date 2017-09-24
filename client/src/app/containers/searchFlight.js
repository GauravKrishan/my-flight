import React from 'react';
import InputSearch from '../components/searchFlight';
import {connect} from 'react-redux';

//Search flight Container.
export class SearchFlight extends React.Component{

    constructor(props){
        super(props);
        this.cls = 'no-left';
    }
    componentWillReceiveProps(nextProps){
        //moving the search towards left
        if(nextProps.flights.length){
            this.cls = 'left';
        }
    }
    render(){
        var {fetchFlights,flights} = this.props;
        return (
            <div className={this.cls}>
                {/*Search Flight Container*/}
                <InputSearch  fetchFlights={fetchFlights}/>
        </div>
        )
    }
} 
//Connection with store.
export default connect(state=>{
   return {flights:state.app.flights}
},dispatch=>{
    return {
        fetchFlights:(flights)=>dispatch({type:"FETCH_FLIGHTS",payload:flights})
    }
})(SearchFlight)