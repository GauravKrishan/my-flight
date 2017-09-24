//Model for Flight search.
export class flightSearchModel{
    constructor(params){
        let {originIATA,destinationIATA,departDate,selectedMaxPrice,passengers,returnDate} = params;
        this.fields .forEach(field=>{
            this[field] = params[field];
        })
    }
}

flightSearchModel.prototype.fields = ['originIATA','destinationIATA','departDate','selectedMaxPrice','passengers','returnDate'];