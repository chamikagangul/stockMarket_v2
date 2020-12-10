symbols = "";
stocks = [];
$(document).ready(function () {

    load(10);

    setInterval(() => {
        //https://chami-cors.herokuapp.com/
        $.get("http://query1.finance.yahoo.com/v7/finance/quote?symbols=" + symbols, function (data, status) {
            //stocks_ = JSON.parse(data);
            stocks_ = data;
            stocks = []
            stocks_.quoteResponse.result.forEach(stock => {
                s = {
                    "symbol": stock.symbol,
                    "price": stock.regularMarketPrice,
                    "change": stock.regularMarketChange,
                    "percentage": stock.regularMarketChangePercent
                }

                stocks.push(s);
            });
            updateTable();

            console.log(stocks);
        });
    }, 1000)
});

function logResults(json) {
    console.log(json);
}

function load(p) {
    $.get("/core/" + p, function (data, status) {
        symbols = data.join(",")
        ht = ""
        data.forEach(s => {

            ht = ht
                + "<tr>"
                + "<td id=" + s + "_symbol ></td>"
                + "<td id=" + s + "_price ></td>"
                + "<td id=" + s + "_change ></td>"
                + "<td id=" + s + "_percentage></td>"
                + "</tr>"
        });
        $("#tb").html(ht);
    });
}

function loadUp(p) {
    $.get("/core/up/" + p, function (data, status) {
        symbols = data.join(",")
        ht = ""
        data.forEach(s => {

            ht = ht
                + "<tr>"
                + "<td id=" + s + "_symbol ></td>"
                + "<td id=" + s + "_price ></td>"
                + "<td id=" + s + "_change ></td>"
                + "<td id=" + s + "_percentage></td>"
                + "</tr>"
        });
        $("#tb").html(ht);
    });
}


function sort(prop) {
    if ($(this).attr("status")) {
        $(this).attr("status", $(this).attr("status") * -1)
    } else {
        $(this).attr("status", 1);
    }
    stocks = stocks.sort(GetSortOrder(prop, $(this).attr("status")));
    htm = "";
    stocks.forEach(stock => {
        s = stock.symbol;
        htm = htm
            + "<tr>"
            + "<td id=" + s + "_symbol ></td>"
            + "<td id=" + s + "_price ></td>"
            + "<td id=" + s + "_change ></td>"
            + "<td id=" + s + "_percentage></td>"
            + "</tr>"
    });
    $("#tb").html(htm);
    updateTable();

}

//Comparer Function    
function GetSortOrder(prop, t) {

    return function (a, b) {
        if (a[prop] < b[prop]) {
            return 1 * t;
        } else if (a[prop] > b[prop]) {
            return -1 * t;
        }
        return 0;
    }
}

function updateTable() {
    stocks.forEach(stock => {
        $("#" + stock.symbol + "_symbol").html(stock.symbol);
        $("#" + stock.symbol + "_price").html(stock.price);
        $("#" + stock.symbol + "_change").html(stock.change.toFixed(3));
        $("#" + stock.symbol + "_percentage").html(stock.percentage.toFixed(2) + "%");
        if (stock.percentage < 0) {
            $("#" + stock.symbol + "_percentage").css('color', 'red');
        } else {
            $("#" + stock.symbol + "_percentage").css('color', 'green');
        }
    });
}