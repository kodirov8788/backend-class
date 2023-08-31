const transactionModel = require("../models/transactionModel");

function createTransactionRepo(model) {
  return {
    async create(data) {
      await model.create(data);
    },

    async getById(transactionId) {

      // console.log(transactionId)
      return model.findOne({ id: transactionId });
    },

    async getByFilter(filter) {
      return model.findOne(filter);
    },

    async updateById(transactionId, update) {
      return model.findByIdAndUpdate({ id: transactionId }, update);
    },
  };
}

module.exports = createTransactionRepo(transactionModel);
