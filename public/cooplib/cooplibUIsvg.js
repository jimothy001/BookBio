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
/**
 * CO namespace.
 * @namespace
 */
var CO=CO || {};

CO.UIsvgNS="http://www.w3.org/2000/svg";

CO.UIsvgMouseCapture=null;
CO.UIsvgDrag={};

CO.UIsvgIdCounter=0;

CO.UIsvgMakeId=function(_prefix) {	
	return _prefix+(CO.UIsvgIdCounter++);
}


CO.mouse={}; //2d mouse data

CO.isMouseCaptured=function() {
	return CO.UIsvgMouseCapture;
}

CO.captureMouse=function(_object) {
	CO.UIsvgMouseCapture=_object;
}

CO.releaseMouse=function(_object) {
	if(CO.UIsvgMouseCapture==_object) CO.UIsvgMouseCapture=null;
}

CO.hasMouseCapture=function(_object) {
	return (CO.UIsvgMouseCapture==_object);
}

document.addEventListener("mousedown", function(e) {CO.UIsvgMouseDown(e);});
document.addEventListener("mouseup", function(e) {CO.UIsvgMouseUp(e);});
document.addEventListener("mousemove", function(e) {CO.UIsvgMouseMove(e);});


//.....................................DraggableBehaviour
CO.UIsvgDraggable=function(_el, _region) {
	_el.draggable=true;

	if (!_region) {
		if (_el.dragRegion) _region=_el.dragRegion;
		else _region=_el.g;
	}
	_region.addEventListener('mousedown', function(e){
			CO.UIsvgDrag.obj=_el;
			CO.UIsvgDrag.x0=_el.x;
			CO.UIsvgDrag.y0=_el.y;

			if (_el.parent) {
				var p0=_el.parent.globalToLocal(e.clientX, e.clientY);
				CO.UIsvgDrag.px0=p0.x;
				CO.UIsvgDrag.py0=p0.y;
			}
			else {
				CO.UIsvgDrag.px0=e.clientX;
				CO.UIsvgDrag.py0=e.clientY;
			}
	}, false);
}

CO.UIsvgMouseDown=function(e) {
	if (CO.UIsvgMouseCapture) {
		if (CO.UIsvgMouseCapture.onMouseDown) CO.UIsvgMouseCapture.onMouseDown(e);
	}

}

CO.UIsvgMouseUp=function(e) {
	if (CO.UIsvgMouseCapture) {
		if (CO.UIsvgMouseCapture.onMouseUp) CO.UIsvgMouseCapture.onMouseUp(e);
	}
	CO.UIsvgDrag.obj=null;
}

CO.UIsvgMouseMove=function(e) {
	if (CO.UIsvgMouseCapture) {
		if (CO.UIsvgMouseCapture.onMouseMove) CO.UIsvgMouseCapture.onMouseMove(e);
	}
	if (CO.UIsvgDrag.obj) {
		if (CO.UIsvgDrag.obj.parent) {
			var p1=CO.UIsvgDrag.obj.parent.globalToLocal(e.clientX, e.clientY);
			CO.UIsvgDrag.px1=p1.x;
			CO.UIsvgDrag.py1=p1.y;
		}
		else {
			CO.UIsvgDrag.px1=e.clientX;
			CO.UIsvgDrag.py1=e.clientY;
		}
		CO.UIsvgDrag.obj.x=CO.UIsvgDrag.x0+(CO.UIsvgDrag.px1-CO.UIsvgDrag.px0);
		CO.UIsvgDrag.obj.y=CO.UIsvgDrag.y0+(CO.UIsvgDrag.py1-CO.UIsvgDrag.py0);

		//CO.UIsvgDrag.obj.SetLocation(CO.UIsvgDrag.x0+(CO.UIsvgDrag.px1-CO.UIsvgDrag.px0), CO.UIsvgDrag.y0+(CO.UIsvgDrag.py1-CO.UIsvgDrag.py0));
	}
}

CO.UIsvgCreate=function(_tag) {
	return document.createElementNS(CO.UIsvgNS, _tag);
}

CO.UIsvgCreate=function(_tag) {
	return document.createElementNS(CO.UIsvgNS, _tag);
}

CO.UIsvgInit=function(_parent) {
	var s=new CO.UIsvgManager(_parent);
	return s;
}

