var express = require('express');
var router = express.Router();
let Core = require("../core/core")

let core = new Core();
/* GET home page. */
router.get('/:p', function(req, res, next) {

    p = req.params.p
    core.makeList();
    core.filter();
    core.rankByPercentageCustom(p);
    res.send(core.DATA_array.slice(0,100));
});

module.exports = router;
