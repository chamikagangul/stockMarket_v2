var express = require('express');
var router = express.Router();
let Core = require("../core/core")

let core = new Core();
/* GET home page. */
router.get('/symbols/', function(req, res, next) {
    res.send(core.SYMBOLS);
});

module.exports = router;
