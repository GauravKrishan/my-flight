//utility function for currency format.
export function currencyFormatter(value) {
    if(value){
        let price = value;
        return 'Rs.' + parseInt(price).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
     return value;
}
//function to slice a collection based on provided key.
export function sliceCollectionByValue(collection,key,value){
    if(value){
           return collection.filter(record=>{
                    if(record[key] === value) return false;
                    return true;
                })
    }
    return collection;  
}