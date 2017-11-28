var express = require('express');
var app = express();
var fs = require("fs");
var router = app.Router();


var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://fvwuefqfasxzrd:2c6264dcf58356cb79f1ea31dba32d6409350cd633eebc794edea37fd7997816@ec2-50-19-86-17.compute-1.amazonaws.com:5432/d2ej2fk1d18hm9";




app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/inventory', function(request, response) {
    
  getPerson(request, response);
    
 // response.render('pages/inventory')
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


router.get('/inventory', function(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM inventory', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});



module.exports = router;
                   
                   

    




