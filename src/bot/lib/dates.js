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

module.exports = {
  getDateFromMessage,
  getDateInfoFromText,
}
