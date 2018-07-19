const moment = require('moment');
const nlp = require('compromise');
const rp = require('request-promise');

const relationDates = {
  'today': 0,
  'tomorrow': 1,
  'yesterday': -1,
};

const getDateInfoFromText = (message) => {
  const doc = nlp(message);
  return {
    doc,
    dateData: doc.dates().data().shift(),
  };
};

const getDateFromMessage = (message, date = new Date()) => {
  const text = message.text || message;
  let _date = new Date(date);
  _date.setHours(0);
  _date.setMinutes(0);
  _date.setSeconds(0);
  _date.setMilliseconds(0);

  if ( text.replace(/[^a-z ]/gi, '').trim() === 'whats for lunch'){
    return _date;
  }

  const {doc, dateData} = getDateInfoFromText(text);
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

const getReadableRelativeDate = (date, focusWord = '') => {
  const _date = date instanceof Date ? date : new Date(date) ;
  return moment(_date).calendar(null, {
    sameDay: `[Today's ${focusWord} was]`,
    nextDay: `[Tomorrow's ${focusWord} is]`,
    nextWeek: `dddd['s ${focusWord} will be]`,
    lastDay: `[Yesterday's ${focusWord} was]`,
    lastWeek: `[Last] dddd['s ${focusWord} was]`,
    sameElse: `[${focusWord} on] DD/MM/YYYY`
  })
};

const getStartOfTheWeek = () => {
  const date = new Date();
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const zeroTimeOnDateString = (date) => {
  const _date = date instanceof Date ? date : new Date(date);
  const year = _date.getFullYear();
  const month = `00${_date.getMonth()+1}`.slice(-2);
  const day = `00${_date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

module.exports = {
  getDateFromMessage,
  getDateInfoFromText,
  getReadableRelativeDate,
  getStartOfTheWeek,
  zeroTimeOnDateString,
}
