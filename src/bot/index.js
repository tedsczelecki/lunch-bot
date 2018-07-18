// const { RTMClient } = require('@slack/client');
const BotKit = require('botkit');
const config = require('../config');
const {addLunch} = require('./lib/lunch');
const { getLunchResponse } = require('./lib/message-processor');

const slackToken = config.slack.oathToken;
const conversationType = 'direct_message,direct_mention,mention,desktop_notification';
//
// const { logMessage } = require('./lib/message-util');
//
// const rtm = new RTMClient(config.slack.token);
// rtm.start({
//   token: config.slack.oathToken,
// });
//
// rtm.on('message', async (msg) => {
//   console.log('MESSAGE', msg);
//   if ( (msg.subtype && msg.subtype === 'bot_message') ||
//     (!msg.subtype && msg.user === rtm.activeUserId) ) {
//     return;
//   }
//
//   logMessage(msg);
//   const responseMessage = await getResponse(msg);
//   console.log(responseMessage);
//   rtm.sendMessage(responseMessage, msg.channel)
//     .then((res) => {
//       console.log('SENT', res);
//     })
// });
//
// module.exports = {
//   rtm,
// };


const controller = BotKit.slackbot({
  debug: config.NODE_ENV,
});

const bot = controller.spawn({
  token: slackToken,
}).startRTM();

// controller.hears(['hello', 'hi'], conversationType, function(bot, message) {
//
//   console.log(message);
//   controller.storage.users.get(message.user, function(err, user) {
//     if (user && user.name) {
//       bot.reply(message, 'Hello ' + user.name + '!!');
//     } else {
//       bot.reply(message, 'Hello.');
//     }
//   });
// });

controller.hears(['(^add lunch .*)'], conversationType, async function(bot, message) {
  const _message = {...message};
  _message.text = _message.text.substr(9);
  const dialog = await getAddLunchDialog(bot, _message);
  console.log('MESSAGE', _message); 
  bot.replyWithDialog(_message, dialog.asObject());
});

controller.hears(['(^what .*)'], conversationType, async function(bot, message) {
  const responseMessage = await getLunchResponse(message);
  bot.reply(message, responseMessage)
});

controller.hears(['.*'], conversationType, async function(bot, message) {
  bot.reply(message, 'I don\'t understand');
});
module.exports = controller;
