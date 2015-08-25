/*
* Copyright (c) 2013 Panagiotis Michalatos [www.sawapan.eu]
*
* This software is provided 'as-is', without any express or implied
* warranty. In no event will the authors be held liable for any damages
* arising from the use of this software.
*
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
*
*    1. The origin of this software must not be misrepresented; you must not
*    claim that you wrote the original software. If you use this software
*    in a product, an acknowledgment in the product documentation would be
*    appreciated but is not required.
*
*    2. Altered source versions must be plainly marked as such, and must not
*    be misrepresented as being the original software.
*
*    3. This notice may not be removed or altered from any source
*    distribution.
*/
/** @module coopGUI */

/**
 * CO namespace. It contains all coop functionality and classes
 * @namespace
 */
var CO=CO || {};

function TestUI(_parent) {

	

	var stack=new CO.UIStack(_parent);
	stack.setLabel("stack1:").setCollapsible(true);
	stack.setLocation("200px", "50px", "fixed").setSize("150px");//.setClientSize(null, "500px");
	stack.addButton("press here!").setOnPressed(function(e) {
		console.log(e);
	});


	var shelf=new CO.UIShelf(_parent);
	shelf.setLabel("the shelf:");
	shelf.setLocation("400px", "50px", "fixed").setClientSize(null, "150px");


	//var grid=stack.addGrid("the grid:", 2);

	shelf.addButton("0 press here 4!").setSize("200px");
	shelf.addButton("1 press here 3 !").setSize("200px");
	shelf.addButton("2 press here!").setSize("200px");
	shelf.addButton("3 press here!").setSize("200px");
	shelf.addButton("4 press here!").setSize("200px");
	shelf.addButton("5 press here!").setSize("200px");
	shelf.addButton("6 press here!").setSize("200px");


	//var grid=new CO.UIGrid(_parent);
	//grid.setLabel("the grid:");
	//grid.setLocation("400px", "50px", "fixed").setSize("250px").setColumns(2);


	/*var grid=stack.addGrid("the grid:", 2);

	grid.addButton("0 press here 4!").setOnPressed(function(e) {
		grid.setColumns(4);
	});
	grid.addButton("1 press here 3 !").setOnPressed(function(e) {
		grid.setColumns(3);
	});

	grid.addButton("2 press here!");
	grid.addButton("3 press here!");
	grid.addButton("4 press here!");
	grid.addButton("5 press here!");
	grid.addButton("6 press here!");
	grid.addButton("7 press here!");
	grid.addButton("8 press here!");
	grid.addButton("9 press here!");
	grid.addButton("10 press here!");*/



	var stack2=stack.addStack("stack2  :").setCollapsible(true);
	stack2.addButton("press here too!");
	stack2.addButton("").setIconToFile("mo.png");
	stack2.addButton("press here too!").setIconToFile("mo.png");

	stack.addButton("press here too!").setOnPressed(function(e) {
		console.log(e);
	});
	stack.addButton("press here too!").setOnPressed(function(e) {
		console.log(e);
	});

	stack.addList([	{name:"i1"}, 
					{name:"i2", data:"somedata", removable:true}, 
					{name:"i2", data:"somedata", removable:true}, 
					{name:"i2", data:"somedata"}, 
					{name:"i2", data:"somedata", removable:true}, 
					{name:"i2", data:"somedata", removable:true}, 
					{name:"i2", data:"somedata"}, 
					{name:"i2", data:"somedata", removable:true}], 
					"list1:", "80px").setOnChanged(function(e) {
																	console.log(e);
																});


	stack.addCheck("check me").setOnChanged(function(e) {
		console.log(this.checked);
	});

	stack.addCombo([	{name:"i1"}, 
					{name:"i2", data:"somedata"}, 
					{name:"i2", data:"somedata"}, 
					{name:"i2", data:"somedata"}, 
					{name:"i2", data:"somedata"}, 
					{name:"i2", data:"somedata"}, 
					{name:"i2", data:"somedata"}, 
					{name:"i2", data:"somedata"}], 
					"combo1:", "50px").setOnChanged(function(e) {
																	console.log(e);
																});



	stack.addTextInput("value", "type:").makeNumeric(false, -10, 40).setOnCommited(function(v){
		if (v==1) return false;
		return true;
	});
	var ti=stack.addTextInput("value2");

	ti.onChanged=function(e) {
		console.log("changed:"+e);
	}

	ti.onCommited=function(e) {
		console.log("commit:"+e);
		if (e=="hello") return true;
		return false;
	}

	stack.addScrollbar("sc1", 0.1, 0.11, 0.12, false);
	stack.addScrollbar(null, 5.0, -1.0, 20.0, true);
	stack.addScrollbar("sc2", 0.3, -1.0, 2.0, false);

	stack.addScrollRange("scr", 0.4, 0.8, 0.1, 2.12, false).setOnChanged(function(_e) {
		//console.log(_e);
	});


	stack.addScrollPane("s2d:", 0.5, 5.0, 0.0, 1.0, -2.0, 20.0, false).setOnChanged(function(_e) {
		//console.log(_e);
	});


	stack.addColorPicker("color:", [1,0.5,0.5,1], null, "42px").setOnChanged(function(_e) {
		//console.log(_e);
	});

	/*var c=CO.makeGrid();
	var c2=CO.makeStack();
	var c3=CO.makeFlow();
	var c4=CO.makeShelf();
	var c5=CO.makeBox();

	c.setParent(_parent);
	c.setLocation("0px","0px");
	c.setSize(150, 150);
	c.setLabel("grid");


	var sc=c.addScrollbar();
	sc.setRange(0.0, 10.0);
	sc.setInteger(false);
	sc.setLabel("value1");
	sc.onValueChanged=function() {
		console.log(sc.value);
	}

	var bn=c.addButton();
	bn.setSize("100%", "20px");
	bn.setLabel("dosomething"); //autofontsize
	bn.onPress=function() {
		console.log("pressed"+this);
	}

	var cb=c.addComboBox();
	cb.addItem("op1", {}, function() {console.log(this);});
	cb.addItem("op2", []);
	cb.onSelection=function() {

	}

	var ls=c.addList();
	ls.addItem("op1", {}, function() {console.log(this);});
	ls.addItem("op2", []);
	ls.onSelection=function() {

	}

	var sc2=c.addSrollPane();*/
}

CO.quickAddElement=function(_parent, _tag,  _class, _id, _text, _nextelement) {
	var el=document.createElement(_tag);
	if (_class) el.className=_class;
	if (_id) el.id=_id;
	if (_parent) {
		if (_nextelement) _parent.insertBefore(el, _nextelement);
		else _parent.appendChild(el);
	}

	if (_text) {
		el.appendChild(document.createTextNode(_text));
		el.cotext=_text;

		CO.getVariable(el, "cotext").onChange(el, function(e) {
			el.firstChild.nodeValue=el.cotext;
		});
		
	}

	return el;
}

CO.quickAddInput=function(_parent, _type,  _class, _id, _nextelement) {
	var el=document.createElement("input");
	if (_class) el.className=_class;
	if (_id) el.id=_id;
	if (_parent) {
		if (_nextelement) _parent.insertBefore(el, _nextelement);
		else _parent.appendChild(el);
	}

	el.type=_type;

	return el;
}

CO.inherits=function(_sub, _super) {
	_sub.prototype=Object.create(_super.prototype);
	_sub.prototype.constructor=_sub;
}

CO.hasCssClass=function(_element, _class) {
    return ((' ' + _element.className + ' ').indexOf(' ' + _class + ' ') > -1);
}

CO.prependCssClass=function(_element, _class) {
	if (CO.hasCssClass(_element, _class)) return;
	_element.className=_class+" "+_element.className;
}

CO.appendCssClass=function(_element, _class) {
	if (CO.hasCssClass(_element, _class)) return;
    _element.className=_element.className+" "+_class;
}

CO.removeCssClass=function(_element, _class) {
	if (!CO.hasCssClass(_element, _class)) return;

	cname=(' ' + _element.className + ' ').replace(' ' + _class + ' ', ' ');

    _element.className=cname.trim();
}

CO.removeAllChildren=function(_element) {
	while (_element.firstChild) {
	    _element.removeChild(_element.firstChild);
	}
}

CO.stealChildren=function(_source, _destination) {
	while (_source.firstChild) {
		_destination.appendChild(_source.firstChild);
	    //_element.removeChild(_element.firstChild);
	}
}

CO.mouseLocation=function(_event, _element) {
	var rect = _element.getBoundingClientRect();
	return {x:_event.clientX - rect.left, y:_event.clientY - rect.top};
}

