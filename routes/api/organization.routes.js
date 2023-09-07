// registerController
const express = require("express");
const router = express.Router();
const { createOrgaization, inviteTeamMates, joinOrganization } = require("../../controllers/organization");
const verifyToken = require("../../middleware/verifyToken");

router.post("/create", createOrgaization);
router.post("/invite-teamMates", verifyToken, inviteTeamMates)
router.post("/join-organization", verifyToken, joinOrganization)

module.exports = router;
