// registerController
const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const { createProjects, getAllProjects } = require("../../controllers/projects");

router.post("/createProject", verifyToken, createProjects);
router.get("/getAllProjects/organization/:organizationId", verifyToken, getAllProjects)

module.exports = router;
