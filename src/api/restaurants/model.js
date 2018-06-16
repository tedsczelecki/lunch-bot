const BaseModel = require('../base.model');

class Post extends BaseModel {
  static get tableName() {
    return 'fbot_restaurants';
  }
  // static get relationMappings() {
  //   return {
  //     user: {
  //       relation: BaseModel.BelongsToOneRelation,
  //       // We use __dirname to avoid require loops
  //       modelClass: __dirname + '/../users/model',
  //       join: {
  //         from: 'posts.user_id',
  //         to: 'users.id',
  //       },
  //     },
  //   };
  // }
}

module.exports = Post;