CO.UIsvgManager=function(_parent) {
	this.svg=CO.UIsvgCreate("svg");
	if (_parent) _parent.appendChild(this.svg);
	else  document.body.appendChild(this.svg);

	this.svg.setAttributeNS(null, "class", "svgcore");

	CO.UIsvgContainer(this, this);


	this.svg.appendChild(this.g); 

	var defs=CO.UIsvgCreate("defs");
	this.svg.appendChild(defs); 
	var filter;
//............................................Blur filter
	filter = CO.UIsvgCreate("filter");
	filter.setAttribute("id","fblur");
	filter.setAttribute("x","-5%");
	filter.setAttribute("y","-5%");
	filter.setAttribute("width","110%");
	filter.setAttribute("height","110%");

	var gaussianFilter = CO.UIsvgCreate("feGaussianBlur");
	gaussianFilter.setAttribute("in","SourceGraphic");
	gaussianFilter.setAttribute("stdDeviation","2");

	filter.appendChild(gaussianFilter);

	defs.appendChild(filter);
//............................................Shadow filter   
	filter = CO.UIsvgCreate("filter");
	filter.setAttribute("id","fshadow");
	filter.setAttribute("x","-15%");
	filter.setAttribute("y","-15%");
	filter.setAttribute("width","150%");
	filter.setAttribute("height","150%");

	var f1=CO.UIsvgCreate("feOffset");
	f1.setAttribute("result","offOut");
	f1.setAttribute("in","SourceAlpha");
	f1.setAttribute("dx","3");
	f1.setAttribute("dy","3");

	var f2=CO.UIsvgCreate("feGaussianBlur");
	f2.setAttribute("result","blurOut");
	f2.setAttribute("in","offOut");
	f2.setAttribute("stdDeviation","2");

	var f3=CO.UIsvgCreate("feBlend");
	f3.setAttribute("in2","blurOut");
	f3.setAttribute("in","SourceGraphic");
	f3.setAttribute("mode","normal");


	filter.appendChild(f1);
	filter.appendChild(f2);
	filter.appendChild(f3);

	defs.appendChild(filter);

//............................................hilight filter   
	filter = CO.UIsvgCreate("filter");
	filter.setAttribute("id","fhilight");
	filter.setAttribute("x","-15%");
	filter.setAttribute("y","-15%");
	filter.setAttribute("width","150%");
	filter.setAttribute("height","150%");

	var f1=CO.UIsvgCreate("feOffset");
	f1.setAttribute("result","offOut");
	f1.setAttribute("in","SourceAlpha");
	f1.setAttribute("dx","0");
	f1.setAttribute("dy","0");

	var f2=CO.UIsvgCreate("feGaussianBlur");
	f2.setAttribute("result","blurOut");
	f2.setAttribute("in","offOut");
	f2.setAttribute("stdDeviation","3");

	var f3=CO.UIsvgCreate("feBlend");
	f3.setAttribute("in2","blurOut");
	f3.setAttribute("in","SourceGraphic");
	f3.setAttribute("mode","normal");


	filter.appendChild(f1);
	filter.appendChild(f2);
	filter.appendChild(f3);

	defs.appendChild(filter);

	   
}



CO.UIsvgManager.prototype.removeFilter=function(_el) {
	_el.removeAttribute("filter");
}

CO.UIsvgManager.prototype.applyBlurFilter=function(_el) {
	_el.setAttribute("filter","url(#fblur)");
}

CO.UIsvgManager.prototype.applyShadowFilter=function(_el) {
	_el.setAttribute("filter","url(#fshadow)");
}

CO.UIsvgManager.prototype.applyShadowFilter=function(_el) {
	_el.setAttribute("filter","url(#fshadow)");
}

CO.UIsvgManager.prototype.applyHighlight=function(_el) {
	_el.setAttribute("filter","url(#fhilight)");
}

CO.UIsvgAugmentMouseEvent=function(_svgel, _ev, _svgman) {
	var pt = _svgman.svg.createSVGPoint();
	pt.x = _ev.clientX;
	pt.y = _ev.clientY;
	_ev.svgPointGlobal = pt.matrixTransform(_svgman.svg.getScreenCTM().inverse());

	var globalToLocal = _svgel.getTransformToElement(_svgman.svg).inverse();
	_ev.svgPointLocal = _ev.svgPointGlobal.matrixTransform( globalToLocal );
	return _ev;
}

