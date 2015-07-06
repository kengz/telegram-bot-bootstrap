// dependencies
var _ = require('lomath');
var fs = require('fs');

// imports
var req = require('reqscraper').req;

// The API object prototype
/**
 * The API bot constructor.
 * 
 * @category Telegram API
 * @param {string} token Your Telegram bot token.
 * @returns {Bot} The bot able to call methods.
 *
 * @example
 * 
 * var fs = require('fs');
 * var bot = require('telegram-bot-bootstrap');
 * var Alice = new bot(your_bot_token);
 * 
 * Alice.sendMessage(user_chat_id, 'Hey wanna see some cool art?');
 * 
 * Alice.sendPhoto(user_chat_id, fs.createReadStream(__dirname+'/alexiuss.jpg'),  * 'Chronoscape by Alexiuss').then(console.log)
 * 
 * var kb = {
 *         keyboard: [
 *             ['one'],
 *             ['two', 'three'],
 *             ['four', 'five', 'six']
 *         ],
 *         one_time_keyboard: true
 *     };
 * Alice.sendMessage(user_chat_id, "Choose a lucky number", undefined, undefined,  * kb)
 * 
 * // → The messages and photos are sent to user.
 * 
 */
var API = function(token) {
    this.token = token;
    this.baseUrl = 'https://api.telegram.org/bot' + this.token;

    // A sample Telegram bot JSON data, for req options
    this.formData = {
        chat_id: "87654321",
        text: "Hello there"
    };

    // template options for req the Telegram Bot API
    this.baseoptions = {
        method: 'POST',
        baseUrl: this.baseUrl,
        url: "sendMessage",
        formData: this.formData
    };

    ///////////////////////////////
    // Internal, private methods //
    ///////////////////////////////

    // Convert an data to format proper for HTTP methods
    this.toHTTPProper = function(data) {
        // currently serialize Array now, leave stream/string
        return _.isArray(data) ? JSON.stringify(data) : data;
        // return data;
    }

    // serialize a whole object proper for HTTP methods
    // discard key-value pair if value is undefined
    // only returns non-empty JSON
    this.serialize = function(obj) {
        // var ser = _.omit(
        //     _.mapValues(_.flattenJSON(obj), this.toHTTPProper)
        //     , _.isUndefined);
        var ser = _.omit(
            _.mapValues(obj, this.toHTTPProper)
            , _.isUndefined);
        if (!_.isEmpty(ser)) return ser;
    }

    // properly set req as its method
    this.req = req;

    // Extends the options for req for the Telegram Bot.
    // @param  {string} botMethod Telegram bot API method.
    // @param  {JSON} JSONdata A JSON object with the required fields (see API).
    // @param  {string} [HTTPMethod=POST] Optionally change method if need to.
    // @returns {JSON} option The extended option.
    // 
    // @example
    // extOpt('sendMessage', {chat_id: 123456, text: 'hello world'})
    // → {
    // method: 'POST',
    // baseUrl: 'https://api.telegram.org/bot...',
    // url: 'sendMessage',
    // formData: {chat_id: 123456, text: 'hello world'} }
    this.extOpt = function(botMethod, JSONdata, HTTPMethod) {
        var opt = _.clone({
            method: 'POST',
            baseUrl: this.baseUrl,
            url: "sendMessage",
            formData: this.formData
        });
        _.assign(opt, {
            url: botMethod
        })
        if (JSONdata) _.assign(opt, {
            formData: this.serialize(JSONdata)
        })
        if (HTTPMethod) _.assign(opt, {
            botMethod: HTTPMethod
        });

        return opt;
    }

    // shorthand composition: bot's HTTP request
    this.reqBot = _.flow(this.extOpt, this.req)

}


//////////////////////////
// Telegram API methods //
//////////////////////////
// All the methods below return a promise form the `q` library (see https://github.com/kriskowal/q) for chaining, thus can be called by: samplemethod().then(handlerfunction).then(handler2)
// You can:
// pass a single JSON object as the 'first' argument (see the Telegram API), or
// pass multiple parameters in the order listed on Telegram bot API page; the 'first' is always the 'chat_id' in this case.
// Note that the response from the HTTP call is always a string (we denote as HTTPres for clarity), thus you might wish to JSON.parse it.

/**
 * Use this method to receive incoming updates using long polling (wiki).
 * 
 * @category Telegram API
 * @param {JSON|integer} [first|offset] An optional JSON object with the parameters, or the offset integer
 * @param {integer} [limit]
 * @param {integer} [timeout]
 * @returns {string} HTTPres An Array of Update objects is returned.
 *
 * @example
 * Alice.getUpdates().then(console.log)
 * // → {"ok":true,"result":[{"update_id":1234567, "message":{"message_id":1,"from":{"id":87654321, ...}}]
 * 
 */
