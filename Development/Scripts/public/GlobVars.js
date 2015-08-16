//GL
var coGL;
var gl;
var modelsToRender=[]; //models to render is a collection of things with a render funciton they could even represent arbitrary conditional group selectors
var modelsToSelect=[];  //collection of models that are selectable
var cameradistance = 50.0;
var bgcol = [0.9,0.9,0.9,1];

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