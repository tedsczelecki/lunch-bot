// const { RTMClient } = require('@slack/client');
const BotKit = require('botkit');
const config = require('../config');
const {addLunch} = require('./lib/lunch');
const { findOrInsert } = require('../api/restaurants/controller');
const { setLunchByDate } = require('../api/lunches/controller');
const { zeroTimeOnDateString } = require('./lib/dates');
const {
  getLunchResponse,
  parseAddLunchMessage,
} = require('./lib/message-processor');

const slackToken = config.slack.oathToken;
const conversationType = 'direct_message,direct_mention,mention,desktop_notification';

const controller = BotKit.slackbot({
  debug: config.NODE_ENV,
});

const bot = controller.spawn({
  token: slackToken,
}).startRTM();

controller.hears('help', conversationType, async function(bot, message){
  bot.reply(message, `
\`\`\`
Hi im lunchbot and I can let you know what's for lunch on a specific day in natural language.
This means you can ask me "Whats for lunch" or "Whats for lunch today" and I'm able to figure 
it out.

Getting lunches:
---
@LunchBOT whats for lunch
@LunchBOT whats for lunch today
@LunchBOT Whats for lunch tomorrow
@LunchBOT Whats for lunch on Friday
@LunchBOT Whats lunch on Monday - This will get next monday if available
@LunchBOT What was lunch on Monday - This will get the previous monday
@LunchBOT What was for lunch last Friday
@LunchBOT What is for lunch next Friday

There are more features coming, but for now im hangry and you won't like me when im hangry.
\`\`\`
  `)
})

controller.hears(['(^what(\'s|s|) .*)'], conversationType, async function(bot, message) {
  const responseMessage = await getLunchResponse(message);
  console.log('RESPONSE', responseMessage);
  bot.reply(message, responseMessage ? responseMessage : 'Not sure whats for lunch that day')
});

controller.hears(['(^add lunch .*)'], conversationType, async function(bot, message) {
  const lunches =  parseAddLunchMessage(message);

  for (lunch of lunches){
    const restaurant = await findOrInsert({
      name: lunch.restaurant,
      type: lunch.type,
    });
    const insertedLunch = await setLunchByDate({
      restaurant_id: restaurant.id,
      date: zeroTimeOnDateString(lunch.date.toString()),
      notes: lunch.food
    });
  }
});

controller.hears(['.*'], conversationType, async function(bot, message) {
  bot.reply(message, 'I don\'t understand');
});
module.exports = controller;
