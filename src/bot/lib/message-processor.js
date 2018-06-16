const nlp = require('compromise');
const rp = require('request-promise');
const { getLunchByDate } = require('../../api/lunches/controller');
const { formatRestaurantMenu } = require('./message-formatter');

const relationDates = {
  'today': 0,
  'tomorrow': 1,
  'yesterday': -1,
};

const getResponse = async (message) => {
  if (message.text === 'help') {
    return 'Help is on its way'
  }

  const messageDate = getDateFromMessage(message);

  console.log(messageDate);

  if (messageDate) {
    const lunch = await getLunchByDate({
      date: messageDate
    });

    console.log(lunch);

    console.log(formatRestaurantMenu(lunch));

    return formatRestaurantMenu(lunch);
  }
};

const getDateFromMessage = (message, date = new Date()) => {
  let _date = new Date(date);
  _date.setHours(0);
  _date.setMinutes(0);
  _date.setSeconds(0);
  _date.setMilliseconds(0);

  if ( message.text.replace(/[^a-z ]/gi, '').trim() === 'whats for lunch'){
    return _date;
  }

  const doc = nlp(message.text);
  const dateData = doc.dates().data().shift();
  const dateText = dateData.normal.trim();

  // Is the date relative to today
  if (message)
  if (typeof relationDates[dateText] === 'number') {
    _date.setDate(_date.getDate() + relationDates[dateText]);
  }
  // Does day start with a tense and have a day of the week found
  else if ( dateText.indexOf('last') === 0 || dateText.indexOf('next') === 0 ) {
    if (typeof dateData.date.weekday === 'number'){
      const diffDate = (dateData.date.weekday + 7 - _date.getDay()) % 7;
      const offset = dateText.indexOf('last') === 0 ? -7 : 7;
      _date.setDate(date.getDate() + diffDate + offset);
    }
  }
  // Was just a day of the week found and will also pick out tense to future day or past
  else if (typeof dateData.date.weekday === 'number') {
    const verbs = doc.verbs().terms().out().trim();
    const wasPastTense =  verbs === 'was';
    const isNextWeekOffset = dateData.date.weekday > _date.getDay() || wasPastTense ? 0 : 7;
    _date.setDate(_date.getDate() + (dateData.date.weekday + isNextWeekOffset - _date.getDay()));
  }
  else {
    _date = false;
  }

  return _date;
};

module.exports = {
  getDateFromMessage,
  getResponse,
};