//.........................................Container
/**
 * This provides methods used for event handling. It's not meant to
 * be used directly.
 *
 * @mixin
 */
CO.UIsvgContainer=function(_object, _svgman) {
	_object.g=CO.UIsvgCreate("g");
	_object.svgman=_svgman;
	_object.children=[];
	_object.visible=true;

	for(var pi in CO.UIsvgContainer) {
		_object[pi]=CO.UIsvgContainer[pi];
	}
}


CO.UIsvgContainer.addCircle=function(_cx, _cy, _r, _class) {
	var circle=CO.UIsvgCreate("circle");
	this.g.appendChild(circle);

	if (_class) circle.setAttributeNS(null, "class", _class);

	circle.r.baseVal.value=_r;
	circle.cx.baseVal.value=_cx;
	circle.cy.baseVal.value=_cy;
	

	return circle;	
}

CO.UIsvgContainer.addText=function(_x, _y, _text, _class) {
	var stext=CO.UIsvgCreate("text");
	this.g.appendChild(stext);

	if (_class) stext.setAttributeNS(null, "class", _class);

	stext.setAttributeNS(null,"x",_x);     
	stext.setAttributeNS(null,"y",_y); 

	var textNode = document.createTextNode(_text);
	stext.appendChild(textNode);

	return stext;	
}

CO.UIsvgContainer.addRectangle=function(_x, _y, _w, _h, _class) {
	var rect=CO.UIsvgCreate("rect");
	this.g.appendChild(rect);

	if (_class) rect.setAttributeNS(null, "class", _class);

	rect.width.baseVal.value=_w;
	rect.height.baseVal.value=_h;
	rect.x.baseVal.value=_x;
	rect.y.baseVal.value=_y;
	

	return rect;	
}


CO.UIsvgClipContainer=function() {
	this.g=CO.UIsvgCreate("clipPath");
	this.g.setAttributeNS(null, "id", CO.UIsvgMakeId("clip_"));

	this.id=this.g.id;

	for(var pi in CO.UIsvgContainer) {
		this[pi]=CO.UIsvgContainer[pi];
	}
}

CO.UIsvgContainer.addClippingPath=function(_x, _y, _w, _h, _class) {
	var clipPath=new CO.UIsvgClipContainer();
	this.g.appendChild(clipPath.g);		

	return clipPath;	
}

CO.UIsvgContainer.localToGlobal=function(_x, _y) {

}

CO.UIsvgContainer.globalToLocal=function(_x, _y) {
	var pt = this.svgman.svg.createSVGPoint();
	pt.x = _x;
	pt.y = _y;
	var svgPointGlobal = pt.matrixTransform(this.svgman.svg.getScreenCTM().inverse());

	var globalToLocal = this.g.getTransformToElement(this.svgman.svg).inverse();
	var svgPointLocal = svgPointGlobal.matrixTransform( globalToLocal );
	return svgPointLocal;
}

//.........................................Control
/**
 * @constructor FormButton
 * @mixes Eventful
 */
CO.UIsvgControl=function(_object, _svgman, _parent, _x, _y) {
	CO.UIsvgContainer(_object, _svgman);

	_object.dragRegion=_object.g;

	_object.x=_x;
	_object.y=_y;

	_object.scaleX=1.0;
	_object.scaleY=1.0;

	_object.rotation=0.0;

	_object._matrix=[1.0, 0.0, 0.0, 1.0, _object.x, _object.y];

	_object.g.style.pointerEvents="fill";


	for(var pi in CO.UIsvgControl) {
		_object[pi]=CO.UIsvgControl[pi];
	}

	CO.getVariable(_object, "x")
	.onChange(_object, function (e) {
		_object._matrix[4]=_object.x;
		//CO.UIsvgSetTranslation(_object.g, _object.x, _object.y);
		CO.UIsvgSetMatrix(_object.g, _object._matrix);
	});

	CO.getVariable(_object, "y")
	.onChange(_object, function (e) {
		_object._matrix[5]=_object.y;
		//CO.UIsvgSetTranslation(_object.g, _object.x, _object.y);
		CO.UIsvgSetMatrix(_object.g, _object._matrix);
	});

	CO.getVariable(_object, "scaleX")
	.onChange(_object, function (e) {
		_object.reBuildMatrix();
	});

	CO.getVariable(_object, "scaleY")
	.onChange(_object, function (e) {
		_object.reBuildMatrix();
	});

	CO.getVariable(_object, "rotation")
	.onChange(_object, function (e) {
		_object.reBuildMatrix();
	});

	_object.setParent(_parent);
	_object.setLocation(_x, _y);
}

