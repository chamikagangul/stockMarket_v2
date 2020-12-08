module.exports.start = async function () {

    symbols = require("../data/symbols.json")
    console.log("inside client");
    const fetch = require('node-fetch');
    count = 0;
    // symbols = symbols.slice(0,10000);
    iterifyArr(symbols);

    var Core = require("./core")
    let core = new Core();

    var query = setInterval(() => {
        s = symbols.next();
        if (s == false) {
            clearInterval(query);
        }

        fetch("http://query1.finance.yahoo.com/v7/finance/quote?symbols=" + s)
            .then(res => res.json())
            .then(data => {
                try {
                    symbol = data.quoteResponse.result[0].symbol;
                    open_ = data.quoteResponse.result[0].regularMarketOpen;
                    marketPrice = data.quoteResponse.result[0].regularMarketPrice;
                    change = data.quoteResponse.result[0].regularMarketChange;
                    changePrecentage = data.quoteResponse.result[0].regularMarketChangePercent;

                    d = {
                        "s": symbol,
                        "o": open_,
                        "p": marketPrice,
                        "c": change,
                        "cp": changePrecentage
                    }

                    core.DATA.push(d);
                } catch {
                    console.log(s);
                }

            })

    }, 1)
}

var iterifyArr = function (arr) {
    var cur = 0;
    arr.next = function () {
        if (++cur >= this.length) {
            cur = 0
            return false;
        }
        return this[cur];
    }
    arr.current = function () { return this[cur] };
    return arr;
};