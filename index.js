var express = require('express');
var app = express();
var fs = require("fs");
var Twit = require('twit');
var http = require('http');
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



var TwitterKeys = new Twit({
        consumer_key:           'wv3ds5CXa6rl5PmZmDLEUGe9p',
        consumer_secret:        'VtPiQ6xJ9xU9u3X86GR3YaWhAI9roHGKtEXYm7TAU58Vx9xUF4',
        access_token:           '1525279621-V2QtXcLNeKggKjLYVa5yCA29ZvrqKqECQWS8NR2',
        access_token_secret:    'cPnRK39salFSWjhtTwu502kLT5oD7Irzmj7tDpXZGDa82'
});


function searchTwitter(request, response) {

    var parameters = {
        q: 'paper',
        lang: 'en',
        locale: 'en',
        count: 100
    }

    TwitterKeys.get('search/tweets', parameters, function(err, data) {
        
        if (err){
            console.log(err);
        }
        
        var tweets = data.statuses;
        
        for (var i = 0; i < tweets.length; i++) {
            var message = {tweets: tweets[i].text,
                        user: tweets[i].user.screen_name};
        }
        response.json(message);
    });
}



app.get('/', function(request, response) {
    app.post('/searchTweets', searchTwitter);
  response.render('pages/index')
});

app.get('/inventory', function(request, response) { 
 response.render('pages/inventory')
});

app.get('/checkout', function(request, response) {
    getInfo(request, response);
 // response.render('pages/checkout')
});

app.get('/thankyou', function(request, response) { 
 response.render('pages/thankyou')
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



function getInfo(request, response) {
    var getUrl = url.parse(request.url, true);
    var type = getUrl.query.type;
    
    var amount = Number(getUrl.query.amount);
    var color = getUrl.query.color;

    calculateRate(response, type, amount, color);
}


function calculateRate(response, type, amount, color) {
    var cost = 30 * amount;
    
    
    
    var amount = amount.toString();
    
    var package = {type: type, amount: amount, cost: cost, color: color};

    response.render('pages/checkout', package);
}
                   
                   

    




