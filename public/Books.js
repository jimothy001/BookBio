/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//COLLECTION CLASS // SQUARES!
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Collection(_name, _data, _keys)
{
	this.name = _name; 
	this.size = _data.length;
	this.keys = _keys;
	this.editions = []; //collection of editions
	this.active = true;
	var color = this.SetColors();
	this.emat =  new coGL.Material(coGL.shaders.default,{"uColor":color}); //new coGL.Material(coGL.shaders.normal_color,{"uColor":color, "uLightness": 0.7});
	this.smat = new coGL.Material(coGL.shaders.normal_color, {"uColor":color, "uLightness": 0.9});
	this.unmat = unmat;
	this.selunmat = selunmat;

	var ci = collections.length; //this collection's index after it is added to collections array

	for(var i in _data) //instantate editions and add them to collections
	{

		var e = new Edition(ci, i, this.keys, _data[i], this.emat);
		this.editions.push(e);
	}

	if(geoquery.length > 0) QueryGeo(); //if there are queries for geographic information... query them.

	collections.push(this); //add collection to collection of collections

	ui.AddCollection(ci, this.name, this.keys);
}

//to be connected to emat and smat
Collection.prototype.SetColors = function() 
{
	//process of randomization
	var r = Math.random();
	var g = Math.random();
	var b = Math.random();
	var a = 0.85;

	//var color = [1.0, 0.4, 0.9, 0.5];
	var color = [r,g,b,a];
	return color;
}

//updates editions with geographic coordinates - called from GeoResponse when results from geoquery are returned
Collection.prototype.UpdateGeo = function(_edition) 
{
	var ed = _edition;

	if(ed.e)
	{
		var e = parseInt(ed.e);
		this.editions[e].UpdateGeo(ed.lt, ed.lg, ed.city, ed.territory, ed.country);
	}
}

Collection.prototype.Activate = function()
{
	//console.log("Activate");
	this.active = true;
	for(var e in this.editions)
	{
		this.editions[e].active = true;
		this.editions[e].book.material = this.editions[e].currentmat;
	}
}

Collection.prototype.Deactivate = function()
{
	//console.log("Deactivate");
	this.active = false;
	for(var e in this.editions)
	{
		this.editions[e].active = false;
		this.editions[e].book.material = unmat;
	}
}

