function getPaperTweets() {
    var search = 'paper';

    var params = {
        search: search
    }

    $.post("/searchTweets", params, function(result) {
        if (result) {
            $("#result").append("<p>Here is the latest Tweet for \"" + search + "\".</p>");
            $("#tweets").append("<li><span style=\"font-weight: bold\">" + result.user + "</span>: " + result.tweets + "</li>");
        }
    })
}