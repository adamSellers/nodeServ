var express = require('express');
var bodyParser = require('body-parser');
	listings = require('./routes/listings');



var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', listings.startScreen);
app.get('/listings', listings.findAll);
app.put('/listings/:listingId', listings.updateListing);

app..listen(process.env.PORT || 3000);
console.log('Listening on port whatever...');