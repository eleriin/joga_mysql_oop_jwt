const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
  constructor() {
    super('author');
  } 

}

module.exports = new AuthorModel();