var express = require('express');
var app = express();
var fs = require("fs");
var Twit = require('twit');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



var T = new Twit({
        consumer_key:           'wv3ds5CXa6rl5PmZmDLEUGe9p',
        consumer_secret:        'VtPiQ6xJ9xU9u3X86GR3YaWhAI9roHGKtEXYm7TAU58Vx9xUF4',
        access_token:           'V2QtXcLNeKggKjLYVa5yCA29ZvrqKqECQWS8NR2',
        access_token_secret:    'cPnRK39salFSWjhtTwu502kLT5oD7Irzmj7tDpXZGDa82'
});


app.post('/getPaperTweets', getPaperTweets);


function getPaperTweets(request, response) {
    var searchParam = 'paper';

    console.log("Searching for " + "\"" + searchParam + "\"");

    var params = {
        q: searchParam,
        lang: 'en',
        locale: 'en',
        count: 1
    }

    T.get('search/tweets', params, function(err, data) {
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            //console.log(tweets[i].user.screen_name + ": " + tweets[i].text);
            //console.log(tweets[i]); // displays the whole object returned from Twitter
            var result = {tweets: tweets[i].text,
                        user: tweets[i].user.screen_name};
        }
        response.json(result);
        //console.log(result);
    });
}



app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/inventory', function(request, response) { 
 response.render('pages/inventory')
});

app.get('/inventory/colors', function(request, response) {
  response.render('pages/colors')
});

app.get('/inventory/sizes', function(request, response) {
  response.render('pages/sizes')
});

app.get('/login', function(request, response) {
  response.render('pages/login')
});

app.get('/admin', function(request, response) {
  response.render('pages/admin')
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});







                   
                   

    




