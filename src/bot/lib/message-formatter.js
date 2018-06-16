const formatRestaurantMenu = (rest) => {
  const formatRestaurant = (r) => {
    return `*${r.restaurant.name}* \n>` + r.menu.reduce(( acc, menuItem ) => {
      let item = `${menuItem.name}`;
      if (menuItem.ingredients) {
        item = `*${item}*: ${menuItem.ingredients}`
      }
      return `${acc} ${item}  \n`
    }, '');
  }

  return Array.isArray(rest) ?
    rest.map(formatRestaurant).join('\n') :
    formatRestaurant(rest);
};

module.exports = {
  formatRestaurantMenu
}
