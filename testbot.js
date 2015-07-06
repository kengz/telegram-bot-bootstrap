// dependencies
var _ = require('lomath')
var scraper = require('reqscraper');
var req = scraper.req;

// Test bot
var fs = require('fs');
// var bot = require(__dirname+'/API.js');

// var Alice = new bot('your-bot-token');

// get your chat_id from here
// Alice.getUpdates().then(console.log)

// try sending a message, and log the HTTP call for confirmation
// Alice.sendMessage('your-chat-id', 'Hey wanna see some cool art?').then(console.log);

// Alice.sendPhoto('your-chat-id', fs.createReadStream(__dirname+'/alexiuss.jpg'), 'Chronoscape by Alexiuss').then(console.log)


// var kb = {
//         keyboard: [
//             ['one'],
//             ['two', 'three'],
//             ['four', 'five', 'six']
//         ],
//         one_time_keyboard: true
//     };
// Alice.sendMessage('your-chat-id', "Choose a lucky number", undefined, undefined, kb)







// A test bot (req) to send sample message to the main bot
var testopt = {
    method: 'POST',
    url: 'http://localhost:8443',
    formData: _.flattenJSON({
        "update_id": 734575200,
        "message": {
            "message_id": 14,
            "from": {
                "id": 86953862,
                "first_name": "your name",
                "last_name": "your lastname",
                "username": "your username",
            },
            "chat": {
                "id": 86953862,
                "first_name": "your name",
                "last_name": "your lastname",
                "username": "your username",
            },
            
            "date": 1435524670,
            "text": "\/td aapl,goog"
        }
    })
}

// send test call
// req(testopt).then(console.log)