var express = require('express');
var logger = require('morgan');
var randomstring = require('randomstring');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var message = require('./routes/message');

// setup telegram client with webhook
var client = require('./client');
var webhookToken = process.env.WEBHOOK_TOKEN || randomstring.generate(16);
client.setWebhook(process.env.BASE_URL + '/' + webhookToken);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// handle requests
app.use('/' + webhookToken, message);
app.use('/', index);

app.get('/jo',(req,res)=>{
  res.send('<h1>hello :)</h1>')
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: err
	});
});

module.exports = app;
