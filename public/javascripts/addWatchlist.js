$(document).ready(function() {
    watchlist =JSON.parse(getCookie("watchlist")).join(",");
    $('#watchListTextArea').html(watchlist)
});