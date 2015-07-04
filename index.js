/////////////////////////////////////////
// Safety: Uncomment everything to use //
/////////////////////////////////////////

// // dependencies
// // express
// var _ = require('lomath');
// var express = require('express');
// var app = express();
// // express middlewares
// var morgan = require('morgan');
// var ejs = require('ejs');
// var bodyParser = require('body-parser');
// var multer = require('multer');

// // telegram bot
// var bot = require(__dirname + '/bot.js');
// var token = 'your example token';
// var webhookUrl = 'your webhook url'
// var bot1 = new bot(process.env.TOKEN || token, process.env.WEBHOOK || webhookUrl);


// // engine to render HTML
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');
// // set the port number
// app.set('port', process.env.PORT || 8443);

// // Mount middlewares defaulted for root: 
// // log all HTTP calls for debugging
// // app.use(morgan('combined'));
// // use resources for html: HTML, JS and CSS etc.
// app.use(express.static(__dirname + '/views'));
// // parse incoming formData into JSON
// app.use(bodyParser.json());
// app.use(multer());


// // route: concise way to group all HTTP methods for a path
// app.route('/')
//     .get(function(req, res) {
//         // console.log("you GET")
//         res.render('index')
//     })
//     .post(function(req, res) {
//         // send back to end req-res cycle
//         res.json('okay, received\n');
//         // robot handle as middleware for POST
//         bot1.handle(req, res)
//     })
//     .put(function(req, res) {
//         res.send("you just called PUT\n")
//     })


// // finally, listen to the specific port for any calls
// app.listen(app.get('port'), function() {
//     console.log('Node app is running on port', app.get('port'));
// });
