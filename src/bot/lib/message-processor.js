const _ = require('lodash');
const rp = require('request-promise');
const { getDateFromMessage, getStartOfTheWeek } = require('./dates');
const { getLunchByDate } = require('../../api/lunches/controller');
const { formatRestaurantMenu } = require('./message-formatter');

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayRegExp = new RegExp(`(^(${days.join('|')}))`);

const getLunchResponse = async (message) => {
  const messageDate = getDateFromMessage(message);

  if (messageDate) {
    const lunch = await getLunchByDate({
      date: messageDate
    });

    return !lunch || lunch.length === 0 ?
      null :
      formatRestaurantMenu(lunch);
  }
};

const parseAddLunchMessage = (message) => {
  const messageText = message.text.slice(10).split(/\r?\n/);
  let currentDay = '';
  const lunches = {};
  const startOfTheWeek = getStartOfTheWeek();
  startOfTheWeek.setDate(startOfTheWeek.getDate() - 1);

  messageText.forEach((line) => {
    if (line) {
      if (dayRegExp.test(line.toLowerCase())){
        const day = line.split(' ')[0].replace(/[\W]/g, '');
        let [kot, type, restaurant] = line.slice(day.length).split('*');
        let food = '';
        if (line.indexOf(' - ') > -1) {
          food = _.unescape(line.slice(line.trim().indexOf('-') + 1)).trim() + '\n';
        }
        type = _.unescape(type).replace(/[^a-zA-Z0-9&! ]/g, '').trim();
        restaurant = _.unescape(restaurant.split(' - ')[0]).replace(/[^a-zA-Z0-9&!\- ]/g, '').trim();
        if (currentDay !== day){
          currentDay = day;
          lunches[currentDay] = {
            date: getDateFromMessage({text: currentDay}, startOfTheWeek),
            food,
            restaurant,
            type,
          }
        }
      } else {
        lunches[currentDay].food += line + '\n';
      }
    }
  });

  return Object.values(lunches);
};

module.exports = {
  getLunchResponse,
  parseAddLunchMessage,
};