//............................................................................
CO.rollUp=function(_element, _interval) {
	if (_element.roll && _element.roll.isUp) return;

	if(!_element.roll) _element.roll={};

	_element.roll.isUp=true;
	_element.roll.offsetHeight=_element.offsetHeight;
	_element.roll.cachedMaxHeight=_element.style.maxHeight;
	_element.roll.cachedDisplay=_element.style.display;


	CO.addNoTransitions(_element);	
	_element.style.maxHeight=_element.roll.offsetHeight+"px";	

	setTimeout(function(){
		if (!_element.roll.isUp) return;
		CO.removeNoTransitions(_element);
		_element.style.maxHeight="0px";
		setTimeout(function() {
			if (!_element.roll.isUp) return;
			_element.style.display="none";			
		},_interval||500);
	},5);
} 

CO.unrollUp=function(_element, _interval) {
	if (!_element.roll || !_element.roll.isUp) return;

	_element.roll.isUp=false;

	_element.style.display=_element.roll.cachedDisplay;

	setTimeout(function() {
		if (_element.roll.isUp) return;
		_element.style.maxHeight=_element.roll.offsetHeight+"px";		

		setTimeout(function(){
			if (_element.roll.isUp) return;
			
			CO.addNoTransitions(_element);	
			_element.style.maxHeight="";//_element.roll.cachedMaxHeight;

			setTimeout(function() {
				if (_element.roll.isUp) return;
				CO.removeNoTransitions(_element);
				
			},2);

		},_interval||500);
	},2);
} 


CO.rollLeft=function(_element, _interval) {
	if (_element.roll && _element.roll.isLeft) return;

	if(!_element.roll) _element.roll={};

	_element.roll.isLeft=true;
	_element.roll.offsetWidth=_element.offsetWidth;
	_element.roll.cachedMaxWidth=_element.style.maxWidth;
	_element.roll.cachedDisplay=_element.style.display;


	CO.addNoTransitions(_element);	
	_element.style.maxWidth=_element.roll.offsetWidth+"px";	

	setTimeout(function(){
		if (!_element.roll.isLeft) return;
		CO.removeNoTransitions(_element);
		_element.style.maxWidth="0px";
		setTimeout(function() {
			if (!_element.roll.isLeft) return;
			_element.style.display="none";			
		},_interval||500);
	},5);
} 

CO.unrollLeft=function(_element, _interval) {
	if (!_element.roll || !_element.roll.isLeft) return;

	
	_element.roll.isLeft=false;
	_element.style.display=_element.roll.cachedDisplay;

	setTimeout(function() {
		if (_element.roll.isLeft) return;
		_element.style.maxWidth=_element.roll.offsetWidth+"px";		

		setTimeout(function(){
			if (_element.roll.isLeft) return;
			CO.addNoTransitions(_element);	
			_element.style.maxWidth="";//_element.roll.cachedMaxWidth;

			setTimeout(function() {
				if (_element.roll.isLeft) return;
				CO.removeNoTransitions(_element);
				
			},2);

		},_interval||500);
	},2);
} 

CO.addNoTransitions=function(_element) {
	CO.prependCssClass(_element, "UINoTransition");	
}

CO.removeNoTransitions=function(_element) {
	CO.removeCssClass(_element, "UINoTransition");
}
//..................................................................Control
CO.UIControl= function(_parent) {
	this.element=document.createElement("div");
	this.element.coopControl=this;

	this.collapsed=false;

	this.outer=this.element;
	this.midClient=null;
	this.client=this.element;
	this.labelContainer=this.element;
	this.table=null;

	this.setParent(_parent);

	this.prependCssClass("UIControl");
}

//.............................................class

CO.UIControl.prototype.hasCssClass=function(_class) {
	return CO.hasCssClass(this.outer, _class);
}

CO.UIControl.prototype.prependCssClass=function(_class) {
	return CO.prependCssClass(this.outer, _class);
}

CO.UIControl.prototype.appendCssClass=function(_class) {
	return CO.appendCssClass(this.outer, _class);
}

CO.UIControl.prototype.removeCssClass=function(_class) {
	return CO.removeCssClass(this.outer, _class);
}

//..............................................easy add
CO.UIControl.prototype.appendChild=function(_child) {
	this.client.appendChild(_child.element || _child);
	this.layout();	
	return this;
}

CO.UIControl.prototype.insertBefore=function(_child, _nextChild) {
	this.client.insertBefore(_child.element || _child, _nextChild.element || _nextChild);
	this.layout();
	return this;
}
//..............................................Layout
CO.UIControl.prototype.layout=function() {
	return this;
}

CO.UIControl.prototype.toggleCollapse=function() {
	this.setCollapsed(!this.collapsed);
	return this;
}

CO.UIControl.prototype.setCollapsed=function(_state) {
	this.collapsed=_state;
	//this.layout();
	return this;
}

CO.UIControl.prototype.setSize=function(_width, _height) {
	this.outer.style.width=_width;
	this.outer.style.height=_height;
	this.layout();
	return this;
}

CO.UIControl.prototype.setLocation=function(_left, _top, _position) {
	this.outer.style.left=_left;
	this.outer.style.top=_top;
	if (_position) this.outer.style.position=_position;
	return this;
}

CO.UIControl.prototype.setStyleProp=function(_prop, _value) {
	this.outer.style[_prop]=_value;
	return this;
}

//"up""down""left""right"
/*CO.UIControl.prototype.setLabelLocation=function(_location) {

	if(!this.table)  this.table=CO.quickAddElement(this.element, "table", "UITable");
	else {
		CO.removeAllChildren(this.table);
	}

	if (_location=="top") {
		var row0=table.insertRow(0);
		var row1=table.insertRow(1);

		var cell0=row0.insertCell(0);
		var cell1=row1.insertCell(0);

		while
	}
	else if (_location=="bottom") {

	}
	else if (_location=="left") {

	}
	else if (_location=="right") {

	}
	else {

	}

	

	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	var cell3=row.insertCell(2);


	if (!_text && !this.label) return;
	if (!this.label) {
		this.label=CO.quickAddElement(this.labelContainer, "div", "UILabel", null, _text, this.labelContainer.firstChild);
		this.layout();
	}
	else {
		this.label.cotext=_text;
	}

	return this;
}*/

CO.UIControl.prototype.setLabel=function(_text) {
	if (!_text && !this.label) return;
	if (!this.label) {
		this.label=CO.quickAddElement(this.labelContainer, "div", "UILabel", null, _text, this.labelContainer.firstChild);
		this.layout();
	}
	else {
		this.label.cotext=_text;
	}

	return this;
}

CO.UIControl.prototype.setIconToImage=function(_image) {
	this.labelContainer.appendChild(_image);

	return this;
}

CO.UIControl.prototype.setIconToFile=function(_imagefile) {
	var img=new Image();
	img.src=_imagefile;

	this.setIconToImage(img);

	return this;
}

CO.UIControl.prototype.setLabelActivation=function(_onmousedown) {
	if (!this.label) {
		this.setLabel("_");
	}

	if (this.label.onmousedown==_onmousedown) return;

	if (!_onmousedown) {
		CO.removeCssClass(this.label, "UIActiveLabel");
		this.label.onmousedown=null;
	}
	else {
		this.label.onmousedown=_onmousedown;
		CO.prependCssClass(this.label, "UIActiveLabel");
	}

	return this;
}

CO.UIControl.prototype.addClient=function() {
	if (this.client!=this.outer) return;
	this.midClient=CO.quickAddElement(this.outer, "div", "UIMidClient");
	this.client=CO.quickAddElement(this.midClient, "div", "UIClient");
	this.layout();

	return this;
}

CO.UIControl.prototype.setClientSize=function(_width, _height) {
	this.client.style.width=_width;
	this.client.style.height=_height;

	return this;
}

CO.UIControl.prototype.setId=function(_id) {
	this.element.id=_id;
	return this;
}
//...........................................parenting

CO.UIControl.prototype.setParent=function(_parent) {
	if (_parent && _parent.appendChild) _parent.appendChild(this.element);

	return this;
}

CO.UIControl.prototype.getParentControl=function() {
	if (this.element.parentNode) return this.element.parentNode.coopControl;
}

CO.UIControl.prototype.getParentNode=function() {
	return this.element.parentNode;
}


//..................................................................Container
CO.UIContainer= function(_parent) {
	CO.UIControl.call(this, _parent);

	this.addClient();

	//jy
	this.onPressed=null;

	var that=this;

	this.element.onmousedown=function(e) {
		if (that.onPressed) {
			that.onPressed.call(that, e);
			e.stopPropagation();
		}

	}
	//jy

	this.prependCssClass("UIContainer");
}

