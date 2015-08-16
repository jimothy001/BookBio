//UI

var dli;

function UI()
{
	this.parentstack=new CO.UIStack(document.body).setLabel(".").setCollapsible(true);
	this.parentstack.setLocation(80+"%", 1+"%", "fixed").setSize(20+"%");
	this.parentstack.collaped = false;

	//this.searchfield.setLabel("worldcat query:");
	this.uploadset = this.parentstack.addButton("upload set").setOnPressed(function(e){UploadSet()});
	this.downloadcuratedset = this.parentstack.addButton("download set").setOnPressed(function(e){DownloadSet()});
	this.downloadimage = this.parentstack.addButton("download image").setOnPressed(function(e){DownloadImage()});
	this.worldcat = this.WorldCat();

	this.stacks = [];

	return this;
}

UI.prototype.WorldCat = function()
{
	this.worldcat = this.parentstack.addStack("worldcat search").setCollapsible(true);
	var _yearfrom = 0;
	var _yearto = 2015;
	var _audience = [{name:"any audience", data:""},{name:"juvenile", data:""},{name:"non-juvenile", data:""}];
	var __audience = ["any audience","juvenile","non-juvenile"];
	var _content = [{name:"any content"},{name:"fiction"},{name:"non-fiction"},{name:"biography"},{name:"thesis/dissertations"}];
	var _format = 
				[
				{name:"all formats"},{name:"archival material"},{name:"article"},{name:"audiobook"},
				{name:"book"},{name:"--- braile book"},{name:"--- large print"},{name:"journal, magazine"},
				{name:"map"},{name:"music"},{name:"musical score"},{name:"newspaper"},{name:"sound recording"},
				{name:"game"},{name:"visual material"}
	 			]; //online media is excluded
	var _language = 
				[
				{name:"all languages"},{name:"english"},{name:"arabic"},{name:"bulgarian"},{name:"chinese"},
				{name:"croatian"},{name:"czech"},{name:"danish"},{name:"dutch"},{name:"french"},{name:"german"}, 
				{name:"greek, modern [1453-]"},{name:"hebrew"},{name:"hindi"},{name:"indonesian"},{name:"italian"},
				{name:"japanese"},{name:"korean"},{name:"latin"},{name:"norwegian"},{name:"persian"},{name:"polish"},
				{name:"portuguese"},{name:"romanian"},{name:"russian"},{name:"spanish"},{name:"swedish"},{name:"thai"},
				{name:"turkish"},{name:"ukrainian"},{name:"vietnamese"}
				]; 

	var _fields = {"keyword":"","title":"","author":"","subject":"","accession number":"","isbn":"","issn":"","journal source":""};		
	var _years = {"yearfrom":_yearfrom, "yearto":_yearto};
	var _dropdowns = {"audience":_audience, "content":_content, "format":_format, "language":_language};

	this.worldcat.terms = {"fields":_fields, "yearfrom":_yearfrom, "yearto":_yearto, "audience":_audience, "content":_content, "format":_format, "language":_language};//***

	this.worldcat.textfields = [];
	this.worldcat.numfields = [];
	this.worldcat.dropdowns = [];

	var reset = this.worldcat.addButton("RESET VALUES");

	for(var i in _fields)
	{
		var textfield = this.worldcat.addTextInput("...", i);
		textfield.parent = this.worldcat;
		textfield.setOnCommited(function(v)
		{
			if(v != "...") this.v = v;
			else this.v = "";
			
			this.parent.terms.fields[i] = this.v;
		});

		this.worldcat.textfields.push(textfield);
	}

	for(var i in _years)
	{
		var numfield = this.worldcat.addTextInput(null, i);
		numfield.parent = this.worldcat;
		numfield.name = i;
		numfield.bound = 0;
		console.log(i);
		if(i == "yearto") numfield.bound = 2015;
		
		numfield.makeNumeric(true, 0, 2015, numfield.bound);

		numfield.setOnChanged(function(v)
		{
			if(v == null || v == 0 || isNaN(v) || v === undefined)
			{
				v = this.bound;
			}

			this.text = v;
			this.textInput.value = v;
			return v;
		});

		this.worldcat.numfields.push(numfield);
	}

	for(var i in _dropdowns)
	{
		var length = _dropdowns[i].length * 15;

		var dropdown = this.worldcat.addCombo(_dropdowns[i], i, length + "px");
		dropdown.parent = this.worldcat;

		// Default values
		var dropdownName = _dropdowns[i][0]['name'];
		if (dropdownName === 'any audience') { dropdown.parent.terms[i] = 'any audience'; }
		if (dropdownName === 'any content') { dropdown.parent.terms[i] = 'any content'; }
		if (dropdownName === 'all formats') { dropdown.parent.terms[i] = 'all formats'; }
		if (dropdownName === 'all languages') { dropdown.parent.terms[i] = 'all languages'; }

		dropdown.setOnChanged(function(e)
		{
			this.parent.terms[i] = e["name"];
			console.log(e["name"]);
		});
		dropdown.textInput.text = _dropdowns[i][0]["name"];

		this.worldcat.dropdowns.push(dropdown);
	}

	var trigger = this.worldcat.addButton("SEARCH");
	trigger.parent = this.worldcat;
	trigger.setOnPressed(function(e)
	{
		var terms = this.parent.terms;

		queueMsg('SearchQuery', terms);
	});

	reset.parent = this.worldcat;
	reset.setOnPressed(function(e)
	{
		this.parent.ResetWorldCat();
	});

	this.worldcat.setCollapsed(true);

	return this.worldcat;
}

