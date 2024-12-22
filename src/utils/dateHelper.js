const getFormattedDate = function(){
    let currentDate = new Date();
    let h = currentDate.getHours();
    let m = currentDate.getMinutes();
    let s = currentDate.getSeconds();
    
    let result = `${currentDate.toLocaleDateString("sv-SE")} ${h}:${m}:${s}`;
     return result;
}

export {getFormattedDate};