# API.js API documentation

<!-- div class="toc-container" -->

<!-- div -->

## `Bot`
* <a href="#handle">`handle`</a>

<!-- /div -->

<!-- div -->

## `Telegram API`
* <a href="#API">`API`</a>
* <a href="#forwardMessage">`forwardMessage`</a>
* <a href="#getMe">`getMe`</a>
* <a href="#getUpdates">`getUpdates`</a>
* <a href="#getUserProfilePhotos">`getUserProfilePhotos`</a>
* <a href="#sendAudio">`sendAudio`</a>
* <a href="#sendChatAction">`sendChatAction`</a>
* <a href="#sendDocument">`sendDocument`</a>
* <a href="#sendLocation">`sendLocation`</a>
* <a href="#sendMessage">`sendMessage`</a>
* <a href="#sendPhoto">`sendPhoto`</a>
* <a href="#sendSticker">`sendSticker`</a>
* <a href="#sendVideo">`sendVideo`</a>
* <a href="#setWebhook">`setWebhook`</a>

<!-- /div -->

<!-- div -->

## `Methods`

<!-- /div -->

<!-- div -->

## `Properties`

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Bot” Methods`

<!-- div -->

### <a id="handle"></a>`handle(req, res)`
<a href="#handle">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L395 "View in source") [&#x24C9;][1]

Handles a Telegram Update object sent from the server. Extend this method for your bot.

#### Arguments
1. `req` *(Object)*: The incoming HTTP request.
2. `res` *(Object)*: The HTTP response in return.

#### Returns
*(Promise)*:  promise A promise returned from calling Telegram API method(s) for chaining.

#### Example
```js
var bot1 = new bot('yourtokenhere');
...express server setup
app.route('/')
// robot API as middleware
.post(function(req, res) {
    bot1.handle(req, res)
})
// Then bot will handle the incoming Update from you, routed from Telegram!
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Telegram API” Methods`

<!-- div -->

### <a id="API"></a>`API(token)`
<a href="#API">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L34 "View in source") [&#x24C9;][1]

The API bot constructor.

#### Arguments
1. `token` *(string)*: Your Telegram bot token.

#### Returns
*(Bot)*:  The bot able to call methods.

#### Example
```js
var fs = require('fs');
var bot = require('telegram-bot-bootstrap');
var Alice = new bot(your_bot_token);

Alice.sendMessage(user_chat_id, 'Hey wanna see some cool art?');

Alice.sendPhoto(user_chat_id, fs.createReadStream(__dirname+'/alexiuss.jpg'),  * 'Chronoscape by Alexiuss').then(console.log)

var kb = {
        keyboard: [
            ['one'],
            ['two', 'three'],
            ['four', 'five', 'six']
        ],
        one_time_keyboard: true
    };
Alice.sendMessage(user_chat_id, "Choose a lucky number", undefined, undefined,  * kb)