CO.UIsvgControl.setParent=function(_newparent) {
	if (this.parent==_newparent) return;

	if (this.parent) {
		this.parent.g.removeChild(this.g);
		this.parent.children.splice(this.parent.children.indexOf(this),1);
	}

	this.parent=_newparent;
	if (this.parent) {
		this.parent.g.appendChild(this.g);
		this.parent.children.push(this);
	}
}

CO.UIsvgControl.reBuildMatrix=function() {
	var co=Math.cos(this.rotation);
	var si=Math.sin(this.rotation);

	this._matrix[0]=this.scaleX*co;
	this._matrix[1]=this.scaleX*si;
	this._matrix[2]=-this.scaleY*si;
	this._matrix[3]=this.scaleY*co;
	this._matrix[4]=this.x;
	this._matrix[5]=this.y;

	CO.UIsvgSetMatrix(this.g, this._matrix);
}

CO.UIsvgControl.setLocation=function(_x, _y) {
	this.x=_x;
	this.y=_y;

	CO.UIsvgSetMatrix(this.g, this._matrix);
}

CO.UIsvgSetTranslation=function(_g, _x, _y) {
	_g.setAttributeNS(null,"transform", "translate("+_x+" "+_y+")");  
}

CO.UIsvgSetMatrix=function(_g, _m) {
	_g.setAttributeNS(null,"transform", "matrix("+_m[0]+" "+_m[1]+" "+_m[2]+" "+_m[3]+" "+_m[4]+" "+_m[5]+")");  
}
//.............................................................Button
 CO.UIsvgButton=function(_svgman, _parent, _x, _y, _w, _h, _text, _callback) {
 	CO.UIsvgControl(this, _svgman, _parent, _x, _y);

	this.onClick=_callback;
	this.text=_text;

	this.rect=this.addRectangle(0, 0, _w, _h, "svguicontrol");

	//this.rect=CO.UIsvgCreate("rect");
	//this.g.appendChild(this.rect);
	//this.rect.setAttributeNS(null, "class", "svguicontrol");
	this.svgman.applyShadowFilter(this.rect);

	this.dragRegion=this.rect;	

	this.stext=CO.UIsvgCreate("text");

	this.stext.setAttributeNS(null,"x",0);     
	this.stext.setAttributeNS(null,"y",0); 
	this.stext.setAttributeNS(null,"class","svguitext"); 

	var textNode = document.createTextNode(_text);
	this.stext.appendChild(textNode);

	this.g.appendChild(this.stext);
	

	var that=this;
	this.g.addEventListener('click', function(e){
		if (that.onClick) 
			that.onClick(CO.UIsvgAugmentMouseEvent(that.g, e, that.svgman));
	}, false);

	this.g.addEventListener('mouseover', function(e){
		that.svgman.applyHighlight(that.g);
	}, false);

	this.g.addEventListener('mouseout', function(e){
		that.svgman.removeFilter(that.g);
	}, false);


	this.setSize(_w, _h);
}


CO.UIsvgButton.prototype.setSize=function(_w, _h) {
	var bb=this.stext.getBBox();

	this.stext.setAttributeNS(null,"x",_w*0.5);     
	this.stext.setAttributeNS(null,"y",_h*0.5+bb.height*0.5);  

	this.w=_w;
	this.h=_h;   

	this.rect.width.baseVal.value=_w;
	this.rect.height.baseVal.value=_h;
}

CO.UIsvgManager.prototype.addButton=function(_parent, _x, _y, _w, _h, _text, _callback) {
	var b=new CO.UIsvgButton(this, _parent, _x, _y, _w, _h, _text, _callback);
	return b;
}

