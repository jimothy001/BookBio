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
	
	var _format = 
				[
				{name:"all formats"},{name:"archival material"},{name:"article"},{name:"audiobook"},
				{name:"book"},{name:"--- braile book"},{name:"--- large print"},{name:"journal, magazine"},
				{name:"map"},{name:"music"},{name:"musical score"},{name:"newspaper"},{name:"sound recording"},
				{name:"game"},{name:"visual material"}
	 			]; //online media is excluded*/
	var _language = 
				[
				{name:"all languages"},{name:"english"},{name:"arabic"},{name:"bulgarian"},{name:"chinese"},
				{name:"croatian"},{name:"czech"},{name:"danish"},{name:"dutch"},{name:"french"},{name:"german"}, 
				{name:"greek, modern [1453-]"},{name:"hebrew"},{name:"hindi"},{name:"indonesian"},{name:"italian"},
				{name:"japanese"},{name:"korean"},{name:"latin"},{name:"norwegian"},{name:"persian"},{name:"polish"},
				{name:"portuguese"},{name:"romanian"},{name:"russian"},{name:"spanish"},{name:"swedish"},{name:"thai"},
				{name:"turkish"},{name:"ukrainian"},{name:"vietnamese"}
				]; 

	var _fields = {"keyword":"","title":"","author":"","subject":"","isbn":"","issn":""};
	var __fields = {"keyword":"","title":"","author":"","subject":"","isbn":"","issn":""};	
	var _dropdowns = {"language":_language};

	this.worldcat.terms = {"fields":_fields, "format":_format[0].name, "language":_language[0].name};//***
	var defaultterms = {"fields":__fields, "format":_format[0].name, "language":_language[0].name};

	//worldcat ui structure
	this.worldcat.termsui = [];
	this.worldcat.textfields = [];
	this.worldcat.numfields = [];
	this.worldcat.dropdowns = [];
	
	//reset button
	var reset = this.worldcat.addButton("RESET VALUES");
	reset.parent = this;
	reset.defaultterms = defaultterms;
	reset.setOnPressed(function(e)
	{
		var dt = this.defaultterms;
		this.parent.ResetWorldCat(dt);
	});

	//text fields
	for(var i in _fields)
	{
		var textfield = this.worldcat.addTextInput("...", i);
		textfield.parent = this.worldcat;
		textfield.name = i;
		textfield.defaultterm = "...";
		textfield.setOnCommited(function(v)
		{
			if(v != "..." && v != undefined) this.v = v;
			else this.v = "";
			
			this.parent.terms.fields[this.name] = this.v;
		});

		this.worldcat.textfields.push(textfield);
	}
	this.worldcat.termsui.push(this.worldcat.textfields);

	//dropdown criteria
	for(var i in _dropdowns)
	{
		var length = _dropdowns[i].length * 15;

		var dropdown = this.worldcat.addCombo(_dropdowns[i], i, length + "px");
		dropdown.parent = this.worldcat;

		// Default values
		var dropdownName = _dropdowns[i][0]['name'];
		if (dropdownName === 'all formats') { dropdown.parent.terms[i] = 'all formats'; }
		if (dropdownName === 'all languages') { dropdown.parent.terms[i] = 'all languages'; }

		dropdown.name = i;
		dropdown.defaultterm = _dropdowns[i][0].name;
		dropdown.setOnChanged(function(e)
		{
			this.parent.terms[this.name] = e.name;
			console.log(e["name"]);
		});
		dropdown.textInput.text = dropdown.defaultterm;

		this.worldcat.dropdowns.push(dropdown);
	}
	this.worldcat.termsui.push(this.worldcat.dropdowns);

	//searchbutton
	var trigger = this.worldcat.addButton("SEARCH");
	trigger.parent = this.worldcat;
	trigger.setOnPressed(function(e)
	{
		var terms = this.parent.terms;
		//console.log(terms);
		console.log(terms.fields);//terms["fields"]["keyword"]);
		queueMsg('SearchQueryInitiated', terms);
	});

	//less is more
	this.worldcat.setCollapsed(true);

	//meow
	return this.worldcat;
}

UI.prototype.ResetWorldCat = function(_dt)
{
	this.worldcat.terms = {};
	this.worldcat.terms = _dt;
	console.log(this.worldcat.terms);
	
	for(var i in this.worldcat.termsui)
	{
		for(var j in this.worldcat.termsui[i])
		{
			var termui = this.worldcat.termsui[i][j];
			termui.text = termui.defaultterm;
			termui.textInput.text = termui.defaultterm;
		}
	}
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
		    	var keys = GetJSONKeysFromWorksheet(worksheet);
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

function GetJSONKeysFromWorksheet(_worksheet)
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

function GetJSONKeysFromArray(_data) 
{
	//console.log(_data);

	var keys = ExtractFirstKeys(_data[0]);
	//keys.concat(firstkeys);

	for(var i in _data)
	{
		var uniquekeys = ExtractUniqueKeys(keys, _data[i]);
		keys.concat(uniquekeys);
	}

	return keys;
}

function ExtractFirstKeys(o)
{
	console.log("ExtractFirstKeys");

	var firstkeys = [];

	for(var j in o)
	{
		firstkeys.push(j+"");
	}

	console.log(firstkeys);

	return firstkeys;
}

function ExtractUniqueKeys(checkkeys, o)
{
	console.log("ExtractUniqueKeys");

	var uniquekeys = [];

	for(var j in o)
	{
		var check = false;

		for(var k in checkkeys)
		{
			if(j == checkkeys[k])
			{
				check = true;
				break;
			}
		}

		if(check) uniquekeys.push(j+"");
	}

	return uniquekeys;
}

function Write()
{
	var wb = new Workbook();

	for(var i in collections)
	{
		var c = collections[i];

		var data = ParseEditions(c.keys, c.editions);
		var data_ = ParseFaultyEditions(c.keys, c.editions);

		var ws_name = c.name;
		var ws_name_ = c.name + " - needs cleaning";
		var ws = SheetFrom2dArray(data);
		var ws_ = SheetFrom2dArray(data_);

		wb.SheetNames.push(ws_name);
		wb.SheetNames.push(ws_name_);
		wb.Sheets[ws_name] = ws;
		wb.Sheets[ws_name_] = ws_;
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
	saveAs(new Blob([s2ab(wbout)],{type:""}), "collections.xlsx");
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

function ParseFaultyEditions(_keys, _editions)
{
	var data = [];
	data.push(_keys);

	for(var i in _editions)
	{
		var e = _editions[i];

		if(!e.active)
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
