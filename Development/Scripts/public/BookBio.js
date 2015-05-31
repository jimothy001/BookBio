//GENERAL
var ui;

//GL
var coGL;
var gl;
var modelsToRender=[];
var modelsToSelect=[];
var geo = [];
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MAIN //RUNS ONCE ON PAGE LOAD
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Main()
{	
	//UI
	ui = UI();

	//GL
	coGL=COGL.init("canvas1");
	gl=coGL.gl;
	var mat1=new coGL.Material(coGL.shaders.default, {"uColor":[0.97,0.97,0.97,0.5]});//, "uTexture":0}, {"0":coGL.textures.white});//coGL.Material(coGL.shaders.normal, {"uColor":[0.9,0.8,0.8,1], "uTexture":0}, {"0":coGL.textures.white});
	var mat2=new coGL.Material(coGL.shaders.cell,{"uColor":[0.7,0.7,0.7,1]}); //, "uSpecular": [1,1,1,50.0], "uAmbient":[0.4,0.4,0.4,1], "uTexture":0}, {"0":coGL.textures.white});//coGL.textures.white
	


	//GEOGRAPHY// need to replace w/ single quad w/ texture
	
	var mapimage = "images/map_transparent_pow_2.png";
	/*var geotexture = coGL.createTextureFromFile(mapimage);
	console.log(geotexture);
	var geoshader=coGL.LoadShaderFromFiles("phong_map", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/phong_map.glsl");
	var geomat = coGL.Material(geoshader, {"uColor":[0.1,1.0,1.0,0.7], "uAmbient":[0, 0, 0, 1], "uTexture":0}, {"0":geotexture});
	var _geomesh = coGL.loadMeshFromJSON("models/mapbase.json");
	var geomesh = new coGL.Model(_geomesh, 0.0, 0.0, 0.0);
	geomesh.material = geomat;
	modelsToRender.push(geomesh);*/

	var geotexture = coGL.createTextureFromFile(mapimage, function()
	{
		console.log(mapimage);
		console.log(geotexture);
		//var geoshader=coGL.LoadShaderFromFiles("phong_map", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/phong_map.glsl");
		var geoshader=coGL.LoadShaderFromFiles("sprite", "coopGL/shaders/sprite_vs.glsl", "coopGL/shaders/sprite_fs.glsl");		
		var geomat = new coGL.Material(geoshader, {"uColor":[1.0,1.0,1.0,1.0], "uTexture":0, "uAmbient":[1,1,1,1]}, {"0":geotexture});
		console.log(geomat);
		var _geomesh = coGL.loadMeshFromJSON("models/mapbase.json");
		var geomesh = new coGL.Model(_geomesh, 0.0, 0.0, 0.0);
		geomesh.material = geomat;
		modelsToRender.push(geomesh);
	});
	


	
	

	/*for(var i=0; i<161; i++)
	{
		var _geomesh = coGL.loadMeshFromJSON("models/geo" + i + ".json");
		var geomesh = new coGL.Model(_geomesh, 0.0, 0.0, 0.0);
		geomesh.material=mat1;
		modelsToRender.push(geomesh);
		//modelsToSelect.push(geomesh);
	}*/

	coGL.enableSelectionPass(modelsToSelect);
	//coGL.enableDepthPass(modelsToSelect);
	//coGL.enableUVPass(modelsToSelect);
	//coGL.enableWNormalPass(modelsToSelect);

	var viewpoint = vec3.create();
	viewpoint[0] = 20.0;
	viewpoint[1] = 40.0;
	viewpoint[2] = 40.0;
	var targetpoint = vec3.create();
	targetpoint[0] = 2.75;
	targetpoint[1] = 0.0;
	targetpoint[2] = 15.0;
	coGL.camera.setViewPoint(viewpoint).setTargetPoint(targetpoint).setDistance(cameradistance).setFar(120.0).update();

	var light=new coGL.Camera();
	light.easeIn=0.0;
	light.setDistance(50.0).setFov(60).setAngleXY(0.5).setAngleZ(0.8).update();

	//models to render is a collection of things with a render funciton they could even represent arbitrary conditional group selectors
	var blur=false;
	var bsize=2048;
	var sharedFBO=new coGL.FBO(bsize, bsize, false);



	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//RUNS EVERY FRAME
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	coGL.addRenderingPass("final"). 
		clearColorV(bgcol). //bgcol.color
		clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT).
		camera().
		light(light).
		renderModels(modelsToRender).
		execute(function() 
		{
			if(collections.length > 0)
			{
				for(var i in collections)
				{
					coGL.shaders.defaultline.u.uColor=[0,0,0,0.2];
					coGL.shaders.defaultline.use();
					for(var j = 0; j < collections[i].editions.length; j++)
					{
						var v0 = collections[i].editions[j].v0;
						var v1 = collections[i].editions[j].v1;

						coGL.drawLines.vertex(v0);
						coGL.drawLines.vertex(v1);

						collections[i].editions[j].update();
					}
				}
				coGL.drawLines.commit();
			}
			//var plane=new coGL.Plane(coGL.mouse.point3d, coGL.mouse.normal); //could come in handy for selection of geographic features
			//plane.getMatrix(cubemodel.modelmatrix);

			//if (coGL.mouse.isOnBackground) 
			//{
			//	cubemodel.moveTo([0,0,0]);
			//}
		}).
		activate();
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//LISTENERS
	canvas1.addEventListener("mousedown", function(e) {

		if (select != null) //(e.which==1 && coGL.mouseOverObject) 
		{
			if(currentselect != null) currentselect.book.material = currentselect.emat;
			currentselect = select;
			currentselect.book.material = select.smat;

			var t = [select.x, select.y, select.z];
			coGL.camera.setTargetPoint(t);

			console.log(currentselect.smat);

			ui.citybutton.setLabel("place: " + select.place);
			ui.shelfbutton.setLabel("shelf: " + select.shelf);
			ui.matbutton.setLabel("material: " + select.bmat);
			ui.formatbutton.setLabel("format: " + select.format);
			ui.foliosbutton.setLabel("folios: " + select.folios);
			ui.periodbutton.setLabel("period: " + select.period);
			ui.yearbutton.setLabel("year: " + select.year);
			ui.langbutton.setLabel("language: " + select.lang);
			ui.vaccbutton.setLabel("verbal accretions: " + select.vacc);
			ui.visbutton.setLabel("visuals: " + select.vis);
			ui.illbutton.setLabel("illustrator: " + select.ill);
			ui.refbutton.setLabel("reference: " + select.ref);
			ui.notebutton.setLabel("note: " + select.note); //FIND A WAY FOR PEOPLE TO ADD NOTES

			collections[0].ApplyColors(currentselect);
		}

	});

	canvas1.addEventListener("wheel", function(e) {

		if(e.wheelDelta > 0)
		{
			if(cameradistance > 5.0)
			{
				cameradistance -= 4.0;
				coGL.camera.setDistance(cameradistance);
			}
		}
		else if(e.wheelDelta < 0)
		{
			if(cameradistance < 90.0)
			{
				cameradistance += 4.0;
				coGL.camera.setDistance(cameradistance);
			}
		}
	});
}

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