//.....................................Group
CO.UIsvgGroup=function(_svgman, _parent, _x, _y, _w, _h, _text) {
	CO.UIsvgControl(this, _svgman, _parent, _x, _y);

	
	this.rect=this.addRectangle(0, 0, _w, _h, "svguigroup");

	this.dragRegion=this.rect;

	this.text=_text;
	this.stext=CO.UIsvgCreate("text");	

	this.stext.setAttributeNS(null,"x",0);     
	this.stext.setAttributeNS(null,"y",0); 
	this.stext.setAttributeNS(null,"class","svguigrouptext"); 

	var textNode = document.createTextNode(_text);
	this.stext.appendChild(textNode);

	this.g.appendChild(this.stext);

	this.setSize(_w, _h);
}


CO.UIsvgGroup.prototype.setSize=function(_w, _h) {
	var bb=this.stext.getBBox();

	this.stext.setAttributeNS(null,"x", 5.0);     
	this.stext.setAttributeNS(null,"y", bb.height);  

	this.w=_w;
	this.h=_h;   

	this.rect.width.baseVal.value=_w;
	this.rect.height.baseVal.value=_h;
}

CO.UIsvgManager.prototype.addGroup=function(_parent, _x, _y, _w, _h, _text) {
	var b=new CO.UIsvgGroup(this, _parent, _x, _y, _w, _h, _text);
	return b;
}

//.....................................Scrollbar
CO.UIsvgScrollbar=function(_svgman, _parent, _x, _y, _w, _h, _text, _callback) {
	CO.UIsvgControl(this, _svgman, _parent, _x, _y);

	this.text=_text;
	this.onChange=_callback;
	this.value=0.0;
	this.min=0.0;
	this.max=1.0;
	this.isInteger=false;
	this.digits=2.0;

	this.mpow= Math.pow(10, this.digits);

	var that=this;

	this.rect=this.addRectangle(0, 0, _w, _h, "svguicontrol");


	this.svgman.applyShadowFilter(this.rect);	
	this.dragRegion=this.rect;	


	this.rectin=this.addRectangle(0, 1, _w, _h-2, "svguiscrollbar");

	//.......................................label
	this.stext=CO.UIsvgCreate("text");

	this.stext.setAttributeNS(null,"x",0);     
	this.stext.setAttributeNS(null,"y",0); 
	this.stext.setAttributeNS(null,"class","svguiscrollbarlabel"); 

	var textNode = document.createTextNode(_text);
	this.stext.appendChild(textNode);

	this.g.appendChild(this.stext);

	//.......................................value label
	this.vtext=CO.UIsvgCreate("text");

	this.vtext.setAttributeNS(null,"x",0);     
	this.vtext.setAttributeNS(null,"y",0); 
	this.vtext.setAttributeNS(null,"class","svguiscrollbarvalue"); 

	var vtextNode = document.createTextNode("0.0");
	this.vtext.appendChild(vtextNode);

	this.g.appendChild(this.vtext);

	

	//....................................events
	this.g.addEventListener('mousedown', function(e){
			that.onMouseDown(e);
	}, false);

	this.g.addEventListener('mouseup', function(e){
			that.onMouseUp(e);
	}, false);

	this.g.addEventListener('mousemove', function(e){
			that.onMouseMove(e);
	}, false);

	this.g.addEventListener('mouseover', function(e){
		that.svgman.applyHighlight(that.g);
	}, false);

	this.g.addEventListener('mouseout', function(e){
		that.svgman.removeFilter(that.g);
	}, false);

	CO.getVariable(this, "value")
	.onChange(this, function (_data) {
		that.update();
		if (that.onChange) that.onChange(that);
	});

	CO.getVariable(this, "min")
	.onChange(this, function (e) {
		that.update();
	});

	CO.getVariable(this, "max")
	.onChange(this, function (e) {
		that.update();
	});

	CO.getVariable(this, "isInteger")
	.onChange(this, function (e) {
		that.update();
	});

	CO.getVariable(this, "digits")
	.onChange(this, function (e) {
		that.mpow= Math.pow(10, that.digits);
		that.update();
	});

	this.setSize(_w, _h);
	this.update();
}

CO.UIsvgScrollbar.prototype.update=function() {
	if (this.value<this.min) this.value=this.min;
	if (this.value>this.max) this.value=this.max;

	if (this.isInteger) this.value=Math.round(this.value);

	var x=this.value2x(this.value);
	this.rectin.width.baseVal.value=x;
	this.vtext.firstChild.nodeValue = Math.round(this.value*this.mpow)/this.mpow;
}

