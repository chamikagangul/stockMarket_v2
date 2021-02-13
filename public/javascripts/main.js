symbols = "";
stocks = [];
watchlist = []
$(document).ready(function() {

   

    load(0, 10000000)

    
    
    watchlist =JSON.parse(getCookie("watchlist") | "[]");


    setInterval(() => { 
        //https://chami-cors.herokuapp.com/
        //https://aldrin-cors.herokuapp.com/
        $.get("https://aldrin-cors-1.herokuapp.com/http://query1.finance.yahoo.com/v7/finance/quote?symbols=" + symbols, function(data, status) {
            //stocks_ = JSON.parse(data);

            stocks_ = data;
            stocks = []
            stocks_.quoteResponse.result.forEach(stock => {
                s = {
                    "symbol": stock.symbol || 0,
                    "price": stock.regularMarketPrice || 0,
                    "change": stock.regularMarketChange || 0,
                    "percentage": stock.regularMarketChangePercent || 0
                }

                stocks.push(s);
            });
            updateTable();
            console.log(stocks)
        });
    }, 1000)

});


// function loadGainOrLoss(l,h) {
//     $.get("/core/gainorloss?l=" + l+"&h="+h+"&s=30", function (data, status) {
//         symbols = data.join(",")
//         ht = ""
//         data.forEach(s => {

//             ht = ht
//                 + "<tr>"
//                 + "<td id=" + s + "_symbol class='zui-sticky-col'></td>"
//                 + "<td id=" + s + "_price ></td>"
//                 + "<td id=" + s + "_change ></td>"
//                 + "<td id=" + s + "_percentage></td>"
//                 + "</tr>"
//         });
//         $("#tb").html(ht);
//     });
// }

