const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel {
  constructor() {
    super('user');
  }

  async findOne(username) {
    return await super.findOne('username', username);
  }
  
}
 
module.exports = new UserModel();