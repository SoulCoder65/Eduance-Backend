const { request } = require("express");
const express = require("express")
const router = express.Router()


const { fetchprofiledata } = require("../../controller/student controller/profile controller/fetch_profile_controller")
const { updateprofile } = require("../../controller/student controller/profile controller/update_profile_controller")
const { updatepassword } = require("../../controller/student controller/profile controller/update_password_controller")
router.post("/fetchprofile", fetchprofiledata);
router.post("/updateprofile", updateprofile);
router.post("/updatepassword", updatepassword);

module.exports = router;