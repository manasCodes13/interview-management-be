// registerController
const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const { updateUserDetails, getUserDetails } = require("../../controllers/common");

router.put("/updateUser", verifyToken, updateUserDetails);
router.get("/getUserDetails", verifyToken, getUserDetails)

module.exports = router;
