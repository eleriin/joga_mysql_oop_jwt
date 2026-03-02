const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel {
  constructor() {
    super('users');
  }

  async findOne(username) {
    return await super.findOne('username', username);
  }
  
}
 
module.exports = UserModel;