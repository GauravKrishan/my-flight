
//Formats the date: DD-MM-YYYY
function dateFormatter(date) {
    if(date){
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        return day+"-"+(month+1)+"-"+year;
    }
    return date;
}

module.exports = {
    dateFormatter : dateFormatter
}