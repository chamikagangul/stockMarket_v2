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
                count++;
                if(count%100==0){
                    console.log(count);
                }
                
            })
        }catch{
            console.log(s);
        }
    },1)
}

var iterifyArr = function (arr) {
    var cur = 0;
    arr.next = function () {
        if (++cur >= this.length) {
            cur = 0
            console.log("End of Array")
        }
        return this[cur];
    }
    arr.current = function () { return this[cur] };
    return arr;
};