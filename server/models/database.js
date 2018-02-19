var pg = require('pg');
var connectionString = 'postgres://pchbmthm:nmmMFFz9axgH0ZFklSCnJMeN7NtMc-mn@baasu.db.elephantsql.com:5432/pchbmthm'

var client = new pg.Client(connectionString);
client.connect();

var query = client.query(
	'CREATE TABLE jokes(id SERIAL PRIMARY KEY, joke_text VARCHAR(255) not null, joke_punchline VARCHAR(255), rating INTEGER)'
);

query.on('end', function(){
	client.end();
});