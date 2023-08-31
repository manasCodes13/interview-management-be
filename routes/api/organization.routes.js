// registerController
const express = require("express");
const router = express.Router();
const { createOrgaization } = require("../../controllers/organization");
const verifyToken = require("../../middleware/verifyToken");

router.post("/create", verifyToken, createOrgaization);

module.exports = router;
