import _ from 'lodash';
//Action reducer for flight app.
export default function(state={flights:[],flightSummary:{}},action){

    switch(action.type){
        case "FETCH_FLIGHTS" : {
            return _.assign({},state,{flights:action.payload.flights,flightSummary:action.payload.flightSummary})
        }
        default : return state
    }
}