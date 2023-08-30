const {
  ClickError,
  ClickAction,
  transactionRepo,
} = require("../enums/transaction.enum");

const { checkClickSignature } = require("../helpers/check-signature.helper");

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

    // ... remaining logic ...

    return {
      click_trans_id: transId,
      merchant_trans_id: userId,
      merchant_confirm_id: time,
      error: ClickError.Success,
      error_note: "Success",
    };
  };
}

module.exports = function (repo, userRepo, productRepo) {
  return {
    prepare: prepareService(repo, userRepo, productRepo),
    complete: completeService(repo, userRepo, productRepo),
  };
};
