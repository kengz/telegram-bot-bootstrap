# telegram-bot-bootstrap
[![npm version](https://badge.fury.io/js/telegram-bot-bootstrap.svg)](http://badge.fury.io/js/telegram-bot-bootstrap) [![Build Status](https://travis-ci.org/kengz/telegram-bot-bootstrap.svg?branch=master)](https://travis-ci.org/kengz/telegram-bot-bootstrap) [![Dependency Status](https://gemnasium.com/kengz/telegram-bot-bootstrap.svg)](https://gemnasium.com/kengz/telegram-bot-bootstrap)


A bootstrap for Telegram bot with directly deployable sample bot and JS-wrapped API methods. You can use all methods available in the Telegram API directly, and send any supported media (we serialize the formData for you to send over HTTP).

See the full [API documentation](http://kengz.github.io/telegram-bot-bootstrap/) of this project.

<img src="./docs/demo-pic.jpg" width="300" style="display:inline-block" /> <img src="./docs/demo-kb.jpg" style="display:inline-block" width="300"/>

## Installation
Do either of

```
npm install telegram-bot-bootstrap
git clone https://github.com/kengz/telegram-bot-bootstrap.git
```

Either way you'll get a module with the Telegram bot API wrapped in Node, and a bootstrapped, deploy-ready project.

If you haven't already, get a bot from [BotFather](https://core.telegram.org/bots) and remember your bot *token*!


## Features
- Wrapped API methods take either a JSON object or multiple parameters.
- Auto serialization for HTTP formData: send photos/keyboards/media directly.
- API methods return `promises` (uses [q](https://github.com/kriskowal/q)) for easy chaining and flow control.
- Complete documentation and examples usages.
- Bootstrapped and directly deployable bot.


## Usage: only the API
See the full [API documentation](http://kengz.github.io/telegram-bot-bootstrap/) of this project.

`API.js` contains the [Telegram Bot API](https://core.telegram.org/bots/api) wrapped in Node. The methods will return a promise for easy chaining, and will take either a whole JSON, or multiple parameters for convenience. For the latter, everything will be auto-serialized for HTTP so you don't have to deal with any of the nasty HTTP protocol stuff.

If you wish to use just the API or test the bot methods, here's an example

#### Local(not deployed yet) test bot constructor
See `testbot.js` for functional example.

```Javascript
// testbot.js
var bot = require('telegram-bot-bootstrap');
var fs = require('fs');

var Alice = new bot(your-token);

Alice.getUpdates().then(console.log)
// → you'll see an update message. Look for your user_id in "message.from.id"

// Once you get your id to message yourself, you may:
Alice.sendMessage(your-id, "Hello there")
// → you'll receive a message from Alice.
.then(console.log)
// → optional, will log the successful message sent over HTTP
```

#### Sending Message, Photo and all media

```
Alice.sendMessage(86953862, 'Hey wanna see some cool art?');

Alice.sendPhoto(86953862, fs.createReadStream(__dirname+'/alexiuss.jpg'), 'Chronoscape by Alexiuss').then(console.log)
```

You'll receive this:

<img src="./docs/demo-pic.jpg" width="300" style="display:inline-block" /> 

#### Custom keyboard

```
var kb = {
        keyboard: [
            ['one'],
            ['two', 'three'],
            ['four', 'five', 'six']
        ],
        one_time_keyboard: true
    };
Alice.sendMessage(86953862, "Choose a lucky number", undefined, undefined, kb)
```

 You'll get this:
 
<img src="./docs/demo-kb.jpg" style="display:inline-block" width="300"/>


## Usage: Bootstrapped, Deployable Bot
See `index.js` for deployable app, and `bot.js` to customize bot commands.

We distinguish the bot from the API: `bot.js` extends `API.js`, and will be the deployed component.

This whole project is bootstrapped and deploy-ready: all the details of HTTP and server stuff taken care of for you. I deploy this git project onto my Heroku and voila, my bot is alive.

#### Setup 
In addition to the *token*, you'll need a *webhookUrl*. If you deploy your Node app to *Heroku*, then the *webhookUrl* is simply your Heroku site url. Set both of them in the `.env` file:

```Javascript
PORT=8443
TOKEN=your-Telegram-bot-token
WEBHOOK=your-webhook-url
```

The sample available is an echo-bot. To make your bot do interesting stuff, head over to `bot.js`, under the `handle` method, start writing your own from below the *Extend from here* comment. 

The bot inherits all the API methods, so you can simply call them for example by `this.sendMessage`.

#### Deployment
The server is deployed in `index.js`, and a bot is constructed to handle all *HTTP POST* calls from Telegram.

I use *Heroku*. This shall work for any other services too. Once I'm done setting up, I do:

```
git push heroku master
```

And done. Start talking to the bot.