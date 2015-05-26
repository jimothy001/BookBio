var collections = [];
var select= null;
var currentselect = null;
var geoinfo = []; //This should be checked with each new set of bibliographic results for each new collection for to prevent redundant queries to 3rd parties.
var geoquery = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ FROM SPREADSHEET
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//can use js-xlsx to read xls, xlsx, csv + ods and write to xls, csv, json + js objects - https://github.com/SheetJS/js-xlsx
function Read(event)
{
	console.log("Read");
	var x = document.getElementById("upload");
	console.log(x);
	if('files' in x)
	{
		// Load binary file from desktop
        loadBinaryFile(event,function(data)
        {
            // Parse it to JSON
	    	var workbook = XLSX.read(data,{type:'binary'});
	    	var sheet_name = workbook.SheetNames[0]; //allow multiple sheets
	    	var worksheet = workbook.Sheets[sheet_name];

	    	var name = sheet_name;
	    	var data = XLSX.utils.sheet_to_json(worksheet); //super useful!
	    	
	    	console.log(data);

	    	var c = new Collection(name, data);


	    	//Read worksheet**** PICK UP HERE - string parsing for cell address, "A" = new json object
	    	/*for(var i in worksheet)
	    	{
	    		if(i[0] === '!') continue;
	    		console.log(i + " :" + " " + i[0] + " " + worksheet[i].v);

	    		//var edition = {};

	    	}*/
        });
	}
}

