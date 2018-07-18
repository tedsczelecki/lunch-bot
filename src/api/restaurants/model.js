const path = require('path');

const BaseModel = require('../base.model');

class Restaurants extends BaseModel {
  static get tableName() {
    return 'fbot_restaurants';
  }
  static get relationMappings() {
    return {
      menu: {
        relation: BaseModel.HasManyRelation,
        modelClass: path.join(__dirname, '../menus/model'),
        join: {
          from: 'fbot_restaurants.id',
          to: 'fbot_menus.restaurant_id',
        }
      }
    };
  }
}

module.exports = Restaurants;
