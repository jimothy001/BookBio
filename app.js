//..................initialize required modules
var express = require('express'); //OLD
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');
var errorhandler = require('errorhandler');
var Worldcat = require('./Worldcat');

//geocoder module
var geocodeprovider = 'opencage';
var httpAdapter = 'https';
var extra = 
{
	apiKey: 'feb68a090bd9a0fde7e4e87086f34c38',
	formatter: 'geojson'
};
var geocoder = require('node-geocoder')(geocodeprovider, httpAdapter, extra);

//create server
var app=express();
var http=require('http');
var server=http.createServer(app);

app.get("/", function(req, res) {
  res.redirect("/index.html");
});

app.use(methodOverride());

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(serveStatic(process.cwd()+'/public'));
var serve = serveStatic('public', {'lesson1':['lesson1.html']});

app.use(errorhandler({
	dumpExceptions: true,
	showStack: true
}));

server.listen(process.env.PORT || 6789);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MONGO DB
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var mongo = require('mongodb'),
	  MongoServer = mongo.Server,
	  Db = mongo.Db,
	  ObjectID = mongo.ObjectID,
	  uri = process.env.MONGOLAB_URI || 'localhost';

//.................open a connection to the mongodb server
var mdbserver = new MongoServer(uri, 27017, {auto_reconnect: true});
//.................ask the server for the database named "DBASE" this databse will be created if it doesn't exist already
var db = new Db('BBM', mdbserver,{safe:true});


