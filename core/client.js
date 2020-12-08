module.exports.start = async function () {
    symbols = require("../data/symbols.json")
    console.log("inside client");
    const fetch = require('node-fetch');
    count = 0;
    // symbols = symbols.slice(0,10000);
    iterifyArr(symbols);
    setInterval(()=>{
        s = symbols.next();
        try{
            fetch("http://query1.finance.yahoo.com/v7/finance/quote?symbols=" + s)
            .then(res => res.json)
            .then(data => {
                console.log(count++);
            })
        }catch{
            console.log(s);
        }
    },10)
}

var iterifyArr = function (arr) {
    var cur = 0;
    arr.next = function () {
        if (++cur >= this.length) {
            cur = 0
        }
        return this[cur];
    }
    arr.current = function () { return this[cur] };
    return arr;
};