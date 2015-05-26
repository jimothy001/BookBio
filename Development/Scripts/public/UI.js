	//UI

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

		this.parentstack=new CO.UIStack(document.body).setLabel("buttons and knobs and things").setCollapsible(true);
		parentstack.setLocation(80+"%", 1+"%", "fixed").setSize(19.5+"%");

		this.stack = this.parentstack.addStack("The Divine Comedy").setCollapsible(true);
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

		this.geofetch = this.parentstack.addStack("geo query").setCollapsible(true);
		this.geofetch.addTextInput("type and press enter").setOnCommited(function(v)
		{
			if(v != "" || v != " ") QueryGeoDB(v);//QueryGeo(v);
			console.log("from text query field: " + v);
		});

		this.upload = this.parentstack.addButton("upload").setOnPressed(function(e)
		{
			var x = document.getElementById("upload");
			x.click();
		});

		return this;
	}