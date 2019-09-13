var express = require('express');
var client = require('./../client');

var router = express.Router();

router.post('/', (req, res, next) => {
	client
		.sendMessage(req.body.message.chat.id, 'Jo. '+req.body.message.text)
		.promise()
		.then(function(){
			res.json({ ok: true });
		})
		.catch(next);
});

module.exports = router;