API.prototype.getUpdates = function(first, limit, timeout) {
    var options = _.isObject(first) ?
        first : {
            offset: first,
            limit: limit,
            timeout: timeout
        };
    return this.reqBot('getUpdates', options)
}

/**
 * Use this method to specify a url and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified url, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts.
 * 
 * @category Telegram API
 * @param {string} url A JSON object with the parameters, or the HTTPS url to send updates to. Use an empty string to remove webhook integration.
 * @returns {string} HTTPres An Array of Update objects is returned.
 *
 * @xample
 * setWebhook('') // empty string to unset webhook
 *
 * setWebhook('http://yoururl.com') // to set webhook
 */
API.prototype.setWebhook = function(first) {
    var options = _.isObject(first) ?
        first : {
            url: first
        };
    return this.reqBot('setWebhook', options);
}

/**
 * A simple method for testing your bot's auth token. Requires no parameters.
 * 
 * @category Telegram API
 * @returns {string} HTTPres Basic information about the bot in form of a User object.
 */
API.prototype.getMe = function() {
    return this.reqBot('getMe');
}

/**
 * Use this method to send text messages. 
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
 * @param {string} text Text of the message to be sent.
 * @param {boolean} [disable_web_page_preview] Disables link previews for links in this message.
 * @param {integer} [reply_to_message_id] If the message is a reply, ID of the original message.
 * @param {KeyboardMarkup} [reply_markup] Additional interface options. A JSON object (don't worry about serializing; it's handled) for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.
 * @returns {string} HTTPres On success, the sent Message is returned.
 *
 * @example
 * Alice.sendMessage({chat_id: 87654321, text: 'hello world'})
 * Alice.sendMessage(87654321, 'hello world') // equivalent, cleaner
 * // → 'hello world' is sent to the user with the id.
 *
 * // var kb = {
 * //     keyboard: [
 * //         ['one'],
 * //         ['two', 'three'],
 * //         ['four', 'five', 'six']
 * //     ],
 * //     one_time_keyboard: true
 * // };
 * Alice.sendMessage(87654321, "Choose a lucky number", undefined, undefined, kb)
 * // → 'Choose a lucky number' is sent, with custom reply keyboard
 * 
 */
API.prototype.sendMessage = function(first, text, disable_web_page_preview, reply_to_message_id, reply_markup) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            text: text || 'null-guarded; Your method is sending empty text.',
            disable_web_page_preview: disable_web_page_preview,
            reply_to_message_id: reply_to_message_id,
            reply_markup: JSON.stringify(reply_markup)
        };
    return this.reqBot('sendMessage', options);
}

/**
 * Use this method to forward messages of any kind. 
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
 * @param {integer} from_chat_id Unique identifier for the chat where the original message was sent — User or GroupChat id.
 * @param {integer} message_id Unique message identifier
 * @returns {string} HTTPres On success, the sent Message is returned.
 *
 * @example
 * Alice.forwardMessage(87654321, 12345678, 87654356)
 * // → Message is forwarded
 * 
 */
API.prototype.forwardMessage = function(first, from_chat_id, message_id) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            from_chat_id: from_chat_id,
            message_id: message_id
        };
    return this.reqBot('forwardMessage', options);
}

/**
 * Use this method to send photos.
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
 * @param {inputFile|string} photo Photo to send. You can either pass a file_id as String to resend a photo that is already on the Telegram servers, or upload a new photo using multipart/form-data.
 * @param {string} [caption]
 * @param {integer} [reply_to_message_id] If the message is a reply, ID of the original message.
 * @param {KeyboardMarkup} [reply_markup] Additional interface options. A JSON object (don't worry about serializing; it's handled) for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.
 * @returns {string} HTTPres On success, the sent Message is returned.
 *
 * @example
 * Alice.sendMessage(87654321, fs.createReadStream('localpath/to/photo.jpg'), 'cool caption')
 * // → The photo on local system is sent to the id.
 * 
 */
API.prototype.sendPhoto = function(first, photo, caption, reply_to_message_id, reply_markup) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            photo: photo,
            caption: caption,
            reply_to_message_id: reply_to_message_id,
            reply_markup: JSON.stringify(reply_markup)
        };
    return this.reqBot('sendPhoto', options);
}

/**
 * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
 * @param {inputFile|string} audio Audio file to send. You can either pass a file_id as String to resend an audio that is already on the Telegram servers, or upload a new audio file using multipart/form-data.
 * @param {integer} [reply_to_message_id] If the message is a reply, ID of the original message.
 * @param {KeyboardMarkup} [reply_markup] Additional interface options. A JSON object (don't worry about serializing; it's handled) for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.
 * @returns {string} HTTPres On success, the sent Message is returned.
 * 
 */
