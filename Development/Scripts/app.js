//..................initialize required modules
var express = require('express'); //OLD
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');
var errorhandler = require('errorhandler');

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
	  ObjectID = mongo.ObjectID;

//.................open a connection to the mongodb server
var mdbserver = new MongoServer('localhost', 27017, {auto_reconnect: true});
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
	
	users[socket.user.id]=socket.user; //register the new user to the list of users

	socket.broadcast.emit('userentered', { "id": socket.user.id });	//broadcast the new user is to all other users except the one that just connected
	socket.emit('welcome', { "id": socket.user.id, "users":getUsersPackage(socket.user), "color":color }); //welcome the new user and send her the package of the current state of all other users

	//this event is automatically fired when a user dsconnects
	socket.on('disconnect', function () {
	  socket.broadcast.emit('userleft', {"id":socket.user.id});	//notify all other users that this socket's user left
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

	socket.on('SearchQuery', function(_data)
	{
		var query = _data;
		if (query.length != 0){
			console.log(query);
			// push to goequeries lookalike for searchquery
			// find out what pushing to geoqueries does
			// make ajax request to ocl
		}
	});

});


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

//for timing asynchronous db and geocoder operations
function GeoReset()
{
	geoqueries.splice(0,1); //one down, x to go...
	geoquery = true; //ready to check db again
}

//send results to client
function GeoToClient(id, data)
{
	if (io.sockets.connected[id]) //if client is connected
	{
		io.sockets.connected[id].emit('_QueryGeo', data); 
	}
	else console.log("can't send to client because client is not connected");

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
					//query OpenCage and add results to db //sometimes returns undefined for city
					geocoder.geocode(geoqueries[0].place, function(err, res)
					{ 
						console.log("response from geocoder");

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
									if(res[i].city || res[i].state)
									{
										data.searchterm = geoqueries[0].place;
										data.city = res[0].city;
										data.territory = res[0].state;
										data.country = res[0].country;
										data.lt = res[0].latitude;
										data.lg = res[0].longitude;

										//inserts data if there is no existing item that matches query, otherwise just updates it
										var dbquery = {searchterm: geoqueries[0].place, city: data.city, territory: data.territory, country: data.country};
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

										data.addresses = geoqueries[0].addresses; //client's collection / edition addresses

										GeoToClient(id, data); //send results to client

										nocity = false;
										break;
									}
								}

								if(nocity == true) GeoReset(); //***Develop a client response for no cities in OpenCage associated with search term
							}
							else //if there are no geocodes associated with search term
							{
								var err = "OpenCage has no geocodes for " + geoqueries[0].place + ". Sorry. :(";
								data.err = err;
								GeoToClient(id, data); //send results to client
							}
						}
						else //if OpenCage has an error
						{
							console.log(err);
							data.err = err; //read errors on client side
							GeoToClient(id, data); //send results to client
						}
					});
				}
		   	}
	    	else //if MongoDB has an error
	    	{	
	    		console.log(err);
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

//OLD SOCKET FUNCTIONS

//feeds all DC data to client in one fell swoop
socket.on('GetDC', function (_data)
{
	var data = {name: "DC", collection: DC};
	socket.emit('_GetDC', data);
});

//queries db based on typed query term from client - you have to wait for a response
socket.on('TestQueryGeoDB', function(_data)
{
	var query = _data.query + "";
	console.log(query);
	
	GEO.find({city: query}).toArray(function(err, docs) //can give multiple results
	{
		var data = {};
		if(!err)
		{
			if(docs.length > 0)
			{
				data.res = docs[0];
			}
			else
    		{
    			data.res = "not in db";
    		}
    	}
    	else
    	{
    		console.log(err);
    		data.res = err;
    	}
    	socket.emit('_QueryGeoDB', data);

    	console.log("live long"); //and prosper live long
	});
		console.log("and prosper"); //continues to execute code while it waits for mongo to respond....
});

//queries geo coder based on typed search term from client - you REALLY have to wait for a response and can only place one query at a time
socket.on('TestQueryGeo', function(_data)
{
	var query = _data.query + "";
	console.log(query);

	//Consider querying OpenCage from client side (exposed API key, unfortunately) if daily limit applies to
	//IP Addresses rather than all queries that share the same API key.
	geocoder.geocode(query, function(err, res)//should add to a queue
	{
		var data = {geo: res[0]};
		socket.emit('_TestQueryGeo', data);
	});
});

//END OLD SOCKET FUNCTIONS



var __DC = require('./DC.js');
var _DC = __DC.getDC();
var DC;


function PopulateDC(_DC) //called from db.createCollection
{
	SortDC(_DC);

	var dc = [];

	for(var i in _DC) //skeleton of WoN data to be given to the client up front
	{
		_DC[i].edition = i+1; //give "edition" or item number for structure //temp stop gap

		var _dc = {edition: _DC[i].edition, 
			year:_DC[i].year, 
			city:_DC[i].city,
			territory:"",
			country:"",
			shelf:_DC[i].shelf,
			mat:_DC[i].mat,
			format:_DC[i].format,
			folios:_DC[i].folios,
			period: _DC[i].period,
			lt:_DC[i].lt, 
			lg:_DC[i].lg, 
			lang:_DC[i].lang,
			vacc:_DC[i].vacc,
			vis:_DC[i].vis,
			ill:_DC[i].ill,
			ref:_DC[i].ref,
			note:_DC[i].note
		};

		dc.push(_dc);
	}

	return dc;
}

function SortDC(__DC)
{
	__DC.sort(function(a,b){
		if(a.year > b.year){
			return 1;
		}else if (a.year < b.year){
			return -1;
		}
		return 0;
	});
}
*/
