const path = require('path');

const BaseModel = require('../base.model');

class Restaurants extends BaseModel {
  static get tableName() {
    return 'fbot_restaurants';
  }
  static get relationMappings() {
    return {
    };
  }
}

module.exports = Restaurants;
