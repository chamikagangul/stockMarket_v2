var express = require('express');
var router = express.Router();
let Core = require("../core/core")

let core = new Core();
/* GET home page. */
router.get('/', function(req, res, next) {
    core.makeList();
    core.filter();
    core.rankByPercentage();
    res.send(core.DATA_array.slice(0,100));
});

module.exports = router;
