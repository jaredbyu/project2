var express = require('express');
var app = express();
var fs = require("fs");


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


function getPerson(request, response) {
	

	// use a helper function to query the DB, and provide a callback for when it's done
	getPersonFromDb(function(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json(result[0]);
		}
	});
}

function getPersonFromDb(callback) {
    var id = 1;
	console.log("Getting person from DB with id: " + id);

	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT * FROM INVENTORY";
		var params = [id];

		var query = client.query(sql, params, function(err, result) {
			// we are now done getting the data from the DB, disconnect the client
			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, result.rows);
		});
	});

} // end of getPersonFromDb
                   
                   

    




