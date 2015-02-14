var UkrposhtaApi = require('ukrposhta-api').UkrposhtaApi;
var express = require('express');
var morgan = require('morgan')

var urkposhtaApiClient = new UkrposhtaApi();
var app = express();

app.use(morgan('combined'));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/tracks/:id', function (req, res) {
    urkposhtaApiClient.getBarcodeInfo(req.params.id).then(function(barcodeInfo) {
    	res.send(barcodeInfo);
    }, function(err) {
    	res.send(502, err);
    });
});

var server = app.listen(process.env.PORT || 5000, function () {
    var host = server.address().address;
    var port = server.address().port;

  	console.log('Ukrposhta JSON proxy server listening at http://%s:%s', host, port);
});