CO.inherits(CO.UIContainer, CO.UIControl);

/*CO.UIContainer.prototype.layout=function() {
	CO.UIControl.prototype.layout.call(this);


	

	return this;
}*/


CO.UIContainer.prototype.setCollapsed=function(_state) {

	if (_state) { 
		CO.rollUp(this.midClient);
	}
	else {
		CO.unrollUp(this.midClient);
	}

	/*var that=this;
	if (_state) { 
		CO.prependCssClass(this.midClient, "UINoTransition");	
		this.midClient.style.maxHeight=this.client.offsetHeight+"px";		


		setTimeout(function(){
			CO.removeCssClass(that.midClient, "UINoTransition");
			that.midClient.style.maxHeight="0px";
		},20);
		
	}
	else {
		this.midClient.style.maxHeight=this.client.offsetHeight+"px";		

		setTimeout(function(){
			CO.prependCssClass(that.midClient, "UINoTransition");
			that.midClient.style.maxHeight="50000px";
		},800);
	}*/


	CO.UIControl.prototype.setCollapsed.call(this, _state);

	return this;
}

CO.UIContainer.prototype.setOnPressed=function(_callbak) { //jy
	this.onPressed=_callbak;
	return this;
}

CO.UIContainer.prototype.setCollapsible=function(_iscollapsible) {
	var that=this;
	if (_iscollapsible) this.setLabelActivation(function() {
		that.toggleCollapse();
	})
	else this.setLabelActivation(null);
	
	return this;
}
//..................................................................Stack
CO.UIStack=function(_parent) {
	CO.UIContainer.call(this, _parent);

	this.prependCssClass("UIStack");
}

CO.inherits(CO.UIStack, CO.UIContainer);

CO.UIControl.prototype.addStack=function(_text, _width, _height) {
	var newc=new CO.UIStack(this);
	newc.setLabel(_text);
	newc.setSize(_width, _height);
	return newc;
}
//..................................................................Grid
CO.UIGrid=function(_parent) {
	CO.UIContainer.call(this, _parent);

	this.columns=2;
	this.rows=[];
	this.table=CO.quickAddElement(this.client, "table", "UITable");
	this.prependCssClass("UIGrid");
}

CO.inherits(CO.UIGrid, CO.UIContainer);

CO.UIGrid.prototype.addRow=function() {
	var row={element:null, cells:[]};
	row.element=this.table.insertRow(-1);
	this.rows.push(row);

	return row;
}

CO.UIGrid.prototype.appendChild=function(_child) {
	//this.client.appendChild(_child.element || _child);
	var row=null;
	if (!this.rows.length) row=this.addRow();
	else row=this.rows[this.rows.length-1];

	if (row.cells.length==this.columns) row=this.addRow();

	var cell=row.element.insertCell(-1);

	var added=_child.element || _child;
	cell.appendChild(added);
	row.cells.push(added);

	this.layout();	
	return this;
}

CO.UIGrid.prototype.insertBefore=function(_child, _nextChild) {
	//this.client.insertBefore(_child.element || _child, _nextChild.element || _nextChild);
	//this.layout();
	return this.appendChild(_child);
}

CO.UIGrid.prototype.setColumns=function(_columns) {
	if (this.columns==_columns) return this;
	this.columns=_columns;
	
	var children=[];
	for (var i=0; i<this.rows.length;++i) {
		for(var j=0; j<this.rows[i].cells.length; ++j) {
			children.push(this.rows[i].cells[j]);
		}
	}


    for(var r=this.rows.length-1; r>=0; --r) {
        this.table.deleteRow(r);
    }

    this.rows.length=0;

	for(var i in children) {
		this.appendChild(children[i]);
	}

	return this;
}


CO.UIControl.prototype.addGrid=function(_text, _columns, _width, _height) {
	var newc=new CO.UIGrid(this);
	newc.setLabel(_text);
	newc.setSize(_width, _height);
	newc.setColumns(_columns);
	return newc;
}
//..................................................................Flow
CO.UIFlow=function(_parent) {

}
//..................................................................Box
CO.UIBox=function(_parent) {

}
//..................................................................Shelf
CO.UIShelf=function(_parent) {
	CO.UIContainer.call(this, _parent);

	//this.table=CO.quickAddElement(this.client, "table", "UITable");
	//this.row=this.table.insertRow(-1);
	this.cells=[];

	this.client.style.overflow="hidden";

	this.cellcounter=1;
	this.prependCssClass("UIShelf");
}

CO.inherits(CO.UIShelf, CO.UIContainer);


CO.UIShelf.prototype.appendChild=function(_child, _name) {
	var cell=CO.quickAddElement(this.client, "div", "UIShelfClosed");//this.row.insertCell(-1);
	cell.cellindex=this.cellcounter++;

	var added=_child.element || _child;

	var txt=_name || ""+cell.cellindex;
	if (_child.label && _child.label.cotext) txt=_child.label.cotext;
	if (_child.coopControl && _child.coopControl.label && _child.coopControl.label.cotext) txt=_child.coopControl.label.cotext;
	cell.mask=CO.quickAddElement(cell, "div", "UIShelfMask", null, txt);


	var that=this;
	cell.mask.onmousedown=function(_e) {
		if (CO.hasCssClass(cell, "UIShelfClosed")) {
			that.openCell(cell.cellindex);
			_e.stopPropagation();
		}
	}

	cell.client=CO.quickAddElement(cell, "div", "UIShelfParent");
	cell.client.appendChild(added);
	//cell.appendChild(added);
	//cell.client=parent;//added;

	this.cells.push(cell);

	//cell.className="UIShelfClosed";

	//CO.rollLeft(cell.client);

	this.layout();	
	return this;
}

CO.UIShelf.prototype.openCell=function(_index) {
	for(var i in this.cells) {
		var c=this.cells[i];
		if (c.cellindex==_index) {
			CO.unrollLeft(c.client);
			c.mask.className="UIShelfMaskOpen";
			//c.className="UIShelfOpen";
			//c.mask.style.display="none";
		}
		else {
			CO.rollLeft(c.client);
			c.mask.className="UIShelfMask";
			//c.className="UIShelfClosed";
			//c.mask.style.display=null;
		}
	}
	
	this.layout();	

	return this;
}

CO.UIShelf.prototype.insertBefore=function(_child, _nextChild) {
	//this.client.insertBefore(_child.element || _child, _nextChild.element || _nextChild);
	//this.layout();
	return this.appendChild(_child);
}


CO.UIShelf.prototype.addShelf=function(_text, _width, _height) {
	var newc=new CO.UIShelf(this);
	newc.setLabel(_text);
	newc.setSize(_width, _height);
	return newc;
}
//..................................................................Tree
CO.UITree=function(_parent) {

}
//..................................................................Button
CO.UIButton=function(_parent) {
	CO.UIControl.call(this, _parent);

	this.onPressed=null;

	var that=this;

	this.element.onmousedown=function(e) {
		if (that.onPressed) {
			that.onPressed.call(that, e);
			e.stopPropagation();
		}

	}

	this.prependCssClass("UIActive");
	this.prependCssClass("UIButton");
}
CO.inherits(CO.UIButton, CO.UIControl);

CO.UIButton.prototype.setOnPressed=function(_callbak) {
	this.onPressed=_callbak;
	return this;
}

CO.UIButton.prototype.setLabel=function(_text) {
	CO.UIControl.prototype.setLabel.call(this, _text);

	if (this.label) {
		CO.prependCssClass(this.label, "UIActiveLabel");
	}

	return this;
}

CO.UIControl.prototype.addButton=function(_text, _width, _height) {
	var newc=new CO.UIButton(this);
	newc.setLabel(_text);
	newc.setSize(_width, _height);

	return newc;
}
//..................................................................Check
CO.UICheck=function(_parent) {
	CO.UIControl.call(this, _parent);

	this.onChanged=null;
	this.checked=true;


	var table=CO.quickAddElement(this.element, "table", "UITable");
	var row=table.insertRow(0);
	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);

	//this.textInput=CO.quickAddInput(cell2, "text",  "UITextInputBox");
	this.labelContainer=cell1;


	this.setLabel("_");
	this.check=CO.quickAddElement(cell2, "div",  "UICheckBox", null, "0");

	var that=this;

	CO.getVariable(this, "checked")
	.onChange(this, function (_data) {
		that.update();
		if (that.onChanged) that.onChanged.call(that, that.checked);
	});


	this.element.onmousedown=function(e) {
			that.toggle();
			e.stopPropagation();
	}

	this.prependCssClass("UIActive");
	this.prependCssClass("UICheck");

	this.update();
}

