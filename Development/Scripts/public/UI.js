//UI

var dli = document.getElementById("downloadLnk");

function UI()
{
	this.parentstack=new CO.UIStack(document.body).setLabel("UI").setCollapsible(true);
	this.parentstack.setLocation(80+"%", 1+"%", "fixed").setSize(19.5+"%");

	this.upload = this.parentstack.addButton("upload").setOnPressed(function(e){Upload()});
	this.downloadimage = this.parentstack.addButton("download model image").setOnPressed(function(e){DownloadImage()});
	this.downloadcuratedset = this.parentstack.addButton("download curated set").setOnPressed(function(e){DownloadSet()});

	this.stacks = [];

	return this;
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

function Upload()
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
//OUTMODED
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*UI.prototype.AddCollection = function(_ix, _name, _worksheet)
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