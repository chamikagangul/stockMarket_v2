var express = require('express');
var router = express.Router();
let Core = require("../core/core")

let core = new Core();
/* GET home page. */
router.get('/', function(req, res, next) {
    h = parseFloat(req.query.h)
    l = parseFloat(req.query.l)
    core.makeList();
    if(parseFloat(h)>0){
        core.filterByPrecentage(l,h);
        core.rankByChange(1);
    }else{
        core.filterByPrecentage(h,l);
        core.rankByChange(-1);
    }
    
    res.send(core.getSymbolsFromArray(core.DATA_array.slice(0,30)));
});

router.get('/gainorLoss/', function(req, res, next) {

    h = parseFloat(req.query.h)
    l = parseFloat(req.query.l)
    core.makeList();
    if(parseFloat(h)>0){
        core.filterByPrecentage(l,h);
        core.rankByPercentage(1);
    }else{
        core.filterByPrecentage(h,l);
        core.rankByPercentage(-1);
    }
    res.send(core.getSymbolsFromArray(core.DATA_array.slice(0,30)));
});

module.exports = router;
