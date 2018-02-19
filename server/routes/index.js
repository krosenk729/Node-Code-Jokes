var express = require('express');
var router = express.Router();
var path = require('path');
var { Client } = require('pg');
var client = new Client({
	connectionString: 'postgres://pchbmthm:nmmMFFz9axgH0ZFklSCnJMeN7NtMc-mn@baasu.db.elephantsql.com:5432/pchbmthm'
});
var isConnected = false;

/* Show Homepage */
router.get('/', function(request, response, next) {
	response.sendFile(path.join( __dirname, '..', '..', 'client', 'views', 'index.html' )); 
});

/* INSERT INTO DB */
// test with
//  curl --data "joke_text=test&joke_punchline=test&rating=0" http://127.0.0.1:3000/nodecode
router.post('/nodecode', function(request, response, next){
	let results = [];
	let data = {joke_text: request.body.joke_text, joke_punchline: request.body.joke_punchline, rating: request.body.rating};
	console.log('data ', data);
	if(!isConnected){
		client.connect();
		isConnected = true;
	}

	client.query('INSERT INTO jokes(joke_text, joke_punchline, rating) values($1, $2, $3)', 
		[data.joke_text, data.joke_punchline, data.rating])
		.then(()=>{
			client.query('SELECT * FROM jokes ORDER BY rating DESC, id ASC LIMIT 30',
				function(err, res){
					// client.end();
					return response.json( res.rows );
				});
		});

});

/* GET DB */
// test by visiting
// http://localhost:3000/nodecode
router.get('/nodecode', function(request, response, next){
	let results = [];
	let data = {joke_text: request.body.joke_text, joke_punchline: request.body.joke_punchline, rating: request.body.rating};
	console.log('data ', data);
	if(!isConnected){
		client.connect();
		isConnected = true;
	}

	client.query('SELECT * FROM jokes ORDER BY id DESC LIMIT 30',
		function(err, res){
			// client.end();
			return response.json( res.rows );
		});
});

/* UPDATE DB */
// test with
// curl -X PUT --data "joke_text='There are 10 kinds of people in this world'&joke_punchline='Those who know binary and those who dont'&rating=3" http://127.0.0.1:3000/nodecode/3
router.put('/nodecode/:joke_id', function(request, response, next){
	let results = [];
	let id = request.params.joke_id;
	let data =  {joke_text: request.body.joke_text, joke_punchline: request.body.joke_punchline, rating: request.body.rating};
	if(!isConnected){
		client.connect();
		isConnected = true;
	}

	client.query('UPDATE jokes SET joke_text=($1), joke_punchline=($2), rating=($3) WHERE id=($4)', 
		[data.joke_text, data.joke_punchline, data.rating, id])
		.then(()=>{
			client.query('SELECT * FROM jokes ORDER BY rating DESC, id ASC LIMIT 30',
				function(err, res){
					// client.end();
					return response.json( res.rows );
				});
		});
});

/* DELETE FROM DB */
// test with
// curl -X PUT --data "joke_text='There are 10 kinds of people in this world'&joke_punchline='Those who know binary and those who dont'&rating=3" http://127.0.0.1:3000/nodecode/3
router.delete('/nodecode/:joke_id', function(request, response, next){
	let results = [];
	let id = request.params.joke_id;
	if(!isConnected){
		client.connect();
		isConnected = true;
	}

	client.query('DELETE FROM jokes WHERE id=($1)', [id])
		.then(()=>{
			client.query('SELECT * FROM jokes ORDER BY rating DESC, id ASC LIMIT 30',
				function(err, res){
					// client.end();
					return response.json( res.rows );
				});
		});

});

module.exports = router;