const { findAll } = require('../../api/restaurants/controller');
const {getDateFromMessage} = require('./dates');

const addLunch = (message) => {
  console.log('* * * * * * * *');
  console.log('* * * * * * * *');
  console.log('* * * * * * * *');
  console.log('* * * * * * * *');
  const [date, restaurant, menu] = message.text.split('-').map((item) => item.trim());

  console.log(date, restaurant, menu);

  // const lunchDate = getDateFromMessage(date);

};

getAddLunchDialog = async (bot, message) => {
  const today = new Date();
  const [date, restaurant, menu] = message.text.split('-').map((item) => item.trim());
  const restaurants = await findAll();
  const restaurantOptions = restaurants.map((res) => ({label: res.name, value: res.id}));
  console.log(restaurantOptions);
  const dialog = bot.createDialog(
    'Add a lunch',
    'add-lunch',
    'Add',
  )
    .addText('Day', 'text', today.getDay())
    .addText('Month', 'number', today.getMonth())
    .addText('Year', 'number', today.getFullYear())
    .addText('Restaurant', 'select', null, restaurantOptions);

  return dialog;
};

const removeLunch = (message) => {

};

const updateLunch = (message) => {

}

module.exports = {
  addLunch,
  getAddLunchDialog,
  removeLunch,
  updateLunch,
};