CO.inherits(CO.UICheck, CO.UIControl);

CO.UICheck.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	return this;
}

CO.UICheck.prototype.toggle=function() {
	this.setCheck(!this.checked);
	return this;
}

CO.UICheck.prototype.setCheck=function(_value) {
	this.checked=_value;
	return this;
}

CO.UICheck.prototype.update=function() {
	if (this.checked) {
		this.check.cotext="[x]";
	}
	else {
		this.check.cotext="[_]";
	}

	return this;
}


CO.UIControl.prototype.addCheck=function(_text, _width, _height) {
	var newc=new CO.UICheck(this);
	newc.setLabel(_text);
	newc.setSize(_width, _height);
	return newc;
}
//..................................................................TextInput
CO.UITextInput=function(_parent) {
	CO.UIControl.call(this, _parent);

	var table=CO.quickAddElement(this.element, "table", "UITable");
	var row=table.insertRow(0);
	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);

	this.textInput=CO.quickAddInput(cell2, "text",  "UITextInputBox");
	this.labelContainer=cell1;

	this.onChanged=null;
	this.onCommited=null;
	this.onType=null;

	this.text="_"; //this is the confirmed text

	var that=this;

	CO.getVariable(this, "text").onChange(this, function(e){
		if (that.textInput.value!=that.text) 
			that.textInput.value=that.text;
	});

	this.textInput.onchange=function() {
		if (that.onChanged) 
		{
			that.onChanged(that.textInput.value);
			that.text=that.textInput.value;
		}
		//if (that.onChanged && that.onChanged(that.textInput.value))  that.text=that.textInput.value;
	}


	$(this.textInput).keydown(function(e) {
	  	var key;
		if (window.event) key = window.event.keyCode;
		else if (e) key = e.which;

		if (key==13 || key==9) {
			/*if (that.onCommited)  {
				if (that.onCommited(that.textInput.value))
					that.text=that.textInput.value;
				else 
					that.textInput.value=that.text;
			}*/
			that.textInput.blur();
		}
		else if (key==27) {
			that.textInput.value=that.text;
			that.textInput.blur();
		}
		else {
			if (that.onType) 
				that.onType(that.textInput.value);
		}
	});

	this.textInput.onblur=function() {
		that.validate();		
	};

	//this.that = that; //jy

	this.prependCssClass("UITextInput");
}


CO.inherits(CO.UITextInput, CO.UIControl);

CO.UITextInput.prototype.validate=function() {
	var enteredvalue=this.textInput.value;
	var currentvalue=this.text;

	if (this.isNumeric) {
		if (isNaN(enteredvalue)) {
			this.textInput.value=this.text;
			return this;
		}

		enteredvalue=Number(enteredvalue);

		if (this.min!==undefined && enteredvalue<this.min) enteredvalue=this.min; 
		if (this.max!==undefined && enteredvalue>this.max) enteredvalue=this.max;

		if (this.isInteger) {
			enteredvalue=Math.floor(enteredvalue+0.5);
		}

	}

	if (this.onCommited)  {
		
		var result=this.onCommited(enteredvalue);
		
		if (result || result===undefined) {
			this.text=enteredvalue;
			this.textInput.value=this.text;
		}
		//else 
			//this.textInput.value=this.text;
	}
	else {
		this.text=enteredvalue;
	}

	return this;
}

CO.UITextInput.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	return this;
}

CO.UITextInput.prototype.update=function(_v) //jy
{
	console.log(_v);
	this.text = _v;
	this.textInput.value = _v;
	//this.textInput.onchange();
	//return this;
}

CO.UITextInput.prototype.setOnCommited=function(_callbak) {
	this.onCommited=_callbak;
	return this;
}

CO.UITextInput.prototype.setOnType=function(_callbak) {
	this.onType=_callbak;
	return this;
}

/*CO.UITextInput.prototype.makeNumeric=function(_isinteger, _min, _max) {
	this.isNumeric=true;
	this.isInteger=_isinteger||false;
	if (_min==null || _min==undefined) this.min=undefined;
	else this.min=_min;
	if (_max==null || _max==undefined) this.max=undefined;
	else this.max=_max;

	if (isNaN(this.text)) this.text=0;

	return this;
}*/

CO.UITextInput.prototype.makeNumeric=function(_isinteger, _min, _max, _fallback) { //jy
	this.isNumeric=true;
	this.isInteger=_isinteger||false;
	if (_min==null || _min==undefined) this.min=undefined;
	else this.min=_min;
	if (_max==null || _max==undefined) this.max=undefined;
	else this.max=_max;

	if (isNaN(this.text)) this.text=_fallback;

	return this;
}

CO.UITextInput.prototype.makePlainText=function() {
	this.isNumeric=false;
	return this;
}

CO.UIControl.prototype.addTextInput=function(_text, _label, _width, _height) {
	var newc=new CO.UITextInput(this);
	newc.setLabel(_label);
	newc.setSize(_width, _height);
	newc.text=_text;
	//newc.textInput.value=_text;
	return newc;
}


//..................................................................List
CO.UIList=function(_parent) {
	CO.UIControl.call(this, _parent);

	var table=CO.quickAddElement(this.element, "table", "UITable");
	var row1=table.insertRow(0);
	var row2=table.insertRow(1);

	this.listbox=CO.quickAddElement(row2, "div",  "UIListBox");
	this.labelContainer=row1;

	this.onChanged=null;
	this.selectedItem=null;
	this.onItemRemoved=null;

	this.prependCssClass("UIList");
}

CO.inherits(CO.UIList, CO.UIControl);

CO.UIList.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	return this;
}



CO.UIList.prototype.addItem=function(_name, _data, _element, _removable) {
	var itemelement=CO.quickAddElement(this.listbox, "div", "UIListItem");

	var that=this;

	if (!_element && !_removable) {
		itemelement.appendChild(document.createTextNode(_name));
	}
	else {
		var table=CO.quickAddElement(itemelement, "table", "UITable");
		var row=table.insertRow(0);
		var cell1=row.insertCell(0);
		var cell2=row.insertCell(1);
		

		if (_name) cell1.appendChild(document.createTextNode(_name));
		if (_element) cell2.appendChild(_element);
		if (_removable) {
			var cell3=row.insertCell(2);
			var remover=CO.quickAddElement(cell3, "div", "UIItemRemover", null, "x");

			cell3.appendChild(remover);
			remover.onmousedown=function(e) {
				that.removeElement(itemelement);
				e.stopPropagation();
			}
		}

	}
	

	//if (_element) itemelement.appendChild(_element);

	var item={name:_name, data:_data||null, element:itemelement||null, removable:_removable||false};

	itemelement.listBoxItem=item;

	this.listbox.appendChild(itemelement);

	
	itemelement.onmousedown=function(e) {
		that.selectByElement(itemelement);
	}



	return item;
}

CO.UIList.prototype.addItems=function(_items) {
	for(var i in _items) {
		this.addItem(_items[i].name, _items[i].data, _items[i].element, _items[i].removable);
	}

	return this;
}

CO.UIList.prototype.findByIndex=function(_index) {
	var items = this.listbox.childNodes;

	if (_index>=0 && _index<items.length) return items[_index].listBoxItem;

	return null;
}

CO.UIList.prototype.findByName=function(_name) {
	var items = this.listbox.childNodes;

	for(var i=0; i < items.length; i++)
	 {
	     if (items[i].listBoxItem.name==_name) return items[i].listBoxItem;
	 }

	return null;
}

CO.UIList.prototype.findByData=function(_object) {
	var items = this.listbox.childNodes;

	for(var i=0; i < items.length; i++)
	 {
	     if (items[i].listBoxItem.data==_object) return items[i].listBoxItem;
	 }

	return null;
}


CO.UIList.prototype.selectByIndex=function(_index) {
	this.selectByItem(this.findByIndex(_index));

	return this;
}

CO.UIList.prototype.selectByName=function(_name) {
	this.selectByItem(this.findByName(_name));
	return this;
}

CO.UIList.prototype.selectByData=function(_object) {
	this.selectByItem(this.findByData(_object));
	return this;
}

CO.UIList.prototype.selectByElement=function(_element) {
	var selitem=null;
	if (_element!=null) selitem=_element.listBoxItem;

	this.selectByItem(selitem);

	return this;
}

