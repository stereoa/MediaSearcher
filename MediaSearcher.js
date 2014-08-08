/*
      MediaSearcher
      By Geoffrey Hibbert
      -------------------------------------------
      |    Gets and displays results for media  |
      |  from several sources and allows them   |
      |  to be added to a download client like  |
      |  nzbdrone headphones or couchpotato     |
      -------------------------------------------
 */
function search(query) {
    $("#results-table").show();

    //Gets TV + Movies from OMDB
    $.getJSON("http://www.omdbapi.com/?s=" + $("#search-text").val(), function (omdbResults) {
        parseResults(omdbResults);
    });


}

function parseResults(omdbResults){
    /*  loop through each result
     build api command
     build row
     */
    var tbl_body = "<tr><td> </td><td> </td><td> </td><td> </td><td> </td></tr>";
    $.each(omdbResults.Search, function (key, item) {
        $.ajax({
            async: false,
            url: "http://www.omdbapi.com/?i=" + item.imdbID,
            dataType: "json",
            success: function(itemData) {
                //determine if its a movie/tv show otherwise return (music will be handled with diff api)
                if ((itemData.Type != "movie") && (itemData.Type != "series")) return true;
                var tbl_row = "";
                var posterURL = itemData.Poster.split("@@")[0] + "@@._V1_SX100.jpg";
                tbl_row += "<td><img src=\'" + itemData.Type + ".png\'</td>";
                tbl_row += "<td><img src=\'" + posterURL + "\'</td>";
                //get poster/plot
                tbl_row += "<td>" + itemData.Title + "</td>";
                tbl_row += "<td>" + itemData.Year + "</td>";
                tbl_row += "<td><img src=\'add.png\'</td>";
                tbl_body += "<tr>" + tbl_row + "</tr>";
            }
        });
    });
    $("#results-table tbody").html(tbl_body);
}
function addToService(type, id) {

}
$(document).ready(function () {
    $("#search-button").bind("click", search);
    $("#results-table").hide();
});