// → The messages and photos are sent to user.
```
* * *

<!-- /div -->

<!-- div -->

### <a id="forwardMessage"></a>`forwardMessage(first, from_chat_id, message_id)`
<a href="#forwardMessage">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L188 "View in source") [&#x24C9;][1]

Use this method to forward messages of any kind.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
2. `from_chat_id` *(integer)*: Unique identifier for the chat where the original message was sent — User or GroupChat id.
3. `message_id` *(integer)*: Unique message identifier

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

#### Example
```js
Alice.forwardMessage(87654321, 12345678, 87654356)
// → Message is forwarded
```
* * *

<!-- /div -->

<!-- div -->

### <a id="getMe"></a>`getMe()`
<a href="#getMe">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L130 "View in source") [&#x24C9;][1]

A simple method for testing your bot's auth token. Requires no parameters.

#### Returns
*(string)*:  HTTPres Basic information about the bot in form of a User object.

* * *

<!-- /div -->

<!-- div -->

### <a id="getUpdates"></a>`getUpdates([first|offset], [limit], [timeout])`
<a href="#getUpdates">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L94 "View in source") [&#x24C9;][1]

Use this method to receive incoming updates using long polling (wiki).

#### Arguments
1. `[first|offset]` *(JSON|integer)*: An optional JSON object with the parameters, or the offset integer
2. `[limit]` *(integer)*:
3. `[timeout]` *(integer)*:

#### Returns
*(string)*:  HTTPres An Array of Update objects is returned.

#### Example
```js
Alice.getUpdates().then(console.log)
// → {"ok":true,"result":[{"update_id":1234567, "message":{"message_id":1,"from":{"id":87654321, ...}}]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="getUserProfilePhotos"></a>`getUserProfilePhotos(first, [offset], [limit])`
<a href="#getUserProfilePhotos">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L366 "View in source") [&#x24C9;][1]

Use this method to get a list of profile pictures for a user.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or user_id: Unique identifier of the target user.
2. `[offset]` *(integer)*: Sequential number of the first photo to be returned. By default, all photos are returned.
3. `[limit]` *(integer)*: Limits the number of photos to be retrieved. Values between `1—100` are accepted. Defaults to `10`0.

#### Returns
*(string)*:  HTTPres Returns a UserProfilePhotos object.

* * *

<!-- /div -->

<!-- div -->

### <a id="sendAudio"></a>`sendAudio(first, audio, [reply_to_message_id], [reply_markup])`
<a href="#sendAudio">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L237 "View in source") [&#x24C9;][1]

Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
2. `audio` *(inputFile|string)*: Audio file to send. You can either pass a file_id as String to resend an audio that is already on the Telegram servers, or upload a new audio file using multipart/form-data.
3. `[reply_to_message_id]` *(integer)*: If the message is a reply, ID of the original message.
4. `[reply_markup]` *(KeyboardMarkup)*: Additional interface options. A JSON object *(don't worry about serializing; it's handled)* for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

* * *

<!-- /div -->

<!-- div -->

### <a id="sendChatAction"></a>`sendChatAction(first, action)`
<a href="#sendChatAction">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L347 "View in source") [&#x24C9;][1]

Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id..
2. `action` *(string)*: Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_audio or upload_audio for audio files, upload_document for general files, find_location for location data.

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

* * *

<!-- /div -->

<!-- div -->

### <a id="sendDocument"></a>`sendDocument(first, document, [reply_to_message_id], [reply_markup])`
<a href="#sendDocument">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L259 "View in source") [&#x24C9;][1]

Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
2. `document` *(inputFile|string)*: File to send. You can either pass a file_id as String to resend a file that is already on the Telegram servers, or upload a new file using multipart/form-data.
3. `[reply_to_message_id]` *(integer)*: If the message is a reply, ID of the original message.
4. `[reply_markup]` *(KeyboardMarkup)*: Additional interface options. A JSON object *(don't worry about serializing; it's handled)* for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

* * *

<!-- /div -->

<!-- div -->

### <a id="sendLocation"></a>`sendLocation(first, latitude, longitude, [reply_to_message_id], [reply_markup])`
<a href="#sendLocation">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L326 "View in source") [&#x24C9;][1]

Use this method to send point on the map.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
2. `latitude` *(number)*: Latitude of location
3. `longitude` *(number)*: Longitude of location
4. `[reply_to_message_id]` *(integer)*: If the message is a reply, ID of the original message.
5. `[reply_markup]` *(KeyboardMarkup)*: Additional interface options. A JSON object *(don't worry about serializing; it's handled)* for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

* * *

<!-- /div -->

<!-- div -->

### <a id="sendMessage"></a>`sendMessage(first, text, [disable_web_page_preview], [reply_to_message_id], [reply_markup])`
<a href="#sendMessage">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L162 "View in source") [&#x24C9;][1]

Use this method to send text messages.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
2. `text` *(string)*: Text of the message to be sent.
3. `[disable_web_page_preview]` *(boolean)*: Disables link previews for links in this message.
4. `[reply_to_message_id]` *(integer)*: If the message is a reply, ID of the original message.
5. `[reply_markup]` *(KeyboardMarkup)*: Additional interface options. A JSON object *(don't worry about serializing; it's handled)* for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

#### Example
```js
Alice.sendMessage({chat_id: 87654321, text: 'hello world'})
Alice.sendMessage(87654321, 'hello world') // equivalent, cleaner
// → 'hello world' is sent to the user with the id.

// var kb = {
//     keyboard: [
//         ['one'],
//         ['two', 'three'],
//         ['four', 'five', 'six']
//     ],
//     one_time_keyboard: true
// };
Alice.sendMessage(87654321, "Choose a lucky number", undefined, undefined, kb)
// → 'Choose a lucky number' is sent, with custom reply keyboard
```
* * *

<!-- /div -->

<!-- div -->

### <a id="sendPhoto"></a>`sendPhoto(first, photo, [caption], [reply_to_message_id], [reply_markup])`
<a href="#sendPhoto">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L214 "View in source") [&#x24C9;][1]

Use this method to send photos.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
2. `photo` *(inputFile|string)*: Photo to send. You can either pass a file_id as String to resend a photo that is already on the Telegram servers, or upload a new photo using multipart/form-data.
3. `[caption]` *(string)*:
4. `[reply_to_message_id]` *(integer)*: If the message is a reply, ID of the original message.
5. `[reply_markup]` *(KeyboardMarkup)*: Additional interface options. A JSON object *(don't worry about serializing; it's handled)* for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

#### Example
```js
Alice.sendMessage(87654321, fs.createReadStream('localpath/to/photo.jpg'), 'cool caption')
// → The photo on local system is sent to the id.
```
* * *

<!-- /div -->

<!-- div -->

### <a id="sendSticker"></a>`sendSticker(first, sticker, [reply_to_message_id], [reply_markup])`
<a href="#sendSticker">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L281 "View in source") [&#x24C9;][1]

Use this method to send .webp stickers.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
2. `sticker` *(inputFile|string)*: Sticker to send. You can either pass a file_id as String to resend a sticker that is already on the Telegram servers, or upload a new sticker using multipart/form-data.
3. `[reply_to_message_id]` *(integer)*: If the message is a reply, ID of the original message.
4. `[reply_markup]` *(KeyboardMarkup)*: Additional interface options. A JSON object *(don't worry about serializing; it's handled)* for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

* * *

<!-- /div -->

<!-- div -->

### <a id="sendVideo"></a>`sendVideo(first, video, [reply_to_message_id], [reply_markup])`
<a href="#sendVideo">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L303 "View in source") [&#x24C9;][1]

Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.

#### Arguments
1. `first` *(JSON|integer)*: Your own JSON object, or chat_id: Unique identifier for the message recipient — User or GroupChat id.
2. `video` *(inputFile|string)*: Video to send. You can either pass a file_id as String to resend a video that is already on the Telegram servers, or upload a new video file using multipart/form-data.
3. `[reply_to_message_id]` *(integer)*: If the message is a reply, ID of the original message.
4. `[reply_markup]` *(KeyboardMarkup)*: Additional interface options. A JSON object *(don't worry about serializing; it's handled)* for a custom reply keyboard, instructions to hide keyboard or to force a reply from the user.

#### Returns
*(string)*:  HTTPres On success, the sent Message is returned.

* * *

<!-- /div -->

<!-- div -->

### <a id="setWebhook"></a>`setWebhook(url)`
<a href="#setWebhook">#</a> [&#x24C8;](https://github.com/kengz/telegram-bot-bootstrap#L116 "View in source") [&#x24C9;][1]

Use this method to specify a url and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified url, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts.

#### Arguments
1. `url` *(string)*: A JSON object with the parameters, or the HTTPS url to send updates to. Use an empty string to remove webhook integration.

#### Returns
*(string)*:  HTTPres An Array of Update objects is returned.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- /div -->

<!-- div -->

## `Properties`

<!-- /div -->

<!-- /div -->

 [1]: #bot "Jump back to the TOC."
