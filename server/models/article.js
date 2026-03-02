const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
  constructor() {
    super('article');
  }

  async findOne(slug) {
    return await super.findOne('slug', slug);
  }

  async findMany(author) {
    return await super.findMany('author_id', author.id);
  }
  
}
 
module.exports = new ArticleModel();