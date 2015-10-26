var express = require('express');
var bodyParser = require('body-parser');
	listings = require('./routes/listings');

//setup for CORS access
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};



var app = express();

app.use(allowCrossDomain);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', listings.startScreen);
app.get('/listings', listings.findAll);
app.post('/listings/:listingId', listings.updateListing);

app.listen(process.env.PORT || 3000);
console.log('Listening on port whatever...');