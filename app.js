var express = require('express');

var hostname = 'localhost';
var port = 3000;

// routes
var loginRouter = require('./routes/login');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/login', loginRouter);

// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Server reachable at http://"+ hostname +":"+port);
});

module.exports = app;
