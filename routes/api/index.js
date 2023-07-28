const express = require('express');
const router = express.Router()
const auth = require("./auth.routes");

router.use("/auth", auth)

router.get('/ping', (req, res) => {
    res.send('pinging')
})

module.exports = router;