CO.UIList.prototype.selectByItem=function(_item) {

	if (this.selectedItem==_item) return this;

	if (this.selectedItem) CO.removeCssClass(this.selectedItem.element, "UISelected");

	this.selectedItem=_item;
	if (this.selectedItem)
		CO.prependCssClass(this.selectedItem.element, "UISelected");

	if (this.onChanged) {
		this.onChanged.call(this, this.selectedItem);
	}

	return this;
}

CO.UIList.prototype.removeElement=function(_element) {
	if (!_element) return;

	if (this.selectedItem==_element.listBoxItem) {
		this.selectByElement(null);
	}

	CO.prependCssClass(_element, "UINoTransition");
	_element.style.height=_element.offsetHeight+"px";
	_element.style.width=_element.offsetWidth+"px";

	var that=this;
	
	setTimeout(function(){
		CO.removeCssClass(_element, "UINoTransition");
		_element.style.height="0px";
		_element.style.width="0px";
		setTimeout(function(){
			that.listbox.removeChild(_element);
		}, 500);
	}, 20);

	//this.listbox.removeChild(_element);

	if (this.onItemRemoved) {
		this.onItemRemoved.call(this, _element.listBoxItem);
	}

	return this;
}

CO.UIList.prototype.setBoxHeight=function(_height) {
	this.listbox.style.height=_height;
	return this;
}

CO.UIControl.prototype.addList=function(_items, _label, _boxheight, _width, _height) {
	var newc=new CO.UIList(this);
	newc.setLabel(_label);
	newc.addItems(_items);
	newc.setSize(_width, _height);
	newc.setBoxHeight(_boxheight);

	return newc;
}
//..................................................................Combo
CO.UICombo=function(_parent) {
	CO.UIControl.call(this, _parent);

	var table=CO.quickAddElement(this.element, "table", "UITable");
	var row=table.insertRow(0);

	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	var cell3=row.insertCell(2);

	this.labelContainer=cell1;

	var that=this;

	this.textInput=new CO.UITextInput(cell2);

	this.button=new CO.UIButton(cell3);
	this.button.setSize("12px", "12px");
	this.button.setLabel(".^.");
	this.button.onPressed=function() {
		that.toggleList();
	}

	this.popup=new CO.UIPopUp(document.body);

	this.list=new CO.UIList(this.popup);//document.body);

	
	this.onChanged=null;
	this.list.onChanged=function(_item) {
		that.hideList();
		if (_item) that.textInput.text=_item.name;
		else that.textInput.text="";
		if (that.onChanged) that.onChanged.call(that, _item);
	}

	this.textInput.element.onmousedown=function() {
		that.showList();
	}

	this.textInput.onCommited=function(_enteredtext) {
		
		console.log("onCommited: "+_enteredtext);

		var sitem=that.list.findByName(_enteredtext);
		if (sitem) {
			that.list.selectByElement(sitem.element);
		}

		if (that.list.selectedItem) {
			that.textInput.text=that.list.selectedItem.name;
		}
		else {
			that.textInput.text=" ";
		}


		return false;
	}

	this.targetHeight="100px";

	this.hideList();

}

CO.inherits(CO.UICombo, CO.UIControl);

CO.UICombo.prototype.toggleList=function() {
	if (this.isListVisible()) this.hideList();
	else this.showList();
	//this.popup.toggle();
	return this;
}

CO.UICombo.prototype.showList=function() {
	//this.list.element.style.display="block";
	this.popup.show();
	var rect=this.textInput.element.getBoundingClientRect();

	this.popup.setLocation(rect.left+"px", rect.bottom+"px");
	//this.list.element.style.width="200px";//this.textInput.offsetWidth+"px";

	this.list.setSize(this.textInput.element.offsetWidth+"px", null);
	this.list.element.style.height=this.targetHeight;
	//this.list.setBoxHeight(this.targetHeight);
	return this;
}

CO.UICombo.prototype.hideList=function() {
	//this.list.element.style.display="none";
	
	//this.list.setBoxHeight(0+"px");
	this.list.element.style.height="0px";
	var that=this;
	setTimeout(function(){that.popup.hide();}, 200);
	//this.popup.hide();
	return this;
}

CO.UICombo.prototype.isListVisible=function() {
	return this.popup.isVisible();
	//return this.list.element.style.display!="none";
}

CO.UICombo.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	
	return this;
}

CO.UIControl.prototype.addCombo=function(_items, _label, _listheight, _width, _height) {
	var newc=new CO.UICombo(this);

	newc.setLabel(_label);
	newc.setSize(_width, _height);

	newc.list.addItems(_items);
	newc.list.setBoxHeight(_listheight);

	newc.targetHeight=_listheight;

	return newc;
}
//..................................................................Combo
CO.UIPopUp=function(_parent) {
	CO.UIControl.call(this, _parent);

	CO.prependCssClass(this.element, "UIPopUp");
}

CO.inherits(CO.UIPopUp, CO.UIControl);

CO.UIPopUp.prototype.toggle=function() {
	if (this.isVisible()) this.hide();
	else this.show();
	return this;
}

CO.UIPopUp.prototype.show=function() {
	this.element.style.display="block";
	return this;
}

CO.UIPopUp.prototype.hide=function() {
	this.element.style.display="none";
	return this;
}

CO.UIPopUp.prototype.isVisible=function() {
	return this.element.style.display!="none";
}

//.............................................................Canvas helper
CO.createCanvas2d=function(_parent, _width, _height, _class, _id) {
	var canvas=document.createElement("canvas");
	canvas.width=_width;
	canvas.height=_height;
	if (_class) canvas.className=_class;
	if (_id) canvas.id=_id;

	var graphics=canvas.getContext('2d');

	_parent.appendChild(canvas);

	return graphics;
}
//..................................................................Scrollbar


CO.UIScrollbar=function(_parent) {
	CO.UIControl.call(this, _parent);	

	this.graph=CO.createCanvas2d(this.element, this.element.offsetWidth, this.element.offsetHeight);
	this.canvas=this.graph.canvas;
	this.canvas.className="UIScrollbarCanvas";

	this.min=0.0;
	this.max=1.0;
	this.isInteger=false;
	this.value=0.5;
	this.onChanged=null;

	var that=this;




	CO.getVariable(this, "value").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, that.value);
		that.update();
	});

	CO.getVariable(this, "min").onChange(this, function(e){
		that.update();
	});

	CO.getVariable(this, "max").onChange(this, function(e){
		that.update();
	});

	CO.getVariable(this, "isInteger").onChange(this, function(e){
		that.update();
	});

	CO.prependCssClass(this.element, "UIScrollbar");

	this.canvas.onmousedown=function(_e) {       
		CO.captureMouse(that);
		that.value=that.x2Value(CO.mouseLocation(_e, that.canvas) .x);
	}

	var cstyle=window.getComputedStyle(this.canvas, null);
	this.fontFamily=cstyle.fontFamily;
	this.barColor=cstyle.color;
	this.textColor="#000000";
	this.fontSize=cstyle.fontSize;


	that.canvas.width=that.element.offsetWidth;
	that.canvas.height=that.element.offsetHeight;
	this.element.onresize=function(_e) {
		that.canvas.width=that.element.offsetWidth;
		that.canvas.height=that.element.offsetHeight;
	}
}

CO.inherits(CO.UIScrollbar, CO.UIControl);

CO.UIScrollbar.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	return this;
}

CO.UIScrollbar.prototype.onMouseUp=function(_e) {
	CO.releaseMouse(this);
}

CO.UIScrollbar.prototype.onMouseMove=function(_e) {
	this.value=this.x2Value(CO.mouseLocation(_e, this.canvas).x);
}

CO.UIScrollbar.prototype.x2Value=function(_x) {
	return (_x/this.canvas.offsetWidth)*(this.max-this.min)+this.min;
}

CO.UIScrollbar.prototype.value2X=function(_v) {
	return ((_v-this.min)/(this.max-this.min))*this.canvas.width;
	return this;
}


CO.UIScrollbar.prototype.update=function() {
	if (this.value<Math.min(this.min, this.max)) this.value=Math.min(this.min, this.max);
	if (this.value>Math.max(this.min, this.max)) this.value=Math.max(this.min, this.max);

	if (this.isInteger) this.value=Math.floor(this.value+0.5);

	this.round=100.0;
	
	var diff=Math.abs(this.max-this.min);
	if (diff<0.5) {
		this.round=Math.log(diff)/Math.log(10);
		this.round=2.0-Math.round(this.round);
		this.round=Math.pow(10.0, this.round);
	}

	this.redraw();
	return this;
}

