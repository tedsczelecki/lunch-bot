const moment = require('moment');

const formatRestaurantMenu = (rest) => {
  const formatRestaurant = (r) => {
    const date = moment(new Date(r.date)).calendar(null, {
      sameDay: `[Today's lunch is:]`,
      nextDay: `[Tomorrow's lunch is:]`,
      nextWeek: `dddd['s lunch will be:]`,
      lastDay: `[Yesterday's lunch was:]`,
      lastWeek: `[Last] dddd['s lunch was:]`,
      sameElse: `[Lunch on] DD/MM/YYYY [is:]`
    })
    return {
      author_name: date,
      title: `${r.restaurant.name} - ${r.restaurant.type}`,
      text: r.notes
    };
  };

  return {
    attachments:
      Array.isArray(rest) ?
        rest.map(formatRestaurant) :
        [formatRestaurant(rest)]

  }
};

module.exports = {
  formatRestaurantMenu
};
