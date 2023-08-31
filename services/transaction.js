const {
  ClickError,
  ClickAction,
  TransactionStatus,
} = require("../enums/transactionEnum");
const transactionRepo = require("../repositories/transactionRepo");
const userRepo = require("../repositories/userRepo");
const productRepo = require("../repositories/productRepo");
const environments = require("../config/environments");
const crypto = require("crypto");

const checkClickSignature = (data, signString) => {
  const {
    transId,
    serviceId,
    userId,
    prepareId,
    amount,
    action,
    signTime,
  } = data;

  // console.log("transId", transId)
  // console.log("serviceId", serviceId)
  // console.log("userId", userId)
  // console.log("prepareId", prepareId)
  // console.log("amount", amount)
  // console.log("action", action)
  // console.log("signTime", signTime)
  const CLICK_SECRET_KEY = environments.CLICK_SECRET_KEY;

  const signature = `${transId}${serviceId}${CLICK_SECRET_KEY}${userId}${prepareId}${amount}${action}${signTime}`;

  // console.log(signature)
  const signatureHash = crypto
    .createHash("md5")
    .update(signature)
    .digest("hex");

  // console.log(signString)
  return signatureHash
};

function prepareService(repo, userRepo, productRepo) {
  return async function (data) {


    const {
      click_trans_id: transId,
      service_id: serviceId,
      merchant_trans_id: userId,
      product_id: productId,
      amount,
      action,
      sign_time: signTime,
      sign_string: signString,
    } = data;

    console.log("data: ", data)
    const signatureData = {
      transId,
      serviceId,
      userId,
      amount,
      action,
      signTime,
    };

    const checkSignature = checkClickSignature(signatureData, signString);
    if (!checkSignature) {
      return {
        error: ClickError.SignFailed,
        error_note: "Invalid sign",
      };
    }




    if (parseInt(action) !== ClickAction.Prepare) {
      return {
        error: ClickError.ActionNotFound,
        error_note: "Action not found",
      };
    }

    const isAlreadyPaid = await repo.getByFilter({
      userId,
      productId,
      status: TransactionStatus.Paid,
    });
    if (isAlreadyPaid) {
      return {
        error: ClickError.AlreadyPaid,
        error_note: "Already paid",
      };
    }

    // const user = await userRepo.getById(userId);
    // if (!user) {
    //   return {
    //     error: ClickError.UserNotFound,
    //     error_note: "User not found",
    //   };
    // }

    // const product = await productRepo.getById(productId);
    // if (!product) {
    //   return {
    //     error: ClickError.BadRequest,
    //     error_note: "Product not found",
    //   };
    // }

    // if (parseInt(amount) !== product.price) {
    //   return {
    //     error: ClickError.InvalidAmount,
    //     error_note: "Incorrect parameter amount",
    //   };
    // }

    // const transaction = await repo.getById(transId);
    // if (transaction && transaction.status === TransactionStatus.Canceled) {
    //   return {
    //     error: ClickError.TransactionCanceled,
    //     error_note: "Transaction canceled",
    //   };
    // }

    const time = new Date().getTime();

    // await repo.create({
    //   id: transId,
    //   user_id: userId,
    //   product_id: productId,
    //   status: TransactionStatus.Pending,
    //   create_time: time,
    //   amount,
    //   prepare_id: time,
    // });


    await repo.create({
      id: transId,
      user_id: userId,
      product_id: "",
      status: TransactionStatus.Pending,
      create_time: time,
      amount,
      prepare_id: time,
    });





    // ... remaining logic ...
    return {
      click_trans_id: transId,
      merchant_trans_id: userId,
      merchant_prepare_id: time,
      error: ClickError.Success,
      error_note: "Success",
    };
  };
}

function completeService(repo, userRepo, productRepo) {
  return async function (data) {
    const {
      click_trans_id: transId,
      service_id: serviceId,
      merchant_trans_id: userId,
      product_id: productId,
      merchant_prepare_id: prepareId,
      amount,
      action,
      sign_time: signTime,
      sign_string: signString,
      error,
    } = data;

    const signatureData = {
      transId,
      serviceId,
      userId,
      prepareId,
      amount,
      action,
      signTime,
    };

    const checkSignature = checkClickSignature(signatureData, signString);
    if (!checkSignature) {
      return {
        error: ClickError.SignFailed,
        error_note: "Invalid sign",
      };
    }

    if (parseInt(action) !== ClickAction.Complete) {
      return {
        error: ClickError.ActionNotFound,
        error_note: "Action not found",
      };
    }

    // const user = await userRepo.getById(userId);
    // if (!user) {
    //   return {
    //     error: ClickError.UserNotFound,
    //     error_note: "User not found",
    //   };
    // }

    // const product = await productRepo.getById(productId);
    // if (!product) {
    //   return {
    //     error: ClickError.BadRequest,
    //     error_note: "Product not found",
    //   };
    // }

    // const isPrepared = await repo.getByFilter({
    //   prepare_id: prepareId,
    // });
    // if (!isPrepared) {
    //   return {
    //     error: ClickError.TransactionNotFound,
    //     error_note: "Transaction not found",
    //   };
    // }

    // const isAlreadyPaid = await repo.getByFilter({
    //   userId,
    //   productId,
    //   status: TransactionStatus.Paid,
    // });
    // if (isAlreadyPaid) {
    //   return {
    //     error: ClickError.AlreadyPaid,
    //     error_note: "Already paid for course",
    //   };
    // }

    // if (parseInt(amount) !== product.price) {
    //   return {
    //     error: ClickError.InvalidAmount,
    //     error_note: "Incorrect parameter amount",
    //   };
    // }

    // const transaction = await repo.getById(transId);
    // if (transaction && transaction.status === TransactionStatus.Canceled) {
    //   return {
    //     error: ClickError.TransactionCanceled,
    //     error_note: "Transaction canceled",
    //   };
    // }

    const time = new Date().getTime();

    // if (error < 0) {
    //   await repo.updateById(transId, {
    //     status: TransactionStatus.Canceled,
    //     cancel_time: time,
    //   });

    //   return {
    //     error: ClickError.TransactionNotFound,
    //     error_note: "Transaction not found",
    //   };
    // }

    // await repo.updateById(transId, {
    //   status: TransactionStatus.Paid,
    //   perform_time: time,
    // });

    return {
      click_trans_id: transId,
      merchant_trans_id: userId,
      merchant_confirm_id: time,
      error: ClickError.Success,
      error_note: "Success",
    };
  }
}

module.exports = function () {
  return {
    prepare: prepareService(transactionRepo, userRepo, productRepo),
    complete: completeService(transactionRepo, userRepo, productRepo),
  };
};