CO.UIsvgScrollbar.prototype.x2value=function(_x) {
	var nx=_x/this.w;
	if (nx<0.0) nx=0.0;
	if (nx>1.0) nx=1.0;

	var vv=this.min+nx*(this.max-this.min);
	if (this.isInteger) return Math.round(vv);
	return vv;
}

CO.UIsvgScrollbar.prototype.value2x=function(_v) {
	return this.w*(_v-this.min)/(this.max-this.min);
}

CO.UIsvgScrollbar.prototype.onMouseDown=function(e) {
	CO.UIsvgAugmentMouseEvent(this.g, e, this.svgman)

	this.value=this.x2value(e.svgPointLocal.x);
	CO.captureMouse(this);
	//CO.UIsvgMouseCapture=this;
}

CO.UIsvgScrollbar.prototype.onMouseUp=function(e) {
	//CO.UIsvgMouseCapture=null;
	CO.releaseMouse(this);
}

CO.UIsvgScrollbar.prototype.onMouseMove=function(e) {
	if (!CO.hasMouseCapture(this)) return;

	CO.UIsvgAugmentMouseEvent(this.g, e, this.svgman)
	this.value=this.x2value(e.svgPointLocal.x);
}

CO.UIsvgScrollbar.prototype.setSize=function(_w, _h) {
	var bb=this.stext.getBBox();

	this.stext.setAttributeNS(null,"x", 0.0);     
	this.stext.setAttributeNS(null,"y", -2.0);  

	this.vtext.setAttributeNS(null,"x", _w+5.0);     
	this.vtext.setAttributeNS(null,"y", _h);  

	this.w=_w;
	this.h=_h;   

	this.rect.width.baseVal.value=_w;
	this.rect.height.baseVal.value=_h;

	this.rectin.width.baseVal.value=this.value2x(this.value);
	this.rectin.y.baseVal.value=1;
	this.rectin.height.baseVal.value=_h-2;
}

CO.UIsvgManager.prototype.addScrollbar=function(_parent, _x, _y, _w, _h, _text, _callback) {
	var b=new CO.UIsvgScrollbar(this, _parent, _x, _y, _w, _h, _text, _callback);
	return b;
}
//.............................................................Label
 CO.UIsvgLabel=function(_svgman, _parent, _x, _y, _w, _h, _text, _isclipped) {
 	CO.UIsvgControl(this, _svgman, _parent, _x, _y);

	this.text=_text;

	this.stext=CO.UIsvgCreate("text");

	this.stext.setAttributeNS(null,"x",0);     
	this.stext.setAttributeNS(null,"y",0); 
	this.stext.setAttributeNS(null,"class","svguilabel"); 

	var textNode = document.createTextNode(_text);
	this.stext.appendChild(textNode);

	this.g.appendChild(this.stext);



	if(_isclipped) {
		this.clipper=this.addClippingPath();
		this.crect=this.clipper.addRectangle(0,0,_w, _h);

		this.stext.setAttributeNS(null,"clip-path", "url(#"+this.clipper.id+")");   
	}

	this.dragRegion=this.g;	


	
	
	var that=this;
	CO.CO(this).variable("text").onChange(this, function(_e){
		that.stext.firstChild.nodeValue = that.text;
	});

	
	this.setSize(_w, _h);
}
CO.UIsvgLabel.prototype.resetLocation=function() {
	var bb=this.stext.getBBox();  
	this.stext.setAttributeNS(null,"y",bb.height*0.5+2.0);  
}

CO.UIsvgLabel.prototype.setSize=function(_w, _h) {
 
	this.resetLocation();  


	this.w=_w;
	this.h=_h;   

	if (this.crect) {
		this.crect.width.baseVal.value=_w;
		this.crect.height.baseVal.value=_h;
	}
}

CO.UIsvgLabel.prototype.setFontSize=function(_size) {
	this.stext.style.fontSize=_size+"px";  

	this.resetLocation();  

}

CO.UIsvgLabel.prototype.setFontFamily=function(_font) {
	this.stext.style.fontFamily=_font;  

	this.resetLocation();  

}

CO.UIsvgManager.prototype.addLabel=function(_parent, _x, _y, _w, _h, _text, _isclipped) {
	var b=new CO.UIsvgLabel(this, _parent, _x, _y, _w, _h, _text, _isclipped);
	return b;
}