CO.UIScrollbar.prototype.redraw=function() {

	var w=this.canvas.width;
	var h=this.canvas.height;

	this.graph.clearRect(0,0,w,h);
	var nv=(this.value-this.min)/(this.max-this.min);

	var np=nv*w;


	this.graph.fillStyle=this.barColor;
	this.graph.fillRect(0,h*0.2,np,h*0.6);

	

	this.graph.strokeStyle="#000000";
	this.graph.lineWidth=0.5;

	var lh=Math.round(h*0.2)+0.5;
	this.graph.beginPath();
	this.graph.moveTo(0.0, lh);
	this.graph.lineTo(w, lh);

	this.graph.moveTo(np, h*0.2);
	this.graph.lineTo(np, h*0.8);

	this.graph.stroke();

	this.graph.font=this.fontSize+" "+this.fontFamily;
	this.graph.fillStyle=this.textColor;
	this.graph.fillText(Math.round(this.value*this.round)/this.round, 2,h*0.75);

	return this;
}

CO.UIScrollbar.prototype.setMin=function(_min) {
	if (_min!=null && _min!=undefined && !isNaN(_min)) this.min=Number(_min);
	return this;
}

CO.UIScrollbar.prototype.setMax=function(_max) {
	if (_max!=null && _max!=undefined && !isNaN(_max)) this.max=Number(_max);
	return this;
}

CO.UIScrollbar.prototype.setExtents=function(_min, _max) {
	if (_min!=null && _min!=undefined && !isNaN(_min)) this.min=Number(_min);
	if (_max!=null && _max!=undefined && !isNaN(_max)) this.max=Number(_max);
	return this;
}

CO.UIScrollbar.prototype.setValue=function(_value) {
	if (_value==null || _value==undefined || isNaN(_value)) return;
	this.value=Number(_value);
	return this;
}

CO.UIScrollbar.prototype.setInteger=function(_integer) {
	this.isInteger=_integer;
	return this;
}

CO.UIControl.prototype.addScrollbar=function(_label, _value, _min, _max, _isInteger, _width, _height) {
	var newc=new CO.UIScrollbar(this);
	newc.setLabel(_label);
	
	newc.setSize(_width, _height);
	newc.setExtents(_min, _max).setInteger(_isInteger||false).setValue(_value);

	return newc;
}
//..................................................................Scrollbar
CO.UIScrollRange=function(_parent) {
	CO.UIControl.call(this, _parent);	

	this.graph=CO.createCanvas2d(this.element, this.element.offsetWidth, this.element.offsetHeight);
	this.canvas=this.graph.canvas;
	this.canvas.className="UIScrollRangeCanvas";

	this.min=0.0;
	this.max=1.0;

	this.isInteger=false;
	this.value0=0.5;
	this.value1=0.5;
	this.onChanged=null;

	var that=this;

	CO.getVariable(this, "value0").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, {min:that.value0, max:that.value1});
		that.update();
	});

	CO.getVariable(this, "value1").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, {min:that.value0, max:that.value1});
		that.update();
	});


	CO.getVariable(this, "min").onChange(this, function(e){
		that.update();
	});

	CO.getVariable(this, "max").onChange(this, function(e){
		that.update();
	});

	CO.getVariable(this, "isInteger").onChange(this, function(e){
		that.update();
	});

	CO.prependCssClass(this.element, "UIScrollRange");

	this.moving=0;

	this.canvas.onmousedown=function(_e) {       
		CO.captureMouse(that);
		var mousev=that.x2Value(CO.mouseLocation(_e, that.canvas).x);
		if (Math.abs(mousev-that.value0)<Math.abs(mousev-that.value1)) {
			that.moving=0;
			that.value0=mousev;
		}
		else {
			that.moving=1;
			that.value1=mousev;
		}
		
	}

	var cstyle=window.getComputedStyle(this.canvas, null);
	this.fontFamily=cstyle.fontFamily;
	this.barColor=cstyle.color;
	this.textColor="#000000";
	this.fontSize=cstyle.fontSize;


	that.canvas.width=that.element.offsetWidth;
	that.canvas.height=that.element.offsetHeight;
	this.element.onresize=function(_e) {
		that.canvas.width=that.element.offsetWidth;
		that.canvas.height=that.element.offsetHeight;
	}
}

CO.inherits(CO.UIScrollRange, CO.UIControl);

CO.UIScrollRange.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	return this;
}

CO.UIScrollRange.prototype.onMouseUp=function(_e) {
	CO.releaseMouse(this);
}

CO.UIScrollRange.prototype.onMouseMove=function(_e) {

	if (this.moving==0) {
		this.value0=this.x2Value(CO.mouseLocation(_e, this.canvas).x);
	}
	else {
		this.value1=this.x2Value(CO.mouseLocation(_e, this.canvas).x);
	}
}

CO.UIScrollRange.prototype.x2Value=function(_x) {
	return (_x/this.canvas.offsetWidth)*(this.max-this.min)+this.min;
}

CO.UIScrollRange.prototype.value2X=function(_v) {
	return ((_v-this.min)/(this.max-this.min))*this.canvas.width;
	return this;
}


CO.UIScrollRange.prototype.update=function() {
	if (this.value0<Math.min(this.min, this.max)) this.value0=Math.min(this.min, this.max);
	if (this.value0>Math.max(this.min, this.max)) this.value0=Math.max(this.min, this.max);

	if (this.value1<Math.min(this.min, this.max)) this.value1=Math.min(this.min, this.max);
	if (this.value1>Math.max(this.min, this.max)) this.value1=Math.max(this.min, this.max);

	if (this.isInteger) {
		this.value0=Math.floor(this.value0+0.5);
		this.value1=Math.floor(this.value1+0.5);
	}

	this.round=100.0;
	
	var diff=Math.abs(this.max-this.min);
	if (diff<0.5) {
		this.round=Math.log(diff)/Math.log(10);
		this.round=2.0-Math.round(this.round);
		this.round=Math.pow(10.0, this.round);
	}

	this.redraw();
	return this;
}

CO.UIScrollRange.prototype.redraw=function() {

	var w=this.canvas.width;
	var h=this.canvas.height;

	this.graph.clearRect(0,0,w,h);
	var nv0=(this.value0-this.min)/(this.max-this.min);
	var nv1=(this.value1-this.min)/(this.max-this.min);

	var np0=nv0*w;
	var np1=nv1*w;


	this.graph.fillStyle=this.barColor;
	this.graph.fillRect(np0,h*0.2,np1-np0,h*0.6);

	
	this.graph.strokeStyle="#000000";
	this.graph.lineWidth=0.5;

	var lh=Math.round(h*0.2)+0.5;
	this.graph.beginPath();
	this.graph.moveTo(0.0, lh);
	this.graph.lineTo(w, lh);

	this.graph.moveTo(np0, h*0.2);
	this.graph.lineTo(np0, h*0.8);

	this.graph.moveTo(np1, h*0.2);
	this.graph.lineTo(np1, h*0.8);

	this.graph.stroke();

	this.graph.font=this.fontSize+" "+this.fontFamily;
	this.graph.fillStyle=this.textColor;

	var text0=Math.round(this.value0*this.round)/this.round;
	var text1=Math.round(this.value1*this.round)/this.round;
	this.graph.fillText(text0+" to "+text1, 2,h*0.75);

	return this;
}

CO.UIScrollRange.prototype.setMin=function(_min) {
	if (_min!=null && _min!=undefined && !isNaN(_min)) this.min=Number(_min);
	return this;
}

CO.UIScrollRange.prototype.setMax=function(_max) {
	if (_max!=null && _max!=undefined && !isNaN(_max)) this.max=Number(_max);
	return this;
}

CO.UIScrollRange.prototype.setExtents=function(_min, _max) {
	if (_min!=null && _min!=undefined && !isNaN(_min)) this.min=Number(_min);
	if (_max!=null && _max!=undefined && !isNaN(_max)) this.max=Number(_max);
	return this;
}

CO.UIScrollRange.prototype.setValue0=function(_value0) {
	if (_value0==null || _value0==undefined || isNaN(_value0)) return;
	this.value0=Number(_value0);
	return this;
}

CO.UIScrollRange.prototype.setValue1=function(_value1) {
	if (_value1==null || _value1==undefined || isNaN(_value1)) return;
	this.value1=Number(_value1);
	return this;
}

CO.UIScrollRange.prototype.setInteger=function(_integer) {
	this.isInteger=_integer;
	return this;
}