function UpdateField(field, value)
{
	field.text = value;
	field.textInput.value = value;

	return field;
}

UI.prototype.AddCollection = function(_ix, _name, _keys)
{
	var stack = this.parentstack.addStack(""+_name).setCollapsible(true);		
	stack.ix = _ix;
	stack.buttons = {};
	stack.keys = _keys;
	
	for(var k in _keys)
	{
		//stack.buttonvalues.push("...");
		var key = _keys[k]+"";
		var button = stack.addButton();
		button.key = key;
		button.val = "...";
		button.setLabel(button.key + ": " + button.val);
		button.setOnPressed(function(e) 
		{
			console.log("collections index: " + stack.ix + " button index " + this.key)
			collections[stack.ix].Filter(this.key); //match indexes for buttons vs. edition fields
		});
		stack.buttons[key] = button;
	}

	stack.setOnPressed(function(e)
	{	
		var c = collections[this.ix];
		if(c.active == true) c.Deactivate();
		else c.Activate();
	});

	this.stacks.push(stack);
}

UI.prototype.ResetWorldCat = function()
{
	//for(var i in this.worldcat.terms)
	//pick up here...
}

function UploadSet()
{
	var x = document.getElementById("upload");
	console.log(x);
	x.click();
}

function DownloadImage()
{
	dli.click();
}

function download()
{
	var canvas = document.getElementById("canvas1");
	console.log("canvas: "+canvas);
	var dt = canvas.toDataURL('image/jpeg');
	this.href = dt;
}

function DownloadSet()
{
	Write();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ FROM + WRITE TO SPREADSHEET
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
	//console.log(x);
	if('files' in x)
	{
        loadBinaryFile(event,function(data) //load file
        {
	    	var workbook = XLSX.read(data,{type:'binary'});
	    	console.log(workbook);

	    	for(var i in workbook.SheetNames) //each sheet is treated as a separate collection
	    	{
		    	var sheet_name = workbook.SheetNames[i];
		    	var worksheet = workbook.Sheets[sheet_name];
		    	var name = sheet_name;
		    	var keys = GetJSONKeys(worksheet);
		    	var data = XLSX.utils.sheet_to_json(worksheet); //super useful!

		    	var c = new Collection(name, data, keys);
	    	}
        });
	}
	else console.log("no files in upload");
}

function loadBinaryFile(path, success) {
    var files = path.target.files;
    var reader = new FileReader();
    //var name = files[0].name;
    reader.onload = function(e) {
        var data = e.target.result;
        success(data);
    };
    reader.readAsBinaryString(files[0]);
}

function GetJSONKeys(_worksheet)
{
	var keys = [];

	for(var i in _worksheet)
	{
		if(i[0] === '!') continue;
		if(i[1] == '1')
		{
			keys.push(_worksheet[i].v);
		}
		else break;
	}
	return keys;
}

function Write()
{
	var wb = new Workbook();

	for(var i in collections)
	{
		var c = collections[i];

		var data = ParseEditions(c.keys, c.editions);
		
		var ws_name = c.name;
		ws = SheetFrom2dArray(data);
		wb.SheetNames.push(ws_name);
		wb.Sheets[ws_name] = ws;
	}

	SaveWorkbook(wb);
}

function SaveWorkbook(workbook)
{
	/* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
	var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };

	var wbout = XLSX.write(workbook,wopts);

	function s2ab(s) {
	  var buf = new ArrayBuffer(s.length);
	  var view = new Uint8Array(buf);
	  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	  return buf;
	}

	/* the saveAs call downloads a file on the local machine */
	saveAs(new Blob([s2ab(wbout)],{type:""}), "test.xlsx");
}

