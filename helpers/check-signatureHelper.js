const crypto = require("crypto");

const environments = require("../config/environments");

const checkClickSignature = (data, signString) => {
  const {
    transId,
    serviceId,
    userId,
    merchantPrepareId,
    amount,
    action,
    signTime,
  } = data;

  const CLICK_SECRET_KEY = environments.CLICK_SECRET_KEY;

  const prepareId = merchantPrepareId || "";

  const signature = `${transId}${serviceId}${CLICK_SECRET_KEY}${userId}${prepareId}${amount}${action}${signTime}`;

  const signatureHash = crypto
    .createHash("md5")
    .update(signature)
    .digest("hex");
  // console.log("signatureHash : ", signatureHash)
  console.log("signString : ", signString)

  return signatureHash === signString;
};

module.exports = { checkClickSignature }