//.............................................................TextBox
CO.dummyInput=null;
CO.currentInput=null;



 CO.UIsvgSetFocus=function(_newInput) {

 	if (!CO.dummyInput) {
 		CO.dummyInput=document.createElement("input");
		CO.dummyInput.type = "text";
		CO.dummyInput.style.position="fixed";
		CO.dummyInput.style.left="-100px";
		CO.dummyInput.style.width="50px";
		document.body.appendChild(CO.dummyInput);
 	}
 	 if (_newInput== CO.currentInput) return;


 	 if ( CO.currentInput) {
 	 	var previousInput=CO.currentInput;

 	 	CO.currentInput=null;
 	 	CO.dummyInput.onchange=null;
 	 	CO.dummyInput.onblur=null;
 	 	CO.dummyInput.onkeydown=null;
 	 	CO.dummyInput.onkeypress=null;
		CO.dummyInput.onpaste=null;
		CO.dummyInput.oninput=null;

 	 	if ( previousInput.onFocusLost) previousInput.onFocusLost(CO.dummyInput);
 	 	
 	 	
  	 }

  	 if (_newInput) {
  	 	
		CO.dummyInput.value=_newInput.text;
		CO.dummyInput.focus();
		setTimeout(function() {CO.dummyInput.focus();}, 5);
		CO.currentInput=_newInput;

		if (_newInput.onFocus) _newInput.onFocus(CO.dummyInput);

		CO.dummyInput.onchange=function() {
			if (CO.currentInput.onTextChanged) CO.currentInput.onTextChanged(CO.dummyInput);
		};

		CO.dummyInput.onkeydown=function(e) {
			var key;
			if (window.event) key = window.event.keyCode;
			else if (e) key = e.which;

			if (key==13) {
				//if (CO.currentInput.onFocusLost) CO.currentInput.onFocusLost(CO.dummyInput);
				 CO.UIsvgSetFocus(null);
				 CO.dummyInput.blur();
			}
		}


		CO.dummyInput.onkeypress=CO.dummyInput.onchange;
		CO.dummyInput.onpaste=CO.dummyInput.onchange;
		CO.dummyInput.oninput=CO.dummyInput.onchange;

		CO.dummyInput.onblur=function() {
			setTimeout(function() {CO.dummyInput.focus();}, 5);

		//	CO.dummyInput.focus();
			//if (CO.currentInput.onFocusLost) CO.currentInput.onFocusLost(CO.dummyInput);
		};
	}
 }

 CO.UIsvgTextInput=function(_svgman, _parent, _x, _y, _w, _h, _text, _isclipped) {

 	CO.UIsvgControl(this, _svgman, _parent, _x, _y);

 	this.rect=this.addRectangle(0, 0, _w, _h, "svguitextinputbg");
	//this.svgman.applyShadowFilter(this.rect);	
	this.dragRegion=this.rect;	



	this.text=_text;

	this.stext=CO.UIsvgCreate("text");

	this.stext.setAttributeNS(null,"x",0);     
	this.stext.setAttributeNS(null,"y",0); 
	this.stext.setAttributeNS(null,"class","svguitextinput"); 

	var textNode = document.createTextNode(_text);
	this.stext.appendChild(textNode);

	this.g.appendChild(this.stext);



	if(_isclipped) {
		this.clipper=this.addClippingPath();
		this.crect=this.clipper.addRectangle(0,0,_w, _h);

		this.stext.setAttributeNS(null,"clip-path", "url(#"+this.clipper.id+")");   
	}
	
	var that=this;
	CO.CO(this).variable("text").onChange(this, function(_e){
		that.stext.firstChild.nodeValue = that.text;
	});

	this.g.addEventListener('mousedown', function(e){
			that.onMouseDown(e);
	}, false);

	this.g.addEventListener('mouseup', function(e){
			that.onMouseUp(e);
	}, false);

	
	this.setSize(_w, _h);
}



CO.UIsvgTextInput.prototype.onFocus=function(_inp) {
	this.rect.setAttributeNS(null,"class","svguitextinputbgfocus"); 
}

CO.UIsvgTextInput.prototype.onFocusLost=function(_inp) {
	this.rect.setAttributeNS(null,"class","svguitextinputbg");
	this.text=_inp.value;

	CO.UIsvgSetFocus(null);
}

