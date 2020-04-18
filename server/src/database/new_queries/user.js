const { User } = require('../core/relations');

function getUser(userId, populate = '') {
  return User.query().findById(userId).withGraphFetched(populate);
}

function createUser(username, password) {
  return User.query().insert({
    username,
    password,
  });
}

function createUserObj(userObj) {
  return User.query().insert(userObj);
}

function editUser(userId ,modifications) {
  return User.query().findById(userId).patch(modifications);
}

module.exports = {
  getUser,
  createUser,
  editUser,
  createUserObj,
};
