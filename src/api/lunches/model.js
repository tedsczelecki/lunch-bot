const path = require('path');
const BaseModel = require('../base.model');

class Post extends BaseModel {
  static get tableName() {
    return 'fbot_lunches';
  }
  static get relationMappings() {
    return {
      restaurant: {
        relation: BaseModel.BelongsToOneRelation,
        // We use __dirname to avoid require loops
        modelClass: __dirname + '/../restaurants/model',
        join: {
          from: 'fbot_lunches.restaurant_id',
          to: 'fbot_restaurants.id',
        },
      },
      menu: {
        relation: BaseModel.HasManyRelation,
        modelClass: path.join(__dirname, '../menus/model'),
        join: {
          from: 'fbot_lunches.restaurant_id',
          to: 'fbot_menus.restaurant_id',
        }
      }
    };
  }
}

module.exports = Post;
