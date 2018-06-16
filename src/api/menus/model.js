const BaseModel = require('../base.model');

class Post extends BaseModel {
  static get tableName() {
    return 'fbot_menus';
  }
  static get relationMappings() {
    return {
      menu: {
        relation: BaseModel.HasManyRelation,
        // We use __dirname to avoid require loops
        modelClass: __dirname + '/../restaurants/model',
        join: {
          from: 'fbot_menus.restaurant_id',
          to: 'fbot_restaurants.id',
        },
      },
    };
  }
}

module.exports = Post;
