const { RTMClient } = require('@slack/client');
const config = require('../config');
const { getResponse } = require('./lib/message-processor');
const { logMessage } = require('./lib/message-util');

const rtm = new RTMClient(config.slack.token);
rtm.start({
  token: config.slack.oathToken,
});

rtm.on('message', async (msg) => {
  console.log('MESSAGE', msg);
  if ( (msg.subtype && msg.subtype === 'bot_message') ||
    (!msg.subtype && msg.user === rtm.activeUserId) ) {
    return;
  }

  logMessage(msg);
  const responseMessage = await getResponse(msg);
  console.log(responseMessage);
  rtm.sendMessage(responseMessage, msg.channel)
    .then((res) => {
      console.log('SENT', res);
    })
});

module.exports = {
  rtm,
};
