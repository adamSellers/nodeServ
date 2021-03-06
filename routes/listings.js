var pg = require('pg');
var conString = process.env.DATABASE_URL;

exports.startScreen = function(req, res) {
	res.json({message: 'you made it to the app, good for you!'});
};

exports.findAll = function(req, res) {
    var results = [];

    //going to setup client connection to postgres
    pg.connect(conString, function(err, client, done) {

	//handle connection errors first
		if (err) {
		  	done();
		  	console.log(err)
		    return res.status(500).json({ success: false, data: err});
	  	}

	  //do the SQL bit

	 	var query = client.query('SELECT id, Bath__c, Beds__c, CreatedDate, Description__c, Information__c, Mobile_Image__c, Name, Parking__c, Property_Id__c, RPP_Market_Value__c, Sale_Date__c, Sale_Price__c, Street__c, Suburb__c, Type__c FROM salesforce.Listing__c order by id ASC');

	  	//stream results back one at a time
	  	query.on('row', function(row) {
  			results.push(row);
  		});
  		//after all data is returned, close connection and return results
  		query.on('end', function() {
	  		done();
	  		return res.json(results);
  		});
	});
};

exports.updateListing = function(req, res) {
    var listingId = req.params.listingId;
    var results = [];

    var jssaleprice = req.body.sale_price__c;
    var jssaledate = req.body.sale_date__c;

    console.log('saleprice is: ' + jssaleprice + ' and saledate is: ' + jssaledate);
    console.log('listing id is: ' + listingId);

   //connect to the DB
    pg.connect(conString, function(err, client, done) {

	//handle connection errors first
		if (err) {
		  	done();
		  	console.log(err)
		    return res.status(500).json({ success: false, data: err});
	  	}

	  	//SQL query to update data
	  	client.query('UPDATE salesforce.Listing__c SET sale_price__c = ($1), sale_date__c = ($2) WHERE id = ($3)', [jssaleprice, jssaledate, listingId]);
	  	//query back the data set
	 	var query = client.query('SELECT id, Bath__c, Beds__c, CreatedDate, Description__c, Information__c, Mobile_Image__c, Name, Parking__c, Property_Id__c, RPP_Market_Value__c, Sale_Date__c, Sale_Price__c, Street__c, Suburb__c, Type__c FROM salesforce.Listing__c WHERE id = ($1)', [listingId]);

	  	//stream results back one at a time
	  	query.on('row', function(row) {
  			results.push(row);
  		});
  		//after all data is returned, close connection and return results
  		query.on('end', function() {
	  		done();
	  		return res.json(results);
  		});
	});
};