//.................get or create a collection in cubeDB to store objects
//global variable that will be set to the object collection as soon as it is created or returned from the database
var GEO=null;
//.................open the database
db.open(function(err, db) {
  if(!err) 
  {
  	//if all went well [that is mongoDB is alive and listening]
    console.log("We are connected to mongoDB");
    //create a collection named theCollection and if it succeeds set the global variable theCollection to 
    //point to the newly created or opened collection
    db.createCollection(
    	'GEO', 				//name of collection to open
    	{safe:false}, 					//unsafe mode, if the collection already exists just give us the existing one
    	function(err, collection) {		//this function is called as soon as the databse has either found or created a collection with the requested name
    		GEO=collection;	//set the global variable theCollection to the newly found collection
    });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SOCKET
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//initialize socket.io to listen to the same server as express
var io = require('socket.io').listen(server);
io.set('log level', 1);    //reduce the amount of debugging output written to the console

//list of online users
var users={};   
//current color
var color="#000000";       
//a dummy counter used in order to generate incremental unique user ids
var count=1;     

//get all the user shared data excluding one user (usefull when we want to emit the current state of all other users to a single user)
function getUsersPackage(_excluded) {
	var pack={};
	for (var i in users) {
		if (users[i]==_excluded) continue;
		pack[i]=users[i].sharedData;
	}

	return pack;
}

//each time we receive a connection from the user this callback function is executed
//the socket parameter is the newly created socket object that encapsulates the new connection
//there is one socket object for each connected user
io.sockets.on('connection', function (socket) {
	//attach a custom user object to the socket
	socket.user={"sharedData":{}};
	socket.user.id=""+count;	//assign a unique id to the user
	count++;

	socket.user.socket=socket;	//assign the socket to hte user so that each user knows her connection conduit
	
	socket.user.address = socket.id;
	socket.user.wcquery = {};
	socket.user.wcquerydata = [];
	socket.user.wcrecord = 1;
	socket.user.geoqueries = [];

	users[socket.user.id]=socket.user; //register the new user to the list of users

	socket.broadcast.emit('userentered', { "id": socket.user.id });	//broadcast the new user is to all other users except the one that just connected
	socket.emit('welcome', { "id": socket.user.id, "users":getUsersPackage(socket.user), "color":color }); //welcome the new user and send her the package of the current state of all other users

	//this event is automatically fired when a user dsconnects
	socket.on('disconnect', function () {
	  socket.broadcast.emit('userleft', {"id":socket.user.id});	//notify all other users that this socket's user left
	  badids.push(socket.id);

	  delete users[socket.user.id];    //delete the user from the list
	});

	//pushes geo queries from client bibliographic data to list that is checked against db
	//for each non-match with db, geocoder is queried and results are then added to db to lighten load on geocoder (okay per ODbL)
	socket.on('QueryGeo', function(_data)
	{
		if(_data.queries)
		{
			var queries = _data.queries;

			for(var i in queries)
			{
				queries[i].id = socket.id;
				geoqueries.push(queries[i]);
			}
		}
	});


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//WorldCat Search
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	socket.on('SearchQueryInitiated', function(query)
	{
		console.log('SearchQueryInitiated');

		if (query.length != 0)
		{
			var id = socket.user.id;

			var q = {};

			q.query = query;
			q.data = [];
			q.id = socket.id;
			q.output = {};
			q.position = 1;

			wcqueries.push(q);

			Search();
		} 
		else 
		{
			console.log('empty search dude');
		}
	});

});

var wcqueries = [];

function Search()
{
	var query = wcqueries[0].query;
	var position = wcqueries[0].position;

	Worldcat.search(query, position).then(function (data)
	{	
		for(var i in data)
		{
			wcqueries[0].data.push(data[i]);
		}

		if(data.length > 99 && wcqueries[0].position < 100) 
		{
			wcqueries[0].position += 100;
			Search();
		}
		else SearchResults();
	});
}

function SearchResults()
{
	var name = Worldcat.createNameFromQuery(wcqueries[0].query);
	var output = 
	{
		'name' : name,
		'data' : wcqueries[0].data
	}

	wcqueries[0].output = output;

	ResultsToClient();
}

//send results to client
function ResultsToClient()
{
	var id = wcqueries[0].id;

	if (io.sockets.connected[id]) //if client is connected
	{
		io.sockets.connected[id].emit('SearchQueryResult', wcqueries[0].output);
	}
	else console.log("can't send to client because client is not connected");

	WCReset();
}

function WCReset()
{
	wcqueries.splice(0,1); //one down, x to go...
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GEOGRAPHY
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var geoquery = true; //timing device for checking DB, not sure if this is necessary
var geoqueries = []; //queries from users, check to see if they are already in DB
var badids = [];

//for timing asynchronous db and geocoder operations
function GeoReset()
{
	geoqueries.splice(0,1); //one down, x to go...
	geoquery = true; //ready to check db again
	if(geoqueries.length < 2) console.log("geoqueries is almost empty");
}

function GeoClean(id)
{
		for(var i in geoqueries)
		{
			/*for(var j in badids)
			{
				if(geoqueries)
			}*/

			if(geoqueries[i].id == id)
			{ 
				
				if(geoqueries.length > 1) geoqueries.splice(i, i+1);
				//else GeoReset();
			}
		}

	geoquery = true;
	console.log("GeoClean: " + geoqueries.length);
}

//send results to client
function GeoToClient(id, data)
{
	if (io.sockets.connected[id]) //if client is connected
	{
		io.sockets.connected[id].emit('_QueryGeo', data); 
	}
	else
	{ 
		GeoClean(id);
		console.log("can't send to client because client is not connected");
	}

	GeoReset();
}

//check db, if no results query OpenCage and then add results to db
function GeoQuery()
{	
	//don't allow this code to be executed if we're still waiting for a response from the db.
	if(geoquery == true && geoqueries.length > 0)
	{
		geoquery = false;
		var id = geoqueries[0].id; //client's socket id number
		var data = {}; //clients geo data

		//Check db for existing geocodes //could give multiple results
		GEO.find({searchterm: geoqueries[0].place}).toArray(function(err, docs) 
		{	
			if(!err)
			{
				if(docs.length > 0) //if docs are found
				{	
					data.addresses = geoqueries[0].addresses; //client's collection / edition addresses
					data.city = docs[0].city;
					data.territory = docs[0].territory;
					data.country = docs[0].country;
					data.lt = docs[0].lt;
					data.lg = docs[0].lg;

			    	GeoToClient(id, data); //send results to client
				}
				else //if searchterm is not in db
				{
					//geoquery = true; //this really speeds things up but I'm not sure how well it works with multiple clients 

					if(geoqueries.length > 0 && geoqueries[0].place && geoqueries[0].place != "" && geoqueries[0].place != null)
					{
						var gq = geoqueries[0];

						//query OpenCage and add results to db //sometimes returns undefined for city
						geocoder.geocode(gq.place, function(err, res)
						{ 
							//console.log("response from geocoder");

							if(!err) 
							{
								//if there are matches found
								if(res.length > 0)
								{
									var nocity = true;

									//run through until you can...
									for(var i in res)
									{
										//...make sure that you're giving a city and not just a region //***Continue to work with how this is defined.
										//e.g.: Cape Town SA vs. Cape Town USA
										//if(res[i].city || res[i].state)
										//{
											data.searchterm = gq.place;
											data.city = res[0].city;
											data.territory = res[0].state;
											data.country = res[0].country;
											data.lt = res[0].latitude;
											data.lg = res[0].longitude;

											//inserts data if there is no existing item that matches query, otherwise just updates it
											var dbquery = {searchterm: gq.place, city: data.city, territory: data.territory, country: data.country};
											GEO.update 
											(
												dbquery,
												data,
												{upsert: true}, 
												function(err, result) 
												{				
													if (!err) console.log("updated / inserted " + data.city + " to DB");
												}
											);

											data.addresses = gq.addresses; //client's collection / edition addresses

											GeoToClient(id, data); //send results to client

											nocity = false;
											break;
										//}
									}

									if(nocity == true) GeoReset(); //***Develop a client response for no cities in OpenCage associated with search term
								}
								else //if there are no geocodes associated with search term
								{
									var err = "OpenCage has no geocodes for" + gq.place + ". Sorry. :(";
									data.addresses = gq.addresses;
									data.err = err;
									GeoToClient(id, data); //send results to client
								}
							}
							else //if OpenCage has an error
							{
								console.log("open cage error: " + err + " place: " + gq.place);
								data.err = err; //read errors on client side
								GeoToClient(id, data); //send results to client
							}
						});
					}
					else
					{ 
						console.log("something is wrong with place");
						GeoReset();
					}
				}
		   	}
	    	else //if MongoDB has an error
	    	{	
	    		console.log("mongo error: " + err);
	    		data.err = err; //read errors on client side
	    		GeoToClient(id, data); //send results to client
	    	}
		});
	}
}
setInterval(GeoQuery, 50); //arbitrary rate of repetition


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OUTMODED
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*


socket.on('SearchQueryInitiated', function(query)
{
	console.log('SearchQueryInitiated');

	if (query.length != 0){
		Worldcat.search(query).then(function (data){
			var name = Worldcat.createNameFromQuery(query);
			var output = {
				'name' : name,
				'data' : data
			}
			socket.emit('SearchQueryResult', output);
			console.log(data);
		});
	} else {
		console.log('empty search dude');
	}
});



*/
