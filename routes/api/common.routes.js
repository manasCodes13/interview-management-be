// registerController
const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const { updateUserDetails, getUserDetails, getTeammates } = require("../../controllers/common");

router.put("/updateUser", verifyToken, updateUserDetails);
router.get("/getUserDetails", verifyToken, getUserDetails);
router.get("/getTeammates", verifyToken, getTeammates)

module.exports = router;
