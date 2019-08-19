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
			let previewUrl = '';

			mailer(resp).then((res) => previewUrl = res);
			return res.json({ previewUrl : previewUrl, found : true });
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
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Ringiot support" <foo@example.com>', // sender address
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