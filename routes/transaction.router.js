const express = require("express");
const transactionService = require("../services/transaction");

const router = express.Router();
const { prepare, complete } = transactionService()

router.post("/prepare", async function (req, res, next) {

    try {
        const data = req.body;
        console.log(data)

        const result = await prepare(data)
        console.log(result);

        res.set({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        }).send(result);
    } catch (err) {
        next(err);
    }
});

router.post("/complete", async function (req, res, next) {
    try {
        const data = req.body;
        const result = await complete(data);

        res.set({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        }).send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
