var express = require('express');
var socket = require('./socket')
var hostname = 'localhost';
var port = 3000;

// routes
var loginRouter = require('./routes/login');
var lostpasswordRouter = require('./routes/lostpassword');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/login', loginRouter);
app.use('/lostpassword', lostpasswordRouter);

app.get('/', (req, res) => {
  res.send('HEY!')
})

let server = app.listen(3000, () => console.log('Server running on port 3000'))

socket.initSocket(server);

const io = socket.getInstance();

io.on('connection', function(socket) {
	console.log('CONNECTED');
})

module.exports = app;
