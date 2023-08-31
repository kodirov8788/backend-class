const productModel = require("../models/productModel");

function createProductRepo(model) {
  return {
    async getById(productId) {
      return model.findById(productId);
    },
  };
}

module.exports = createProductRepo(productModel);

