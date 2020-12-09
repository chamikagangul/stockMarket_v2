symbols = "";
$(document).ready(function () {
    load(10);
    setInterval(() => {
        $.get("https://chami-cors.herokuapp.com/http://query1.finance.yahoo.com/v7/finance/quote?symbols=" + symbols, function (data, status) {
            stocks = JSON.parse(data);
            stocks.quoteResponse.result.forEach(stock => {
                
                $("#"+stock.symbol+ "_symbol").html(stock.symbol);
                $("#"+stock.symbol+ "_open").html(stock.regularMarketOpen);
                $("#"+stock.symbol+ "_price").html(stock.regularMarketPrice);
                $("#"+stock.symbol+ "_percentage").html(stock.regularMarketChangePercent);
               
            });
           
            console.log(stocks);
        });
    }, 1000)
});

function load(p){
    $.get("/core/"+p, function (data, status) {
        symbols = data.join(",")
        ht = ""
        data.forEach(s => {
            ht = ht
                + "<tr>"
                + "<td id=" + s + "_symbol ></td>"
                + "<td id=" + s + "_open ></td>"
                + "<td id=" + s + "_price ></td>"
                + "<td id=" + s + "_percentage></td>"
                + "</tr>"
        });
        $("#tb").html(ht);
    });
}
