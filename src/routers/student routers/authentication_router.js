const express = require("express")
const router = express.Router()

const { signin } = require("../../controller/student controller/authentication controller/signin_controller")
const { signup, check_duplicate_email } = require("../../controller/student controller/authentication controller/signup_controller")
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/check_email", check_duplicate_email);


module.exports = router;