function search(query) {
    //Gets TV + Movies from OMDB
    $.getJSON("http://www.omdbapi.com/?s=" + $("#search-text").val(), function (data) {
        var tbl_body = "";
        $.each(data.Search, function (key, result) {
            if ((result.Type != "movie") && (result.Type != "series")) return true;
            var tbl_row = "";
            tbl_row += "<td><img src=\'" + result.Type + ".png\'</td>";
            tbl_row += "<td>" + result.Title + "</td>";
            tbl_row += "<td>" + result.Year + "</td>";
            tbl_body += "<tr>" + tbl_row + "</tr>";
        })
        $("#results-table tbody").html(tbl_body);
    });
}
function addToService(type,id)
{

}
$(document).ready(function () {
    $("#search-button").bind("click", search);
});