function loadBinaryFile(path, success) {
    var files = path.target.files;
    var reader = new FileReader();
    var name = files[0].name;
    reader.onload = function(e) {
        var data = e.target.result;
        success(data);
    };
    reader.readAsBinaryString(files[0]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//COLLECTION CLASS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Collection(_name, _data)
{
	this.name = _name;
	this.size = _data.length;
	this.editions = []; //collection of editions
	
	this.emat =  new coGL.Material(coGL.shaders.normal_color,{"uColor":[1.0, 0.4, 0.9, 0.5], "uLightness": 0.7});
	this.smat = new coGL.Material(coGL.shaders.normal_color, {"uColor":[1.0, 0.4, 0.9, 0.5], "uLightness": 0.3});

	var ci = collections.length; //this collection's index after it is added to collections array


	for(var i in _data)
	{
		var e = new Edition(ci, i, _data[i], this.emat, this.smat);
		this.editions.push(e);
		//this.LogGeo(e);
	}

	if(geoquery.length > 0) BatchQueryGeo();

	collections.push(this);
	console.log("collections length: "+collections.length);
}

Collection.prototype.GetColor = function()
{
	var color = [];

	return color;
}

Collection.prototype.UpdateGeo = function(_edition)
{
	var ed = _edition;

	if(ed.e)
	{
		var e = parseInt(ed.e);
		this.editions[e].UpdateGeo(ed.lt, ed.lg, ed.city, ed.territory, ed.country);
	}
}


Collection.prototype.ApplyColors = function(_selectededition)
{
	for(var i in this.c)
	{
		this.editions[i].book.material = this.emat;
	}
	_selectededition.book.material = this.smat;
	
	modelsToRender = [];

	for(var i in this.editions)
	{
		modelsToRender.push(this.editions[i].book);
	}
}

Collection.prototype.Filter = function(_criteria)
{
	if(_criteria == "place")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].place == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "shelf")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].shelf == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "mat")
	{
		for(var i in this.editions)
		{
			//console.log(this.editions[i].mat);
			if(this.editions[i].bmat == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "format")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].format == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "folios")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].folios == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "year")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].year == null) this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "lang")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].lang == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "vacc")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].vacc == 0) this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "vis")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].vacc == 0) this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "ill")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].ill == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "ref")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].ref == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
		}
	}
	if(_criteria == "note")
	{
		for(var i in this.editions)
		{
			if(this.editions[i].note == "") this.editions[i].Zmap(false);
			else this.editions[i].Zmap(true);
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
var offset = 2.75; //for some reason this is necessary for mapping lg to x.

function Edition(_c, _e, _data, _emat, _smat)
{
	//KNOWS ONW PLACE
	this.c = _c; //collection index
	this.e = _e; //edition index
	
	//TEXT INFO
	this.edition = 0;
	this.place = "";
	this.shelf = "";
	this.bmat = "";
	this.format = "";
	this.folios = 0;
	this.period = "";
	this.lang = "";
	this.vacc = 0;
	this.vis = 0;
	this.ill = "";
	this.ref = "";
	this.note = "";

	if(_data.edition) this.edition = _data.edition;
	if(_data.place) this.place = _data.place;
	if(_data.shelf) this.shelf = _data.shelf;
	if(_data.mat) this.bmat = _data.mat;
	if(_data.format) this.format = _data.format;
	if(_data.folios) this.folios = _data.folios;
	if(_data.period) this.period = _data.period;
	if(_data.lang) this.lang = _data.lang;
	if(_data.vacc) this.vacc = _data.vacc;
	if(_data.vis) this.vis = _data.vis;
	if(_data.ill) this.ill = _data.ill;
	if(_data.ref) this.ref = _data.ref;
	if(_data.note) this.note = _data.note;

	//GRAPHICS
	this.lt = 1.0;
	this.lg = 1.0;
	this.x = 50.0;
	this.y = -25.0;

	if(_data.lg && _data.lt)
	{
		this.lg = parseFloat(_data.lg); 
		this.x = Remap(this.lg, -180.0, 180.0, 48.0015+offset, -48.0015+offset);

		this.lt = parseFloat(_data.lt);
		this.y = Remap(this.lt, -90.0, 90.0, 24.319, -24.319);
	}
	else
	{
		if(this.place != "")
		{
			var data = {c: this.c, e: this.e, place: this.place};
			geoquery.push(data);
		}
		else console.log("this.place is empty: " + this.place);
	}

	if(_data.year || _data.year == null)
	{
		if(_data.year == null) this.z = 41.0;
		else
		{
			this.year = parseInt(_data.year);
			this.z = Remap(this.year, 1300.0, 1900.0, 0.0, 40.0);
			//allow for continuous remaping of year.
		}
	}
	else this.z = 41.0;

	//GeoLine
	this.v0 = vec3.create();
	this.v0[0] = this.x;
	this.v0[1] = this.y;
	this.v0[2] = 0.0;
	this.v1 = vec3.create();
	this.v1[0] = this.x;
	this.v1[1] = this.y;
	this.v1[2] = 40.0;

	//Book
	this.easein = 0.95;
	this.tx = this.x;
	this.ty = this.y;
	this.tz = this.z;

	this.emat = _emat;
	this.smat = _smat;
	this.book = new coGL.Model(coGL.stockMeshes.edition, this.x, this.y, this.z);
	this.book.material = this.emat;
	this.book.parent = this;
	coGL.selectable(this.book);
	modelsToSelect.push(this.book);
	modelsToRender.push(this.book);
	this.book.onMouseLeave = function() {select = null};
	this.book.onMouseEnter = function() {select = this.parent;};
}

Edition.prototype.Zmap = function(_map)
{
	if(_map == true)
	{
		if(this.year != null) this.tz = Remap(this.year, 1300.0, 1900.0, 0.0, 40.0);
		else this.tz = 41.0;
	}
	else this.tz = 41.0;
}

Edition.prototype.UpdateGeo = function(_lt, _lg, _city, _territory, _country)
{
	this.lt = parseFloat(_lt);
	this.ty = Remap(this.lt, -90.0, 90.0, 24.319, -24.319);

	this.lg = parseFloat(_lg); 
	this.tx = Remap(this.lg, -180.0, 180.0, 48.0015+offset, -48.0015+offset);

	this.city = _city;
	this.territory = _territory;
	this.country = _country;
}

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
		this.v1[2] = 40.0;
}

function Remap(val, from1, to1, from2, to2)
{
	var result = (val - from1) / (to1 - from1) * (to2 - from2) + from2;
	return result;
}