API.prototype.sendAudio = function(first, audio, reply_to_message_id, reply_markup) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            audio: audio,
            reply_to_message_id: reply_to_message_id,
            reply_markup: JSON.stringify(reply_markup)
        };
    return this.reqBot('sendAudio', options);
}

/**
 * Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
 * @param {inputFile|string} document File to send. You can either pass a file_id as String to resend a file that is already on the Telegram servers, or upload a new file using multipart/form-data.
 * @param {integer} [reply_to_message_id] If the message is a reply, ID of the original message.
 * @param {KeyboardMarkup} [reply_markup] Additional interface options. A JSON object (don't worry about serializing; it's handled) for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.
 * @returns {string} HTTPres On success, the sent Message is returned.
 * 
 */
API.prototype.sendDocument = function(first, document, reply_to_message_id, reply_markup) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            document: document,
            reply_to_message_id: reply_to_message_id,
            reply_markup: JSON.stringify(reply_markup)
        };
    return this.reqBot('sendDocument', options);
}

/**
 * Use this method to send .webp stickers.
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
 * @param {inputFile|string} sticker Sticker to send. You can either pass a file_id as String to resend a sticker that is already on the Telegram servers, or upload a new sticker using multipart/form-data.
 * @param {integer} [reply_to_message_id] If the message is a reply, ID of the original message.
 * @param {KeyboardMarkup} [reply_markup] Additional interface options. A JSON object (don't worry about serializing; it's handled) for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.
 * @returns {string} HTTPres On success, the sent Message is returned.
 * 
 */
API.prototype.sendSticker = function(first, sticker, reply_to_message_id, reply_markup) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            sticker: sticker,
            reply_to_message_id: reply_to_message_id,
            reply_markup: JSON.stringify(reply_markup)
        };
    return this.reqBot('sendSticker', options);
}

/**
 * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
 * @param {inputFile|string} video Video to send. You can either pass a file_id as String to resend a video that is already on the Telegram servers, or upload a new video file using multipart/form-data.
 * @param {integer} [reply_to_message_id] If the message is a reply, ID of the original message.
 * @param {KeyboardMarkup} [reply_markup] Additional interface options. A JSON object (don't worry about serializing; it's handled) for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.
 * @returns {string} HTTPres On success, the sent Message is returned.
 * 
 */
API.prototype.sendVideo = function(first, video, reply_to_message_id, reply_markup) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            video: video,
            reply_to_message_id: reply_to_message_id,
            reply_markup: JSON.stringify(reply_markup)
        };
    return this.reqBot('sendVideo', options);
}

/**
 * Use this method to send point on the map.
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
 * @param {number} latitude Latitude of location
 * @param {number} longitude Longitude of location
 * @param {integer} [reply_to_message_id] If the message is a reply, ID of the original message.
 * @param {KeyboardMarkup} [reply_markup] Additional interface options. A JSON object (don't worry about serializing; it's handled) for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.
 * @returns {string} HTTPres On success, the sent Message is returned.
 * 
 */
API.prototype.sendLocation = function(first, latitude, longitude, reply_to_message_id, reply_markup) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            longitude: longitude,
            latitude: latitude,
            reply_to_message_id: reply_to_message_id,
            reply_markup: JSON.stringify(reply_markup)
        };
    return this.reqBot('sendLocation', options);
}

/**
 * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id..
 * @param {string} action Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_audio or upload_audio for audio files, upload_document for general files, find_location for location data.
 * @returns {string} HTTPres On success, the sent Message is returned.
 * 
 */
API.prototype.sendChatAction = function(first, action) {
    var options = _.isObject(first) ?
        first : {
            chat_id: first,
            action: action
        };
    return this.reqBot('sendChatAction', options);
}

/**
 * Use this method to get a list of profile pictures for a user.
 * 
 * @category Telegram API
 * @param {JSON|integer} first Your own JSON object, or user_id: Unique identifier of the target user.
 * @param {integer} [offset] Sequential number of the first photo to be returned. By default, all photos are returned.
 * @param {integer} [limit] Limits the number of photos to be retrieved. Values between 1—100 are accepted. Defaults to 100.
 * @returns {string} HTTPres Returns a UserProfilePhotos object.
 * 
 */
API.prototype.getUserProfilePhotos = function(first, offset, limit) {
    var options = _.isObject(first) ?
        first : {
            user_id: first,
            offset: offset,
            limit: limit
        };
    return this.reqBot('getUserProfilePhotos', options);
}

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
function handle(req, res) {
}


// export constructor
module.exports = API;