function Workbook() {
	if(!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
}

function ParseEditions(_keys, _editions)
{
	var data = [];
	data.push(_keys);

	for(var i in _editions)
	{
		var e = _editions[i];

		if(e.active)
		{
			var d = [];

			for(var j in e.data)
			{
				d.push(e.data[j]);
			}

			data.push(d);
		}
	}

	return data;
}

function SheetFrom2dArray(data, opts) {
	var ws = {};
	var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
	for(var R = 0; R != data.length; ++R) {
		for(var C = 0; C != data[R].length; ++C) {
			if(range.s.r > R) range.s.r = R;
			if(range.s.c > C) range.s.c = C;
			if(range.e.r < R) range.e.r = R;
			if(range.e.c < C) range.e.c = C;
			var cell = {v: data[R][C] };
			if(cell.v == null) continue;
			var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
			
			if(typeof cell.v === 'number') cell.t = 'n';
			else if(typeof cell.v === 'boolean') cell.t = 'b';
			else cell.t = 's';
			
			ws[cell_ref] = cell;
		}
	}
	if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
	return ws;
}

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

var yearfrom = this.worldcat.addTextInput(null, "year from:").makeNumeric(false, 0, 2020)
yearfrom.parent = this.worldcat;
yearfrom.setOnCommited(function(v)
{
	if(v != null) this.v = v;
	else this.v = null;

	this.parent.terms.yearfrom = this.v;
});
this.worldcat.textfields.push(yearfrom);

var yearto = this.worldcat.addTextInput(null, "year from:").makeNumeric(false, 0, 2020)
yearto.parent = this.worldcat;
yearto.setOnCommited(function(v)
{
	if(v != null) this.v = v;
	else this.v = null;

	this.parent.terms.yearto = this.v;
});
this.worldcat.textfields.push(yearto);

//from sheet from 2d Arrays
else if(cell.v instanceof Date) {
				cell.t = 'n'; cell.z = XLSX.SSF._table[14];
				cell.v = datenum(cell.v);
			}

function datenum(v, date1904) {
	if(date1904) v+=1462;
	var epoch = Date.parse(v);
	return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

UI.prototype.AddCollection = function(_ix, _name, _worksheet)
{
	var stack = this.parentstack.addStack(""+_name).setCollapsible(true);
	stack.ix = _ix;
	stack.buttons = [];
	stack.buttonvalues = [];

	var ix = 0;
	
	for(var i in _worksheet)
	{
		if(i[0] === '!') continue;
		if(i[1] == '1')
		{
			stack.buttonvalues.push("...");
			
			var button = stack.addButton();
			button.ix = ix;
			button.setLabel(_worksheet[i].v + ": " + stack.buttonvalues[button.ix]);
			button.setOnPressed(function(e) 
				{
					console.log("collections index: " + stack.ix + " button index " + this.ix)
					collections[stack.ix].Filter(this.ix); //match indexes for buttons vs. edition fields
				});
			stack.buttons.push(button);
			ix++;
		}
		else break;
	}

	this.stacks.push(stack);
}


function UI()
{
	this.year = 0;
	this.edition = 0;
	this.place = "";
	this.shelf = "";
	this.mat = "";
	this.format = "";
	this.folios = 0;
	this.period = "";
	this.lang = "";
	this.vacc = 0;
	this.vis = 0;
	this.ill = "";
	this.ref = "";
	this.note = "";

	this.parentstack=new CO.UIStack(document.body).setLabel("UI").setCollapsible(true);
	parentstack.setLocation(80+"%", 1+"%", "fixed").setSize(19.5+"%");

	this.stack = this.parentstack.addStack("collection").setCollapsible(true);
	this.citybutton = this.stack.addButton("place: " + this.place).setOnPressed(function(e) {collections[0].Filter("place");});
	this.shelfbutton = this.stack.addButton("shelf: " + this.shelf).setOnPressed(function(e) {collections[0].Filter("shelf");});
	this.matbutton = this.stack.addButton("mat: " + this.mat).setOnPressed(function(e) {collections[0].Filter("mat");});
	this.formatbutton = this.stack.addButton("format: " + this.format).setOnPressed(function(e) {collections[0].Filter("format");});
	this.foliosbutton = this.stack.addButton("folios: " + this.folios).setOnPressed(function(e) {collections[0].Filter("folios");});
	this.periodbutton = this.stack.addButton("period: " + this.period).setOnPressed(function(e) {collections[0].Filter("period");});
	this.yearbutton = this.stack.addButton("year: " + this.year).setOnPressed(function(e) {collections[0].Filter("year");});
	this.langbutton = this.stack.addButton("lang: " + this.lang).setOnPressed(function(e) {collections[0].Filter("lang");});	
	this.vaccbutton = this.stack.addButton("verbal accretions: " + this.vacc).setOnPressed(function(e) {collections[0].Filter("vacc");});	
	this.visbutton = this.stack.addButton("visuals: " + this.vis).setOnPressed(function(e) {collections[0].Filter("vis");});		
	this.illbutton = this.stack.addButton("illustrator: " + this.ill).setOnPressed(function(e) {collections[0].Filter("ill");});
	this.refbutton = this.stack.addButton("reference: " + this.ref).setOnPressed(function(e) {collections[0].Filter("ref");});	
	this.notebutton = this.stack.addButton("note: " + this.note).setOnPressed(function(e) {collections[0].Filter("note");});

	//this.geofetch = this.parentstack.addStack("geo query").setCollapsible(true);
	//this.geofetch.addTextInput("type and press enter").setOnCommited(function(v)
	//{
	//	if(v != "" || v != " ") QueryGeoDB(v);//QueryGeo(v);
	//	console.log("from text query field: " + v);
	//});

	this.upload = this.parentstack.addButton("upload").setOnPressed(function(e)
	{
		var x = document.getElementById("upload");
		console.log(x);
		x.click();
	});

	return this;
}*/