CO.UIsvgTextInput.prototype.onTextChanged=function(_inp) {
	this.text=_inp.value;
}

CO.UIsvgTextInput.prototype.onMouseDown=function(e) {
	CO.UIsvgAugmentMouseEvent(this.g, e, this.svgman)

	 CO.UIsvgSetFocus(this);
}

CO.UIsvgTextInput.prototype.onMouseUp=function(e) {
	//CO.UIsvgMouseCapture=null;
	//CO.releaseMouse(this);
}

CO.UIsvgTextInput.prototype.resetLocation=function() {
	var bb=this.stext.getBBox();  
	this.stext.setAttributeNS(null,"y",bb.height*0.5+2.0);  
}

CO.UIsvgTextInput.prototype.setSize=function(_w, _h) {
 
	this.resetLocation();  


	this.w=_w;
	this.h=_h;   

	this.rect.width.baseVal.value=_w;
	this.rect.height.baseVal.value=_h;

	if (this.crect) {
		this.crect.width.baseVal.value=_w;
		this.crect.height.baseVal.value=_h;
	}
}

CO.UIsvgTextInput.prototype.setFontSize=function(_size) {
	this.stext.style.fontSize=_size+"px";  

	this.resetLocation();  

}

CO.UIsvgTextInput.prototype.setFontFamily=function(_font) {
	this.stext.style.fontFamily=_font;  

	this.resetLocation();  

}

CO.UIsvgManager.prototype.addTextInput=function(_parent, _x, _y, _w, _h, _text, _isclipped) {
	var b=new CO.UIsvgTextInput(this, _parent, _x, _y, _w, _h, _text, _isclipped);
	return b;
}


//.............................................................TextLog
 /*CO.UIsvgLabel=function(_svgman, _parent, _x, _y, _w, _h, _text, _isclipped) {
 	CO.UIsvgControl(this, _svgman, _parent, _x, _y);

	this.text=_text;

	this.stext=CO.UIsvgCreate("text");

	this.stext.setAttributeNS(null,"x",0);     
	this.stext.setAttributeNS(null,"y",0); 
	this.stext.setAttributeNS(null,"class","svguilabel"); 

	var textNode = document.createTextNode(_text);
	this.stext.appendChild(textNode);

	this.g.appendChild(this.stext);



	if(_isclipped) {
		this.clipper=this.addClippingPath();
		this.rect=this.clipper.addRectangle(0,0,_w, _h);

		this.stext.setAttributeNS(null,"clip-path", "url(#"+this.clipper.id+")");   
	}

	this.dragRegion=this.g;	


	
	
	var that=this;
	CO.CO(this).variable("text").onChange(this, function(_e){
		that.stext.firstChild.nodeValue = that.text;
	});

	
	this.setSize(_w, _h);
}
CO.UIsvgLabel.prototype.resetLocation=function() {
	var bb=this.stext.getBBox();  
	this.stext.setAttributeNS(null,"y",bb.height*0.5+2.0);  
}

CO.UIsvgLabel.prototype.setSize=function(_w, _h) {
 
	this.resetLocation();  


	this.w=_w;
	this.h=_h;   

	this.rect.width.baseVal.value=_w;
	this.rect.height.baseVal.value=_h;
}

CO.UIsvgLabel.prototype.setFontSize=function(_size) {
	this.stext.style.fontSize=_size+"px";  

	this.resetLocation();  

}

CO.UIsvgLabel.prototype.setFontFamily=function(_font) {
	this.stext.style.fontFamily=_font;  

	this.resetLocation();  

}

CO.UIsvgManager.prototype.addLabel=function(_parent, _x, _y, _w, _h, _text, _isclipped) {
	var b=new CO.UIsvgLabel(this, _parent, _x, _y, _w, _h, _text, _isclipped);
	return b;
}
*/
//.....................................ShapeGroup
CO.UIsvgShapeGroup=function(_svgman, _parent, _x, _y) {
	CO.UIsvgControl(this, _svgman, _parent, _x, _y);
}

CO.UIsvgManager.prototype.addShapeGroup=function(_parent, _x, _y) {
	var b=new CO.UIsvgShapeGroup(this, _parent, _x, _y);
	return b;
}