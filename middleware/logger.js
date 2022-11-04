// Middleware takes in a request, response, and next. Next should always be last, so you can move to the next middleware funnction
const moment = require('moment');//because its something we installed
const logger = (req, res, next) => {
    //log the url that is hit and the date
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);//moment .format is to format the
               // ^give us http              ^get us different parts of the url, then original URL (page)
    next ();
};

module.exports = logger; 