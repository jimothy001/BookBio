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
	ui = new UI();

	//GL
	coGL=COGL.init("canvas1");
	gl=coGL.gl;
	unmat = new coGL.Material(coGL.shaders.default, {"uColor":[0.9,0.9,0.9,0.9]});
	selunmat = new coGL.Material(coGL.shaders.default, {"uColor":[0.5,0.5,0.5,0.5]});

	map = new Map();
	timemark = new TimeMark();

	coGL.enableSelectionPass(modelsToSelect);
	//coGL.enableDepthPass(modelsToSelect);
	//coGL.enableUVPass(modelsToSelect);
	//coGL.enableWNormalPass(modelsToSelect);

	//var texture3d=new coGL.Texture3d(64,32,32,[255,0,0,255]);

	coGL.texturePass("back", "blury");

	var viewpoint = vec3.create(); //starting position of GL camera
	viewpoint[0] = 20.0;
	viewpoint[1] = 40.0;
	viewpoint[2] = 40.0;
	var targetpoint = vec3.create(); //starting target of GL camera
	targetpoint[0] = 2.75;
	targetpoint[1] = 0.0;
	targetpoint[2] = 15.0;
	coGL.camera.maxDistance = maxdistance;
	coGL.camera.setViewPoint(viewpoint).setTargetPoint(targetpoint).setDistance(cameradistance).setFar(300.0).update(); //set GL start and viewpoint of camera. 

	var light=new coGL.Camera(); //GL light - try doing without this
	light.easeIn=0.0;
	light.setDistance(50.0).setFov(60).setAngleXY(0.5).setAngleZ(0.8).update();

	var blur=false;
	var bsize=2048;
	var sharedFBO=new coGL.FBO(bsize, bsize, false);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//DRAWS COLLECTIONS AND MAP, RUNS EVERY FRAME
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	coGL.addRenderingPass("final"). 
		clearColorV(bgcol).
		clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT).
		camera().
		//light(light). //try doing without this
		//renderModels(modelsToRender). //can use filter
		execute(function() 
		{
			if(collections.length > 0)
			{
				for(var i in collections)
				{
					coGL.shaders.defaultline.u.uColor=[0,0,0,0.1];
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

			for(var i in tagmodels)
			{
				tagmodels[i].tex.graphics.fillStyle="#ffffff";
				tagmodels[i].tex.graphics.fillRect(0,0,tagmodels[i].tex.width,tagmodels[i].tex.height);

				/*tagmodels[i].tex.graphics.fillStyle="#0000ff";
				tagmodels[i].tex.graphics.fillRect(0,0,timemodels[0].tex.width,timemodels[0].tex.height);*/

				tagmodels[i].tex.graphics.fillStyle="#000000";
				tagmodels[i].tex.graphics.font="40px Courier";
				tagmodels[i].tex.graphics.fillText(timemark.marks[i].date + "",tagmodels[i].tex.width*0.1, tagmodels[i].tex.width*0.4);

				tagmodels[i].tex.update();
			}
		}).
		renderModels(modelsToRender).
		renderModels(mapmodels).
		renderModels(tagmodels).
		renderModels(timemodels).
		activate();
		
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//LISTENERS
	canvas1.addEventListener("mousedown", function(e) 
	{
		//focus on item: set camera target and set UI values
		if (select != null) //(e.which==1 && coGL.mouseOverObject) 
		{
			if(currentselect != null)
			{	
				if(currentselect.active && currentselect.mapped) currentselect.currentmat = currentselect.emat; //change current selections material back to original
				else currentselect.currentmat = unmat;

				currentselect.book.material = currentselect.currentmat; 
			}
			
			currentselect = select;

			var c = currentselect.c;
			var collection = collections[c];
			var keys = collections[c].keys;
			currentselect.book.material = collection.smat; //set selection with selection material

			if(currentselect.active) currentselect.currentmat = collection.smat; //change current selections material back to original
			else currentselect.currentmat = selunmat;

			currentselect.book.material = currentselect.currentmat;


			var t = [select.x, select.y, select.z];
			coGL.camera.setTargetPoint(t); //set camera target
			
			var data = currentselect.data;

			console.log(currentselect);

			for(var k in keys)
			{
				var key = keys[k]+"";
				var val = data[key];
				var b = ui.stacks[c].buttons[key];
				b.val = val;
				b.setLabel(b.key + ":" + b.val);
			}
		}
	});

	//zoom in, zoom out
	canvas1.addEventListener("wheel", function(e) 
	{

		if(e.wheelDelta > 0)
		{
			//console.log("+");
			if(cameradistance > mindistance)
			{
				cameradistance -= 4.0;
				coGL.camera.setDistance(cameradistance);
			}
		}
		else if(e.wheelDelta < 0)
		{
			//console.log("-");
			if(cameradistance < maxdistance)
			{
				cameradistance += 4.0;
				coGL.camera.setDistance(cameradistance);
			}
		}
	});


	dli = document.getElementById("downloadLnk");
	dli.addEventListener('click', download, false);
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

//hola
socket.on("welcome", function(_data)
{
		id = _data.id; //consistent with client id on server - seems useful for annotation system?
		console.log("this is my socket ID: " + id);
});

//updates collection with geo data
socket.on("_QueryGeo", function(_data)
{
	var r = _data;
	GeoResponse(r);

	/*if(!_data.err)
	{
		var r = _data;
		GeoResponse(r);
	}
	else 
	{
		console.log("server error: " + _data.err);
	}*/
});

socket.on("SearchQueryResult", function(_data) {
	console.log('SearchQueryResult');

	var name = _data.name;"WorldCatQuery"; //temp
	var data = _data.data;
	var keys = GetJSONKeysFromArray(_data.data);

	var c = new Collection(name, data, keys);
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

//one message at a time - prevents server from being overwhelmed
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EXPERIMENTS TO COME BACK TO
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
	//need to replace w/ single quad w/ texture //attempts below...
	
	//tried this

	//var mapimage = "images/map_transparent_pow_2.png";
	var geotexture = coGL.createTextureFromFile(mapimage);
	console.log(geotexture);
	var geoshader=coGL.LoadShaderFromFiles("phong_map", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/phong_map.glsl");
	var geomat = coGL.Material(geoshader, {"uColor":[0.1,1.0,1.0,0.7], "uAmbient":[0, 0, 0, 1], "uTexture":0}, {"0":geotexture});
	var _geomesh = coGL.loadMeshFromJSON("models/mapbase.json");
	var geomesh = new coGL.Model(_geomesh, 0.0, 0.0, 0.0);
	geomesh.material = geomat;
	modelsToRender.push(geomesh);


	//tried that

	var mapimage = "images/map_transparent_pow_2.png"; //***need to write shader for straight-forward texture drawing with transparency.
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
*/
