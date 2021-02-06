symbols = "";
stocks = [];
state = "g"

status_ = {
    g: {
        h: 9999999,
        l: 0
    },
    l: {
        l: -9999999,
        h: 0
    }
}



$(document).ready(function() {

    load(0, 10000000)

    setInterval(() => {
        //console.log(status_);
        load(status_[state].l, status_[state].h);
    }, 60 * 1000);

    setInterval(() => {
        //https://chami-cors.herokuapp.com/
        //https://aldrin-cors.herokuapp.com/
        $.get("https://aldrin-cors.herokuapp.com/http://query1.finance.yahoo.com/v7/finance/quote?symbols=" + symbols, function(data, status) {
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

            console.log(stocks);
        });
    }, 1000)

});

function changeState(s) {
    state = s;
}



function load(l, h) {

    $.get("/core?l=" + l + "&h=" + h + "&s=50", function(data, status) {
        symbols = data.join(",")
        ht = ""
        data.forEach(s => {

            ht = ht +
                "<tr>" +
                "<td id=" + s + "_symbol class='zui-sticky-col'></td>" +
                "<td id=" + s + "_price ></td>" +
                "<td id=" + s + "_change ></td>" +
                "<td id=" + s + "_percentage></td>" +
                "</tr>"
        });
        $("#tb").html(ht);
    });


}

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
        htm = htm +
            "<tr>" +
            "<td id=" + s + "_symbol class='zui-sticky-col'></td>" +
            "<td id=" + s + "_price ></td>" +
            "<td id=" + s + "_change ></td>" +
            "<td id=" + s + "_percentage></td>" +
            "</tr>"
    });
    $("#tb").html(htm);
    updateTable();

}

//Comparer Function    
function GetSortOrder(prop, t) {

    return function(a, b) {
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
        $("#" + stock.symbol + "_price").html(stock.price.toFixed(3));
        $("#" + stock.symbol + "_change").html(stock.change.toFixed(3));
        $("#" + stock.symbol + "_percentage").html(stock.percentage.toFixed(2) + "%");
        if (stock.percentage < 0) {
            $("#" + stock.symbol + "_percentage").css('color', 'red');
        } else {
            $("#" + stock.symbol + "_percentage").css('color', 'green');
        }
    });



}