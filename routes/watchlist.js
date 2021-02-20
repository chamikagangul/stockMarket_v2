var express = require('express');
var router = express.Router();

const WatchList = require('../models/watchlist');

/* GET home page. */
router.get('/add', async function (req, res, next) {
    res.render('addWatchlist');
});

router.get('/', async function (req, res, next) {
    const wl = await WatchList.query()
        .where('id', '=', 1)
    console.log(wl[0].watchlist.wl);
    res.send(wl[0].watchlist.wl)
});

router.post('/add', async function (req, res, next) {
    WL_list = req.body["wl[]"] ;
    if (typeof WL_list === 'string' || WL_list instanceof String){
        WL_list = [WL_list]
    }
    const INST = await WatchList.query().update({
        watchlist: { "wl": WL_list}
    }).where('id', '=', 1);
    console.log(INST)
    res.status(200);
    res.end();
});

module.exports = router;