CO.UIControl.prototype.addScrollRange=function(_label, _value0, _value1, _min, _max, _isInteger, _width, _height) {
	var newc=new CO.UIScrollRange(this);
	newc.setLabel(_label);
	
	newc.setSize(_width, _height);
	newc.setExtents(_min, _max).setInteger(_isInteger||false).setValue0(_value0).setValue1(_value1);

	return newc;
}
//..................................................................ScrollPane
CO.UIScrollPane=function(_parent) {
	CO.UIControl.call(this, _parent);	

	this.graph=CO.createCanvas2d(this.element, this.element.offsetWidth, this.element.offsetHeight);
	this.canvas=this.graph.canvas;
	this.canvas.className="UIScrollPaneCanvas";

	this.minx=0.0;
	this.maxx=1.0;
	this.miny=0.0;
	this.maxy=1.0;
	this.isInteger=false;
	this.valuex=0.5;
	this.valuey=0.5;
	this.onChanged=null;

	var that=this;


	CO.getVariable(this, "valuex").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, {x:that.valuex, y:that.valuey});
		that.update();
	});

	CO.getVariable(this, "valuey").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, {x:that.valuex, y:that.valuey});
		that.update();
	});


	CO.getVariable(this, "minx").onChange(this, function(e){
		that.update();
	});

	CO.getVariable(this, "maxx").onChange(this, function(e){
		that.update();
	});

	CO.getVariable(this, "miny").onChange(this, function(e){
		that.update();
	});

	CO.getVariable(this, "maxy").onChange(this, function(e){
		that.update();
	});

	CO.getVariable(this, "isInteger").onChange(this, function(e){
		that.update();
	});

	CO.prependCssClass(this.element, "UIScrollPane");

	this.canvas.onmousedown=function(_e) {       
		CO.captureMouse(that);
		var loc=CO.mouseLocation(_e, that.canvas);
		that.valuex=that.x2Value(loc.x);
		that.valuey=that.y2Value(loc.y);
	}

	var cstyle=window.getComputedStyle(this.canvas, null);
	this.fontFamily=cstyle.fontFamily;
	this.barColor=cstyle.color;
	this.textColor="#000000";
	this.fontSize=cstyle.fontSize;


	that.canvas.width=that.canvas.offsetWidth;
	that.canvas.height=that.canvas.offsetHeight;
	this.element.onresize=function(_e) {
		that.canvas.width=that.canvas.offsetWidth;
		that.canvas.height=that.canvas.offsetHeight;
	}
}


CO.inherits(CO.UIScrollPane, CO.UIControl);

CO.UIScrollPane.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	return this;
}

CO.UIScrollPane.prototype.onMouseUp=function(_e) {
	CO.releaseMouse(this);
}

CO.UIScrollPane.prototype.onMouseMove=function(_e) {
	var loc=CO.mouseLocation(_e, this.canvas);
	this.valuex=this.x2Value(loc.x);
	this.valuey=this.y2Value(loc.y);		
}

CO.UIScrollPane.prototype.x2Value=function(_x) {
	return (_x/this.canvas.offsetWidth)*(this.maxx-this.minx)+this.minx;
}

CO.UIScrollPane.prototype.value2X=function(_v) {
	return ((_v-this.minx)/(this.maxx-this.minx))*this.canvas.width;
	return this;
}

CO.UIScrollPane.prototype.y2Value=function(_y) {
	return ((this.canvas.offsetHeight-_y)/this.canvas.offsetHeight)*(this.maxy-this.miny)+this.miny;
}

CO.UIScrollPane.prototype.value2Y=function(_v) {
	return (1.0-((_v-this.miny)/(this.maxy-this.miny)))*this.canvas.height;
	return this;
}


CO.UIScrollPane.prototype.update=function() {
	if (this.valuex<Math.min(this.minx, this.maxx)) this.valuex=Math.min(this.minx, this.maxx);
	if (this.valuex>Math.max(this.minx, this.maxx)) this.valuex=Math.max(this.minx, this.maxx);

	if (this.valuey<Math.min(this.miny, this.maxy)) this.valuey=Math.min(this.miny, this.maxy);
	if (this.valuey>Math.max(this.miny, this.maxy)) this.valuey=Math.max(this.miny, this.maxy);

	if (this.isInteger) {
		this.valuex=Math.floor(this.valuex+0.5);
		this.valuey=Math.floor(this.valuey+0.5);
	}

	this.roundx=100.0;
	this.roundy=100.0;
	
	var diffx=Math.abs(this.maxx-this.minx);
	if (diffx<0.5) {
		this.roundx=Math.log(diffx)/Math.log(10);
		this.roundx=2.0-Math.round(this.roundx);
		this.roundx=Math.pow(10.0, this.roundx);
	}

	var diffy=Math.abs(this.maxy-this.miny);
	if (diffy<0.5) {
		this.roundy=Math.log(diffy)/Math.log(10);
		this.roundy=2.0-Math.round(this.roundy);
		this.roundy=Math.pow(10.0, this.roundy);
	}

	this.redraw();
	return this;
}

CO.UIScrollPane.prototype.redraw=function() {

	var w=this.canvas.width;
	var h=this.canvas.height;

	this.graph.clearRect(0,0,w,h);
	var nvx=(this.valuex-this.minx)/(this.maxx-this.minx);
	var nvy=(this.valuey-this.miny)/(this.maxy-this.miny);

	var npx=nvx*w;
	var npy=nvy*h;


	this.graph.fillStyle=this.barColor;
	this.graph.fillRect(0,h-npy,npx,npy);

	this.graph.strokeStyle="rgba(0,0,0,0.3)";
	this.graph.strokeRect(0, 0, w, h);
	

	this.graph.strokeStyle="rgba(0,0,0,0.3)";
	this.graph.lineWidth=1.0;


	this.graph.beginPath();

	this.graph.moveTo(0.0, Math.round(h-npy)+0.5);
	this.graph.lineTo(w, Math.round(h-npy)+0.5);

	this.graph.moveTo(Math.round(npx)+0.5, 0);
	this.graph.lineTo(Math.round(npx)+0.5, h);

	this.graph.stroke();

	this.graph.font=this.fontSize+" "+this.fontFamily;
	this.graph.fillStyle=this.textColor;

	var textx=Math.round(this.valuex*this.roundx)/this.roundx;
	var texty=Math.round(this.valuey*this.roundy)/this.roundy;
	this.graph.fillText(textx, 2,h);
	this.graph.fillText(texty, 2,10);


	return this;
}

CO.UIScrollPane.prototype.setMinx=function(_minx) {
	if (_minx!=null && _minx!=undefined && !isNaN(_minx)) this.minx=Number(_minx);
	return this;
}

CO.UIScrollPane.prototype.setMaxx=function(_maxx) {
	if (_maxx!=null && _maxx!=undefined && !isNaN(_maxx)) this.maxx=Number(_maxx);
	return this;
}

CO.UIScrollPane.prototype.setMiny=function(_miny) {
	if (_miny!=null && _miny!=undefined && !isNaN(_miny)) this.miny=Number(_miny);
	return this;
}

CO.UIScrollPane.prototype.setMaxy=function(_maxy) {
	if (_maxy!=null && _maxy!=undefined && !isNaN(_maxy)) this.maxy=Number(_maxy);
	return this;
}

CO.UIScrollPane.prototype.setExtents=function(_minx, _maxx, _miny, _maxy) {
	this.setMinx(_minx);
	this.setMaxx(_maxx);
	this.setMiny(_miny);
	this.setMaxy(_maxy);
	return this;
}

CO.UIScrollPane.prototype.setValue=function(_valuex, _valuey) {
	if (_valuex!=null && _valuex!=undefined && !isNaN(_valuex))
		this.valuex=Number(_valuex);

	if (_valuey!=null && _valuey!=undefined && !isNaN(_valuey))
		this.valuey=Number(_valuey);

	return this;
}

CO.UIScrollPane.prototype.setInteger=function(_integer) {
	this.isInteger=_integer;
	return this;
}

CO.UIControl.prototype.addScrollPane=function(_label, _valuex, _valuey, _minx, _maxx, _miny, _maxy, _isInteger, _width, _height) {
	var newc=new CO.UIScrollPane(this);
	newc.setLabel(_label);
	
	newc.setSize(_width, _height);
	newc.setExtents(_minx, _maxx, _miny, _maxy).setInteger(_isInteger||false).setValue(_valuex, _valuey);

	return newc;
}
//..................................................................Rectangle

CO.Rectangle=function(_x, _y, _w, _h) {
	this.x=_x;
	this.y=_y;
	this.width=_w;
	this.height=_h;
}

CO.Rectangle.prototype.isPointInside=function(_x, _y) {
	return (_x>=this.x && _x<=(this.x+this.width) && _y>=this.y && _y<=(this.y+this.height));
}