socket.on("welcome", function(_data)
{
		id = _data.id;
		console.log("this is my socket ID: " + id);

		var data = {};
		//queueMsg('GetDC', data); //temporary
});

socket.on("_GetDC", function(_data)
{
	var data = _data;
	var c = new Collection(data.name, data.collection);
});

function QueryGeo(_query)
{
	console.log("QueryGeo");
	var data = {query: _query};
	queueMsg('QueryGeo', data);
}

socket.on("_QueryGeo", function(_data)
{
	var data = _data;
	console.log("_QueryGeo");
	console.log(data);
});

function QueryGeoDB(_query)
{
	console.log("QueryGeoDB");
	var data = {query: _query};
	queueMsg('QueryGeoDB', data);
}

socket.on("_QueryGeoDB", function(_data)
{
	var data = _data;
	console.log("_QueryGeoDB");
	console.log(data);
});

function BatchQueryGeo()
{
	console.log("BatchQueryGeo length: " + geoquery.length);
	var data = {queries: geoquery};
	queueMsg('BatchQueryGeo', data);
	geoquery=[];
}

//Update collection with geo data//***economize this

socket.on("_Geo", function(_data) //Individual geo data
{
	if(!_data.err)
	{
		var r = _data;
		GeoResponse(r);
	}
	else console.log("server error: " + _data.err);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SOCKET QUEUE
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//queuing a message simply adds an entry to the queue list
function queueMsg(_msg, _data) 
{
	queue.push([_msg,_data]); // queue is now treated as a numerical array
}

//one message at a time
function tick()
{
	if(queue.length > 0)
	{
		socket.emit(queue[0][0], queue[0][1]);
		queue.splice(0,1);
	}
}

//set the function tick() to repeat every 20 milliseconds. Tick executes and purges the message queue
setInterval(tick, 20);