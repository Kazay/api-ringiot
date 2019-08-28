var express = require('express');
var router = express.Router();
var server = require('../db');
const nodemailer = require('nodemailer');

module.exports = router;

router.post('/', function(req, res, next) {
	server.db.collection('users').findOne({ 
		 email: req.body.email },
	(err, resp) => {
		if(err) throw err;
		if(resp)
		{
			console.log(resp);
			mailer(resp).then((url) => {
				return res.json({ previewUrl : url, found : true });
			});
		}
		else
		{
			console.log(resp);
			return res.json({ found : false });
		}
	});
});

// async..await is not allowed in global scope, must use a wrapper
async function mailer(resp) {
	console.log(resp.email);
	let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
		user: testAccount.user,
		pass: testAccount.pass
		}
	});

	let info = await transporter.sendMail({
		from: '"Ringiot support" <foo@example.com>',
		to: resp.email,
		subject: 'Password recovery for '+resp.username,
		text: 'Here\'s your account informations : Email '+resp.email+', Username '+resp.username+', Password '+resp.password, // plain text body
		html: '<b>Here\'s your account informations :</br><ul><li>Email : '+resp.email+'</li><li>Username : '+resp.username+'</li><li>Password : '+resp.password+'</li></ul>' // html body
	});

	console.log('Message sent: %s', info.messageId);

	let previewUrl = nodemailer.getTestMessageUrl(info);
	console.log('Preview URL: %s', previewUrl);

	return previewUrl;
}