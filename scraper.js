////////////////////////////////
// The generic HTTPreq module //
////////////////////////////////
// contains: 
// 1. HTTP request mod

// dependencies
var q = require('q');
var request = require('request');

//////////////////////////////////////////////
// HTTP request with retry using request JS //
//////////////////////////////////////////////

// try HTTP request retry up to 5 times; 
// returns a promise
function req(options) {
    var defer = q.defer();
    retry(options, defer, 5);
    return defer.promise;
}
// the recursive retry request() function
function retry(options, defer, times) {
    try {
        // bind the defer object to cb
        request(options, cb.bind(defer))
    }
    catch (err) {
        if (times--) retry(options, defer, times);
        // if err, reject
        else defer.reject(err);
    }
}
// callback for request JS 
// binded with q.defer from req() to resolve(body)
function cb(err, res, body){
    if (!err && res.statusCode == 200)
        this.resolve(body)
    else {
        console.log(err, body);
        throw err;
    }
}

// exporting HTTP req and scrape
module.exports = {
    req: req
}
