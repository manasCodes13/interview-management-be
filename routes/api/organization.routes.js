// registerController
const express = require("express");
const router = express.Router();
const { createOrgaization } = require("../../controllers/organization");

router.post("/create", createOrgaization);

module.exports = router;
