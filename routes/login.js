var express = require('express');
var router = express.Router();
var server = require('../db');

module.exports = router;

router.get('/', function(req, res, next) {
	let login = req.body.loginName;
	server.db.collection('users').findOne({ 
	 	$or: [{ username: login },{ email: login }], 
		password: req.body.password },
	(err, resp) => {
		if(err) throw err;
		if(resp)
		{
			return res.json({ username : resp.username });
		}
		else
			return res.json({});
	});
});