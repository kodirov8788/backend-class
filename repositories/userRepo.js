const userModel = require("../models/userModel");

function createUserRepo(model) {
  return {
    async getById(userId) {
      return model.findById(userId);
    },
  };
}

module.exports = createUserRepo(userModel);
