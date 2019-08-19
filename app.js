var express = require('express');

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

app.listen(3000, () => console.log('Server running on port 3000'))

module.exports = app;
