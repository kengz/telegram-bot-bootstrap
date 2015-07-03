// dependencies
var _ = require('lomath');

// API as superclass that bot inherits methods from
var API = require(__dirname + '/API.js')

// The bot object prototype
// bot extends and inherits methods of API
var bot = function(token, webhookUrl) {
    API.apply(this, arguments);
    // set webhook on construction: override the old webhook
    this.setWebhook(webhookUrl || '');

    // testers
    this.testopt = {
        method: 'POST',
        url: 'http://localhost:8443',
        formData: {
            "update_id": 734575200,
            "message[message_id]": 14,
            "message[from][id]": 87654321,
            "message[from][first_name]": "your name",
            "message[from][last_name]": "your lastname",
            "message[from][username]": "your username",
            "message[chat][id]": 87654321,
            "message[chat][first_name]": "your name",
            "message[chat][last_name]": "your lastname",
            "message[chat][username]": "your username",
            "message[date]": 1435524670,
            "message[text]": "\/test"
        }
    }
    this.test = function() {
        return this.req(this.testopt);
    }
}

// set prototype to API
bot.prototype = API.prototype;
// set constructor back to bot
bot.prototype.constructor = bot;


/**
 * Handles a Telegram Update object sent from the server. Extend this method for your bot.
 * 
 * @category Bot
 * @param {Object} req The incoming HTTP request.
 * @param {Object} res The HTTP response in return.
 * @returns {Promise} promise A promise returned from calling Telegram API method(s) for chaining.
 *
 * @example
 * var bot1 = new bot('yourtokenhere');
 * ...express server setup
 * app.route('/')
 * // robot API as middleware
 * .post(function(req, res) {
 *     bot1.handle(req, res)
 * })
 * // Then bot will handle the incoming Update from you, routed from Telegram!
 * 
 */
bot.prototype.handle = function(req, res) {
    // the Telegram Update object. Useful shits
    var Update = req.body,
        // the telegram Message object
        Message = Update.message,
        // the user who sent it
        user_id = Message.from.id,
        // id of the chat(room)
        chat_id = Message.chat.id;

    ////////////////////////
    // Extend from here:  //
    ////////////////////////
    // you may call the methods from API.js, which are all inherited by this bot class
    
    // echo
    this.sendMessage(chat_id, "you said: " + Message.text);

}

// export the bot class
module.exports = bot;

// sample keyboard
// var kb = {
//     keyboard: [
//         ['one', 'two'],
//         ['three'],
//         ['four']
//     ],
//     one_time_keyboard: true
// }
