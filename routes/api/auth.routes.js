// registerController
const express = require("express");
const router = express.Router();
const {
  registerController,
  verifyOtp,
  resendOtp,
  login,
} = require("../../controllers/auth");
const verifyToken = require("../../middleware/verifyToken");

router.post("/register", registerController);
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOtp);
router.post("/login", login);

router.get("/testAuth", verifyToken, (req, res) => {
  res.status(200).json({ message: "authenticated" });
});

module.exports = router;
