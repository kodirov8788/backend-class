const transactionService = require("../services/transaction");

function prepareController(service) {
  return async function (req, res, next) {
    try {
      const data = req.body;
      console.log(data)

      const result = await service.prepare(data);
      console.log(result);

      res.set({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }).send(result);
    } catch (err) {
      next(err);
    }
  };
}

function completeController(service) {
  return async function (req, res, next) {
    try {
      const data = req.body;
      const result = await service.complete(data);

      res.set({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }).send(result);
    } catch (err) {
      next(err);
    }
  };
}

const preparedTransactionController = prepareController(transactionService);
const completedTransactionController = completeController(transactionService);

module.exports = {
  prepareController: preparedTransactionController,
  completeController: completedTransactionController,
};

