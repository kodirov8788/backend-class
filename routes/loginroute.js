const express = require('express')

// controller functions
const { loginUser } = require('./userController')

const router = express.Router()

router.post('/login', loginUser)


module.exports = router