//GL
var coGL;
var gl;
var modelsToRender=[]; //models to render is a collection of things with a render funciton they could even represent arbitrary conditional group selectors
var modelsToSelect=[];  //collection of models that are selectable
var cameradistance = 50.0;
var bgcol = [0.9,0.9,0.9,1];

//SPACE
var map;
var mapmodels = [];
var time = {"start": 1440, "end": 2015};
var timemark;
var tagmodels = [];
var timemodels = [];
var offset = 2.75; //for some reason this is necessary for mapping lg to x. I don't know why.

//SOCKET
var id; //user's id for receiving data from server
var socket = io.connect(); //socket.io initialization and creation of the socket object at beginning of script
	//the queue is used in order to queue events so that they don't fire rapidly but only at set intervals.
	//this technique can be used for less critical events and they could bebatched and uploaded as a package to 
	//avoid overwhelming the server
var queue=[];//socket queue
var query; //query geographic data

//GENERAL
var ui;
var dli;
var collections = [];
var select= null;
var currentselect = null;
var unmat;
var selunmat;
var geoinfo = []; //This should be checked with each new set of bibliographic results for each new collection for to prevent redundant queries to 3rd parties.
var geoquery = [];




//remap
function Remap(val, from1, to1, from2, to2)
{
	var result = (val - from1) / (to1 - from1) * (to2 - from2) + from2;
	return result;
}

//gets geocodes for bib locations + called from collection instantiation
function QueryGeo()
{
	console.log("QueryGeo length: " + geoquery.length);
	var data = {queries: geoquery};
	queueMsg('QueryGeo', data);
	geoquery=[]; //empty the geoquery array
}

//add to geoquery que
function GeoQuery(q)
{
	var addnew = true;

	for(var i in geoquery) //eliminate redundancy
	{
		if(geoquery[i].place == q.place)
		{
			geoquery[i].addresses.push(q.addresses[0]);
			addnew = false;
			break;
		}
	}

	if(addnew) geoquery.push(q);
}

//response to queries of geographic information - called from socket.on("_QueryGeo")
function GeoResponse(r)
{
	for(var i in r.addresses)
	{
		var c = r.addresses[i].c;
		var e = r.addresses[i].e;

		collections[c].editions[e].UpdateGeo(r);
	}
}