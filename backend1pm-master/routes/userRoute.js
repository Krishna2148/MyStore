const express = require('express')
const { register, verifyEmail, forgetPassword, resetPassword, signin, signout, resendVerification, getallusers, updateRole } = require('../controller/userController')
const { userCheck, validate } = require('../validation/validation')
const router = express.Router()

router.post('/register', userCheck, validate, register)
router.get('/verifyemail/:token', verifyEmail)
router.post('/forgetpassword', forgetPassword)
router.post('/resetPassword/:token', resetPassword)
router.post('/signin', signin)
router.get('/signout', signout)

router.post('/resendverification', resendVerification)
router.get(`/getuserslist`,getallusers)
router.put('/updaterole/:id',updateRole)

module.exports = router