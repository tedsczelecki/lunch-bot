const rp = require('request-promise');
const { getDateFromMessage } = require('./dates');
const { getLunchByDate } = require('../../api/lunches/controller');
const { formatRestaurantMenu } = require('./message-formatter');

const getLunchResponse = async (message) => {
  const messageDate = getDateFromMessage(message);

  if (messageDate) {
    const lunch = await getLunchByDate({
      date: messageDate
    });

    return !lunch || lunch.length === 0 ?
      'Sorry no one has set a lunch for that date' :
      formatRestaurantMenu(lunch);
  }
};

module.exports = {
  getLunchResponse,
};
