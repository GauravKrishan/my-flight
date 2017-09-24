import axios from 'axios';

//HTTP Request timeout.
const req_timeout = 60000; //60 sec

//App level http/https urls.
export const fetchCitiesUrl = process.env.NODE_ENV === "prod"?"/fetchCities":"http://localhost:3002/fetchCities"
export const searchFlightsUrl = process.env.NODE_ENV === "prod"?"/searchFlights":"http://localhost:3002/searchFlights"

//create http/https request
export function http_req(opts){
  return  axios(opts)
     .then(resp=>resp);
     
}
