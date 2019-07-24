var config = require('./config');

const mongo = require('mongodb').MongoClient
const url = `mongodb+srv://${config.dbuser}:${config.dbpass}@clusterkazay-oikx8.mongodb.net/test?retryWrites=true`;

mongo.connect(url, (err, client) => {
	if(err) throw err;
	
	console.log("Connected to `" + config.dbname + "`!");
	const db = client.db(config.dbname);

	exports.db = db;
});