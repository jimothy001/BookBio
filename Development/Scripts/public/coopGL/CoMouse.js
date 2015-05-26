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
var COGL=COGL || {};

COGL.MouseModule=function(_cogl) {
	var gl=_cogl.gl;


	_cogl.Mouse=function() {

		this.uCursorColor=vec4.fromValues(0.0, 0.0, 0.0, 1.0);
		this.uCursor3d=vec3.create();
		this.uCursorSize=vec3.fromValues(0.8, 0.8, 0.0);


		this.lastX=0.0;
		this.lastY=0.0;

		this.x=0.0;
		this.y=0.0;

		this.dx=0.0;
		this.dy=0.0;

		this.ux=0.0; //speed in pixels per second
		this.uy=0.0; 

		this.point2d=vec3.create(); //normalized coordinates
		this.point3d=vec3.create();


		this.constraint=null;
		this.constraintPoint=vec3.create();

		this.rayPointConstraint=null; //this is a plane, a sphere or another line.
		this.rayPoint=null;
		this.ray=new _cogl.Line([0.0, 0.0, 0.0], [1.0, 0.0, 0.0], false, true);

		this.pointUV=vec3.create();
		this.normal=vec3.create();

		this.localPlane=null; //x,y are the derivatives of U and V

		//this.ray=new COGL.Ray(0.0, 0.0, 0.0, 0.0, 0.0, 1.0);

		this.isOnBackground=true; //TODO: check depth buffer return //the RGB integer numbers should be 1,1,1,1

		var that=this;

		this.captureObject=null;

		$(_cogl.canvas).mousedown(function(_e) {that.onMouseDown(_e);});
	    $(_cogl.canvas).mouseup(function(_e) {that.onMouseUp(_e);});
	    $(_cogl.canvas).mousemove(function(_e) {that.onMouseMove(_e);});
	}

	_cogl.Mouse.prototype.applyToShader=function(_shader) {
		_shader.u.uCursor3d=this.uCursor3d;
		_shader.u.uCursorColor=this.uCursorColor;
		_shader.u.uCursorSize=this.uCursorSize;
	}

	_cogl.Mouse.prototype.newDepthValueProcessed=function(_p2, _p3) {
	    vec3.copy(this.point2d, _p2);
	    vec3.copy(this.point3d, _p3);
	    vec3.copy(this.uCursor3d, _p3);

	    this.isOnBackground=(_p2[2]==-1.0);


	    if (_cogl.mouseOverObject && _cogl.mouseOverObject.getLocalPointData) {
	        this.modelPoint=_cogl.mouseOverObject.getLocalPointData(this);
	    } 
	}

	_cogl.Mouse.prototype.setXYPlaneRayConstraint=function(_z) {
	}

	_cogl.Mouse.prototype.setYZPlaneRayConstraint=function(_x) {
	}

	_cogl.Mouse.prototype.setZXPlaneRayConstraint=function(_y) {
	}

	_cogl.Mouse.prototype.setXAxisRayConstraint=function(_y,_Z) {
	}

	_cogl.Mouse.prototype.setYAxisRayConstraint=function(_x,_Z) {
	}

	_cogl.Mouse.prototype.setZAxisRayConstraint=function(_x,_y) {
	}


	_cogl.Mouse.prototype.onMouseDown=function(_e) {
		if (CO.isMouseCaptured() && !CO.hasMouseCapture(this)) return;

		var offset = $(_cogl.canvas).offset();
		this.x = _e.pageX - offset.left;
	    this.y = _e.pageY - offset.top;


		this.lastX=this.x;
		this.lastY=this.y;

	    


		if (_cogl.camera.onMouseDown(_e)) {

		}

		if (this.captureObject) CO.captureMouse(this);
	}

	_cogl.Mouse.prototype.onMouseUp=function(_e) {
		//if (!CO.hasMouseCapture(this)) return;
		
		if (this.captureObject) this.captureObject.onMouseUp(_e); //this should always release just in case
	}

	_cogl.Mouse.prototype.onMouseMove=function(_e) {

		var offset = $(_cogl.canvas).offset();

		this.lastX=this.x;
		this.lastY=this.y;

	    this.x = _e.pageX - offset.left;
	    this.y = _e.pageY - offset.top;

	    this.dx =  this.x-this.lastX;
	    this.dy =  this.y-this.lastY;

		if (!CO.hasMouseCapture(this)) return;
		
		if (this.captureObject) this.captureObject.onMouseMove(_e);
	}

	_cogl.Mouse.prototype.capture=function(_object) {
		if (CO.isMouseCaptured() && !CO.hasMouseCapture(this)) return;
		this.captureObject=_object;
		CO.captureMouse(this);
	}

	_cogl.Mouse.prototype.release=function(_object) {
		if (this.hasCapture(_object)) this.captureObject=null;	
		if (CO.hasMouseCapture(this)) CO.releaseMouse(this);
	}

	_cogl.Mouse.prototype.hasCapture=function(_object) {
		return this.captureObject==_object;
	}
}