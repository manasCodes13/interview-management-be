const express = require('express');
const router = express.Router()
const auth = require("./auth.routes");
const org = require("./organization.routes")
const common = require("./common.routes")

router.use("/auth", auth);
router.use("/organization", org);
router.use("/common", common)

router.get('/ping', (req, res) => {
    res.send('pinging')
})

module.exports = router;