CO.Rectangle.prototype.set=function(_x, _y, _w, _h) {
	this.x=_x;
	this.y=_y;
	this.width=_w;
	this.height=_h;
}

CO.Rectangle.prototype.getNormalized=function(_x, _y) {
	return {x: (_x-this.x)/this.width, y: (_y-this.y)/this.height};
}

//.....................................................miniscroll
CO.UIMiniScroll=function(_parent, _class) {
	this.element=document.createElement("div");	
	CO.prependCssClass(this.element, "UIMiniScroll");

	this.elementBar=document.createElement("div");
	CO.prependCssClass(this.elementBar, "UIMiniScrollBar");
	if (_class) CO.prependCssClass(this.elementBar, _class);

	_parent.appendChild(this.element);
	this.element.appendChild(this.elementBar);

	this.value=0.5;
	this.onchanged=null;

	this.isVertical=true;

	var that=this;

	CO.getVariable(this, "value").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, that.value);
		that.update();
	});

	
	this.element.onmousedown=function(_e) {       
		CO.captureMouse(that);
		that.value=that.xy2Value(CO.mouseLocation(_e, that.element));
	}

	this.update();
}

CO.UIMiniScroll.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	return this;
}

CO.UIMiniScroll.prototype.setVertical=function(_isVertical) {
	this.isVertical=_isVertical;
	return this;
}

CO.UIMiniScroll.prototype.onMouseUp=function(_e) {
	CO.releaseMouse(this);
}

CO.UIMiniScroll.prototype.onMouseMove=function(_e) {
	this.value=this.xy2Value(CO.mouseLocation(_e, this.element));
}

CO.UIMiniScroll.prototype.xy2Value=function(_e) {
	var v=0.0;
	if (this.isVertical) {
		v=1.0-(_e.y/this.element.offsetHeight);
	}
	else {
		v=(_e.x/this.element.offsetWidth);		
	}	
	if(v<0) v=0;
	else if (v>1) v=1;
	return v;
}

CO.UIMiniScroll.prototype.update=function() {
	if (this.isVertical) {
		this.elementBar.style.height=(this.value*100.0)+"%";
		this.elementBar.style.top=((1.0-this.value)*100.0)+"%";
		this.elementBar.style.width="";
	}
	else {
		this.elementBar.style.width=(this.value*100.0)+"%";
		this.elementBar.style.height="";
		this.elementBar.style.top="";
	}

	return this;
}

CO.UIMiniScroll.prototype.setValue=function(_value) {
	if (_value==null || _value==undefined || isNaN(_value)) return;
	this.value=Number(_value);
	return this;
}

CO.UIControl.prototype.addMiniScroll=function(_value) {
	var newc=new CO.UIMiniScroll(this);
	newc.setValue(_value);
	return newc;
}
//....................................................ColorPicker
CO.UIColorPicker=function(_parent) {
	CO.UIControl.call(this, _parent);	


	this.rgba={r:0.5, g:0.5, b:0.5, a:0.5};
	this.color=[0.5, 0.5, 0.5, 0.5];
	this.onChanged=null;

	var table=CO.quickAddElement(this.element, "table", "UITable");

	//table.style.height="100%";
	/*table.style.width="50px";*/
	var row=table.insertRow(0);

	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	var cell3=row.insertCell(2);
	var cell4=row.insertCell(3);
	var cell5=row.insertCell(4);

	this.colorCell=CO.quickAddElement(cell5, "div", "UIColor");
	//CO.prependCssClass(this.colorCell, "UIColor")

	this.rscroll=new CO.UIMiniScroll(cell1, "UIRed");	
	this.gscroll=new CO.UIMiniScroll(cell2, "UIGreen");	
	this.bscroll=new CO.UIMiniScroll(cell3, "UIBlue");	
	this.ascroll=new CO.UIMiniScroll(cell4, "UIAlpha");	



	var that=this;


	CO.getVariable(this, "rgba.r").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, that.getColorArray());
		//console.log(that.getColorArray());
		that.update();
	});

	CO.getVariable(this, "rgba.g").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, that.getColorArray());
		//console.log(that.getColorArray());
		that.update();
	});

	CO.getVariable(this, "rgba.b").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, that.getColorArray());
		//console.log(that.getColorArray());
		that.update();
	});

	CO.getVariable(this, "rgba.a").onChange(this, function(e){
		if (that.onChanged) that.onChanged.call(that, that.getColorArray());
		//console.log(that.getColorArray());
		that.update();
	});

	CO.linkVariables(this,"rgba.r", this.rscroll,"value");
	CO.linkVariables(this,"rgba.g", this.gscroll,"value");
	CO.linkVariables(this,"rgba.b", this.bscroll,"value");
	CO.linkVariables(this,"rgba.a", this.ascroll,"value");


	CO.prependCssClass(this.element, "UIColorPicker");

	this.update();

	//...................................popup

	this.colorCell.onmousedown=function(_e) {
		that.togglePopup();
	}

	this.popup=new CO.UIPopUp(document.body);

	this.popup.hide();

	this.dialog=new CO.UIStack(this.popup);
	var rinput=this.dialog.addTextInput("128", "red:").makeNumeric(true, 0, 255);
	CO.linkVariables(this,"rgba.r", rinput, "text", function(_v) {return Math.round(_v*255);}, function(_v){return _v/255;});

	var ginput=this.dialog.addTextInput("128", "green:").makeNumeric(true, 0, 255);
	CO.linkVariables(this,"rgba.g", ginput, "text", function(_v) {return Math.round(_v*255);}, function(_v){return _v/255;});

	var binput=this.dialog.addTextInput("128", "blue:").makeNumeric(true, 0, 255);
	CO.linkVariables(this,"rgba.b", binput, "text", function(_v) {return Math.round(_v*255);}, function(_v){return _v/255;});

	var ainput=this.dialog.addTextInput("128", "alpha:").makeNumeric(true, 0, 255);
	CO.linkVariables(this,"rgba.a", ainput, "text", function(_v) {return Math.round(_v*255);}, function(_v){return _v/255;});
}


CO.inherits(CO.UIColorPicker, CO.UIControl);


CO.UIColorPicker.prototype.togglePopup=function() {
	if (this.popup.isVisible()) this.hidePopup();
	else this.showPopup();
	//this.popup.toggle();
	return this;
}

CO.UIColorPicker.prototype.showPopup=function() {
	//this.list.element.style.display="block";
	this.popup.show();
	var rect=this.colorCell.getBoundingClientRect();

	this.popup.setLocation(rect.right+"px", rect.top+"px");
	//this.list.element.style.width="200px";//this.textInput.offsetWidth+"px";

	//this.dialog.setSize(this.textInput.element.offsetWidth+"px", null);
	this.dialog.element.style.width="80px";
	//this.list.setBoxHeight(this.targetHeight);
	return this;
}

CO.UIColorPicker.prototype.hidePopup=function() {

	this.dialog.element.style.width="0px";
	var that=this;
	setTimeout(function(){that.popup.hide();}, 200);

	return this;
}


CO.UIColorPicker.prototype.getColorString=function() {
	return "rgba("+Math.round(this.rgba.r*255)+","+Math.round(this.rgba.g*255)+","+Math.round(this.rgba.b*255)+","+this.rgba.a+")";
}

CO.UIColorPicker.prototype.update=function() {
	this.colorCell.style.backgroundColor=this.getColorString();
	this.color[0]=this.rgba.r;
	this.color[1]=this.rgba.g;
	this.color[2]=this.rgba.b;
	this.color[3]=this.rgba.a;
	return this;
}

CO.UIColorPicker.prototype.getColorArray=function(_c) {
	if (_c) {
		_c[0]=this.rgba.r;
		_c[1]=this.rgba.g;
		_c[2]=this.rgba.b;
		_c[3]=this.rgba.a;

		return _c;
	}

	return [this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a];
}

CO.UIColorPicker.prototype.setOnChanged=function(_callbak) {
	this.onChanged=_callbak;
	return this;
}

CO.UIColorPicker.prototype.setValue=function(_r, _g, _b, _a) {
	this.rgba.r=_r;
	this.rgba.g=_g;
	this.rgba.b=_b;
	this.rgba.a=_a;

	return this;
}

CO.UIControl.prototype.addColorPicker=function(_label, _rgba, _width, _height) {
	var newc=new CO.UIColorPicker(this);
	newc.setLabel(_label);
	
	newc.setSize(_width, _height);
	if (_rgba) newc.setValue(_rgba[0], _rgba[1], _rgba[2], _rgba[3]);

	return newc;
}
//..................................................................Upload
CO.UIUploader=function(_parent) {

}