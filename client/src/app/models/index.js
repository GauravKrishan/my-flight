import moment from 'moment';    
//Model for Flight search.
export class flightSearchModel{
    constructor(params){
        this.fields .forEach(field=>{
            //hook for setting current time [material ui date picker issue]
            if(field === 'departDate'){
                if(moment(params[field]).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY'))
                     this[field] = new Date(params[field]).setTime(new Date().getTime());
                else
                     this[field] = params[field];
            }else{
                this[field] = params[field];
            }
        })
    }
}

flightSearchModel.prototype.fields = ['originIATA','destinationIATA','departDate','selectedMaxPrice','passengers','returnDate'];