//selectivly filters collection content per UI input //***make this flexible
Collection.prototype.Filter = function(_key)
{
	
	for(var i in this.editions)
	{
		var val = this.editions[i].data[_key];

		if(val == null || val == 0 || val == "") 
		{
			this.editions[i].book.material = this.unmat;
			this.editions[i].active = false;
		}
		else 
		{	
			this.editions[i].book.material = this.emat;
			this.editions[i].active = true;
		}
	}
	
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EDITION CLASS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Edition(_c, _e, _keys, _data, _emat)
{
	//knows its place in the world
	this.c = _c; //collection index
	this.e = _e; //edition index
	this.active = true;
	this.data = {};

	//text info
	for(var k in _keys)
	{
		var key = _keys[k]+"";
		if(_data[key]) this.data[key] = _data[key];
		else this.data[key] = null;
	}

	//graphics
	//console.log(this.data.place);
	this.place = this.data.place;
	this.lt = 1.0;
	this.lg = 1.0;
	this.yearstart = 0;//this.data.year;
	this.yearend = 0;
	this.mapped = false;
	this.x = 80.0;//50.0;
	this.y = 0.0;//-25.0;
	this.z = 50.0;
	this.zz = 50.0;

	if(this.lt == 1.0 && this.lg == 1.0)
	{
		if(this.place != null)
		{
			var address = [{c: this.c, e: this.e}]; //nested addresses
			var query = {addresses: address, place: this.place + ""};
			
			GeoQuery(query);
		}
		else this.NoGeo();
	}

	//temporal data //***allow for continuous remaping of year
	if(this.data.year)
	{
			this.yearstart = Math.abs(parseInt(this.data.year));
			this.yearend = this.yearstart;
			this.z = Remap(this.yearstart, time.start, time.end, 0.0, 40.0);

			this.zz = this.z;

			this.mapped = true;
	}
	else if(this.data.yearStart && this.data.yearEnd)
	{	
			if(this.data.yearStart === "!" || this.data.yearEnd === "!")
			{
				console.log("!");
				this.NoGeo();
			}
			else 
			{
				this.yearstart = Math.abs(parseInt(this.data.yearStart)); //if(this.data.yearStart) 
				this.yearend = Math.abs(parseInt(this.data.yearEnd)); //if(this.data.yearStart) 

				
				if(this.data.yearEnd) 
				{
					var start = this.data.yearStart+"";
					var end = this.data.yearEnd+"";

					//console.log("end: "+end+"  end length: "+end.length);

					if(end.length == 2)
					{
						if(start.length == 4)
						{
							var cent = start.slice(0,2);
							//console.log("cent: "+cent);

							var _end = end+"";
							end = cent+_end;
						}
					}

					this.yearend = Math.abs(parseInt(end));
					this.data.yearEnd = this.yearend;
				}
				else this.yearend = this.yearstart;

				if(this.yearstart > 1000 && this.yearend > 1000)
				{
					//console.log(this.yearstart + " " + this.yearend);

					this.z = Remap(this.yearstart, time.start, time.end, 0.0, 40.0);
					this.zz = Remap(this.yearend, time.start, time.end, 0.0, 40.0);

					this.mapped = true;
				}
				else
				{ 
					console.log("!!: " + this.yearstart + " " + this.yearend);
					this.NoGeo();
				}
			}
			
	}
	else
	{ 
		console.log("!!!");
		this.NoGeo();
	}

	if(this.yearstart != 0 && this.z > 40.0) console.log(this.z);

	//geo line
	this.v0 = vec3.create();
	this.v0[0] = this.x;
	this.v0[1] = this.y;
	this.v0[2] = 0.0;
	this.v1 = vec3.create();
	this.v1[0] = this.x;
	this.v1[1] = this.y;
	this.v1[2] = this.z; //40.0

	//book mesh
	this.easein = 0.95;
	this.tx = this.x;
	this.ty = this.y;
	this.tz = this.z;

	this.emat = _emat;
	this.currentmat = this.emat;
	this.book = this.Model(); //new coGL.Model(coGL.stockMeshes.edition, this.x, this.y, this.z);

	if(!this.active) this.currentmat = unmat;

	this.book.material = this.currentmat;

	this.book.parent = this;
	coGL.selectable(this.book);
	modelsToSelect.push(this.book);
	modelsToRender.push(this.book);
	this.book.onMouseLeave = function() {select = null}; //not going to be clicked :(
	this.book.onMouseEnter = function() {select = this.parent;}; //I might be clicked :)
}

Edition.prototype.Model = function()
{
	var mesh;

	if(this.yearstart == this.yearend) mesh = coGL.stockMeshes.edition;
	else
	{	
		var _z = this.zz - this.z;
		var m = 0.4;

		//what if the mesh needs to be dynamic?

		var VBO = 
		[
		    m,0,0, 0,0,-m, 0,0,
		    m,m,0, 0,0,-m, 1,0,
		    0,0,0, 0,0,-m, 0,1,
		    0,m,0, 0,0,-m, 1,1,

		    0,0,_z, 0,0,m, 0,0,
		    0,m,_z, 0,0,m, 1,0,
		    m,0,_z, 0,0,m, 0,1,
		    m,m,_z, 0,0,m, 1,1,

		    0,0,0, -m,0,0, 0,0,
		    0,m,0, -m,0,0, 1,0,
		    0,0,_z, -m,0,0, 0,1,
		    0,m,_z, -m,0,0, 1,1,

		    0,m,0, 0,m,0, 0,0,
		    m,m,0, 0,m,0, 1,0,
		    0,m,_z, 0,m,0, 0,1,
		    m,m,_z, 0,m,0, 1,1,

		    m,m,0, m,0,0, 0,0,
		    m,0,0, m,0,0, 1,0,
		    m,m,_z, m,0,0, 0,1,
		    m,0,_z, m,0,0, 1,1,

		    m,0,0, 0,-m,0, 0,0,
		    0,0,0, 0,-m,0, 1,0,
		    m,0,_z, 0,-m,0, 0,1,
		    0,0,_z, 0,-m,0, 1,1
	    ];

	    var IBO = [0,2,3,4,6,7,8,10,11,12,14,15,16,18,19,20,22,23,0,3,1,4,7,5,8,11,9,12,15,13,16,19,17,20,23,21];

    	mesh = new coGL.Mesh(VBO, IBO);
	}

	var model = new coGL.Model(mesh, this.x, this.y, this.z);

	return model;
}

Edition.prototype.NoGeo = function()
{
	this.ty += (Math.random() - 0.5) * 2.0;
	this.tx += (Math.random() - 0.5) * 2.0;
	this.active = false;
	this.emat = unmat;
	this.currentmat = unmat;
	if(this.book != null) this.book.material = this.currentmat;
}

//map year to z value
Edition.prototype.Zmap = function(_map)
{
	if(_map == true)
	{
		if(this.year != null) this.tz = Remap(this.year, time.start, time.end, 0.0, 40.0);
		else this.tz = 50.0;
	}
	else
	{
	 	this.tz = 50.0;
	 	this.active = false;
	}
}

//update edition with geographic information - called from Collection.UpdateGeo
Edition.prototype.UpdateGeo = function(u)
{
	if(this.active)
	{
		console.log("UpdateGeo");

		this.lt = parseFloat(u.lt);
		this.ty = Remap(this.lt, -90.0, 90.0, 24.319, -24.319);

		this.lg = parseFloat(u.lg); 
		this.tx = Remap(this.lg, -180.0, 180.0, 48.0015+offset, -48.0015+offset);

		this.city = u.city;
		this.territory = u.territory;
		this.country = u.country;
	}
	else this.NoGeo();
}

//called every frame
Edition.prototype.update = function()
{
	 	var ei = this.easein;
	 	var eo = 1.0 - ei;
	 	this.x = this.x * ei + this.tx * eo;
	 	this.y = this.y * ei + this.ty * eo;
	 	this.z = this.z * ei + this.tz * eo;

	 	//Mesh Update
	 	var v = vec3.create();
		v[0] = this.x;
		v[1] = this.y;
		v[2] = this.z;
		this.book.setLocation(v);

		//GeoLine Update
		this.v0[0] = this.x;
		this.v0[1] = this.y;
		this.v0[2] = 0.0;
		this.v1[0] = this.x;
		this.v1[1] = this.y;
		this.v1[2] = this.z;
}
