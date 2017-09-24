import React from 'react'
import {portfolio_url,http_req} from '../api/http-config';

//Action Creator Method
export default function fetchRecords(){
        const request = http_req({
            url:portfolio_url,
            headers:{'Content-Type':'application/json'}
        })
         return function(dispatch){
            request.then(response=>{
                response = response.data;
                
                dispatch({type:"FETCH_RECORDS",payload:response});
                
            })
        }
}