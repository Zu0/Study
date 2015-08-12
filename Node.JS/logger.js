/*******************************************************************************
 * Modules
 ******************************************************************************/
var winston = require("winston");

module.exports = exports = logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: function() { return getTimestamp(); },
        }),
        new (winston.transports.DailyRotateFile)({
            timestamp: function() { return getTimestamp(); },
            filename: "./log/GameLog.log",
            datePattern: '.yyMMdd',
            //maxsize: 1024*1024*1024,
            json: false
        })
    ]
});

function getTimestamp() {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    
    year = String(year).slice(2);
    month = month + 1;
    month = month + "";
    if (month.length == 1) {
        month = "0" + month;
    }
    day = day + "";
    if (day.length == 1) {
        day = "0" + day;
    }
    return "["+year+month+day+"-"+date.toLocaleTimeString()+"]";
}