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

COGL.GeometryModule=function(_cogl) {
	var gl=_cogl.gl;

	_cogl.vectorize2=function(_x, _y) {
		if (_x==undefined) return vec2.create();
		if (_y!=undefined) return vec2.fromValues(_x, _y);
		if (_x.length) return vec2.clone(_x);
		if (CO.isObject(_x) && _x.hasOwnPropert("x")) return vec2.fromValues(_x.x, _x.y);
		return vec2.create();
	}

	_cogl.vectorize3=function(_x, _y, _z) {
		if (_x==undefined) return vec3.create();
		if (_y!=undefined) return vec3.fromValues(_x, _y, _z||0.0);		
		if (_x.length==3) return vec3.clone(_x);
		if (_x.length==2) return vec3.fromValues(_x[0], _x[1], 0.0);
		if (CO.isObject(_x) && _x.hasOwnProperty("x")) return vec3.fromValues(_x.x, _x.y, _x.z||0.0);
		return vec3.create();
	}

	_cogl.deVectorize3=function(_p, _target) {
		if (!_p || _p.length<2 || !_target) return;

		if (_target.hasOwnProperty("x")) {
			_target.x=_p[0];
			_target.y=_p[1];
			_target.z=_p[2]||0.0;
		}
		if (_target.length==3) return vec3.set(_target, _p[0], _p[1], _p[2]||0.0);
		if (_target.length==2) return vec2.set(_target, _p[0], _p[1]);
	}

	_cogl.midPoint=function(_p0, _p1, _out) {
		if (_out) {
			vec3.set(_out, 0.5*(_p0[0]+_p1[0]), 0.5*(_p0[1]+_p1[1]), 0.5*(_p0[2]+_p1[2]));
			return _out;
		}

		return vec3.fromValues(0.5*(_p0[0]+_p1[0]), 0.5*(_p0[1]+_p1[1]), 0.5*(_p0[2]+_p1[2]));
	}

//.................................................................................Point [sed for constraint mechanics]
	_cogl.Point=function(_point) {
		this.point=_cogl.vectorize3(_point);
	} 

	_cogl.Point.prototype.isInside=function(_p) {
		return false;
	}


	_cogl.Point.prototype.clone=function(_clone) {
		if (_clone) {
			vec3.copy(_clone.point, this.point);
			return _clone;	
		}
		else {
			var clone= new _cogl.Point(this.point);
			return clone;	
		}
	}	

	//add the covariables overlay. this is not done in the constructor so that we can keep geomtric primitives lightweight unless wiring functionality is needed
	_cogl.Point.prototype.synthesize=function() {

		this.x=this.point[0];
		this.y=this.point[1];
		this.z=this.point[2];

		var that=this;

		CO.CO(this).variable("x").onChange(this, function(_e) {
			that.point[0]=that.x;
		});

		CO.CO(this).variable("y").onChange(this, function(_e) {
			that.point[1]=that.y;
		});

		CO.CO(this).variable("z").onChange(this, function(_e) {
			that.point[2]=that.z;
		});
	}

	//geometry interface
	_cogl.Point.prototype.signedDistance=function(_p) {
		return vec3.distance(_p, this.point);
	}

	_cogl.Point.prototype.distance=function(_p) {
		return vec3.distance(_p, this.point);
	}

	_cogl.Point.prototype.closestPoint=function(_p, _cp) {		
		var cp=_cp || vec3.create();

		vec3.copy(cp, this.point);

		return cp;
	}

	_cogl.Point.prototype.distanceAndPoint=function(_p, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0, "distance":0.0};
		pp.p=pp.p||vec3.clone(this.point);
		pp.distance=this.distance(_p);

		return pp;
	}


//..............................................................................................2d
	_cogl.Line2d=function(_p0, _p1, _infiniteStart, _infiniteEnd) {
		this.p0=_cogl.vectorize2(_p0);
		this.p1=_cogl.vectorize2(_p1);

		this.dv=vec2.create();
		this.dvn=vec2.create();

		this.length=0.0;

		this.inf0=_infiniteStart||false;
		this.inf1=_infiniteEnd||false;

		this.update();
	} 

	_cogl.Line2d.prototype.update=function() {
		vec2.subtract(this.dv, this.p1, this.p0);
		this.length=vec2.length(this.dv);

		if (this.length>0.0) vec2.scale(this.dvn, this.dv, 1.0/this.length);
		else vec2.set(this.dvn, 0.0, 0.0);
	}

	_cogl.Line2d.prototype.setPoints=function(_p0, _p1, _infiniteStart, _infiniteEnd) {
		this.p0=_cogl.vectorize2(_p0);
		this.p1=_cogl.vectorize2(_p1);

		this.inf0=_infiniteStart||false;
		this.inf1=_infiniteEnd||false;

		this.update();
	}

	_cogl.Line2d.prototype.pointAt=function(_t, _point) {
		var pt=_point||vec2.create();

		vec2.scaleAndAdd(pt, this.p0, this.dv, _t);
		return _point;	
	}

	_cogl.Line2d.prototype.clone=function(_clone) {
		if (_clone) {
			_clone.setPoints(this.p0, this.p1, this.inf0, this.inf1);

			return _clone;	
		}
		else {
			var clone= new _cogl.Line2d(this.p0, this.p1, this.inf0, this.inf1);

			return clone;	
		}
	}	

	_cogl.Line2d.prototype.synthesize=function() {
		this.x0=this.p0[0];
		this.y0=this.p0[1];

		this.x1=this.p1[0];
		this.y1=this.p1[1];

		var that=this;

		CO.CO(this).variable("x0").onChange(this, function(_e) {
			that.p0[0]=that.x0;
			that.update();
		});

		CO.CO(this).variable("y0").onChange(this, function(_e) {
			that.p0[1]=that.y0;
			that.update();
		});

		CO.CO(this).variable("x1").onChange(this, function(_e) {
			that.p1[0]=that.x1;
			that.update();
		});

		CO.CO(this).variable("y1").onChange(this, function(_e) {
			that.p1[1]=that.y1;
			that.update();
		});


		//CO.CO(this).variable("length")
	}

	_cogl.Line2d.prototype.signedDistance=function(_p) {
		var cross=(_p[1]-this.p0[1])*this.dv[0]-(_p[0]-this.p0[0])*this.dv[1];
		if (cross<0.0) return -this.distance(_p);
		else return this.distance(_p);
	}

	_cogl.Line2d.prototype.distance=function(_p) {
		return this.distanceAndPoint(_p).distance;
	}

	_cogl.Line2d.prototype.closestPoint=function(_p, _cp) {		
		var pp=this.distanceAndPoint(_p);
		if (_cp) vec2.copy(_cp, pp.p);
		return _cp||pp.p;
	}

	_cogl.Line2d.prototype.distanceAndPoint=function(_p, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0, "distance":0.0};
		pp.p=pp.p||vec3.create();
		pp.p[2]=0.0;

		vec2.subtract(dvec, _p, this.p0);
		var d=vec2.dot(this.dvn, dvec);
		
		if ((d>=0.0 || this.inf0) && (d<=this.length || this.inf1)) {
			vec2.scale(pp.p, this.dvn, d);
			vec2.subtract(pvec, dvec, pp.p);
	
			vec2.add(pp.p, pp.p, this.p0)
			pp.t=d/this.length;

			pp.distance=vec2.length(pvec);
		}

		if (d<0.0) {
			vec2.copy(pp.p, this.p0);
			pp.t=0.0;

			pp.distance=vec2.length(dvec);
		}

		if (d>this.length) {
			vec2.subtract(dvec, _p, this.p1);
			
			vec2.copy(pp.p, this.p1);
			pp.t=1.0;

			pp.distance=vec2.length(dvec);
		}

		return pp;
	}

	
	_cogl.Line2d.prototype.intersect=function(_line, _resultData) {
		return _cogl.Line2d.intersect(this, _line, _resultData);
	}


	_cogl.Line2d.intersect=function(_line0, _line1, _resultData) {
		var pp=_resultData||{"p":0, "s0":0.0, "s1":0.0};
		pp.p=pp.p||vec3.create();
		
		vec2.subtract(wv, _line0.p0, _line1.p0);
		
		var a=_line0.length*_line0.length;
		var b=vec2.dot(_line0.dv, _line1.dv);
		var c=_line1.length*_line1.length;
		var d=vec2.dot(_line0.dv, wv);
		var e=vec2.dot(_line1.dv, wv);

		var dd=a*c-b*b;

		if (dd==0.0) 
			return false;
		

		pp.s0=(b*e-c*d)/dd;
		pp.s1=(a*e-b*d)/dd;

		if (!_enforceInfinity) {
			if (!_line0.inf0 && pp.s0<0.0) return false;
			if (!_line0.inf1 && pp.s0>1.0) return false;

			if (!_line1.inf0 && pp.s1<0.0) return false;
			if (!_line1.inf1 && pp.s1>1.0) return false;
		}

		_line0.pointAt(pp.s0, pp.p);		

		return true;
	}

	_cogl.Line2d.prototype.distanceToLine=function(_line, _lineConnector, _enforceInfinity) {
		return _cogl.Line2d.distanceLine2Line(this, _line, _lineConnector, _enforceInfinity);		
	}

	_cogl.Line2d.distanceLine2Line=function(_line0, _line1, _lineConnector, _enforceInfinity) {

		vec2.subtract(wv, _line0.p0, _line1.p0);
		
		var a=_line0.length*_line0.length;
		var b=vec2.dot(_line0.dv, _line1.dv);
		var c=_line1.length*_line1.length;
		var d=vec2.dot(_line0.dv, wv);
		var e=vec2.dot(_line1.dv, wv);

		var dd=a*c-b*b;

		if (dd==0.0) {
			vec2.copy(p0, _line0.p0);

			var clop={p:p1, t:0.0};
			_line1.distanceToPoint(p0, clop);
		}
		else {
			var sp=(b*e-c*d)/dd;
			var tq=(a*e-b*d)/dd;

			if (!_enforceInfinity) {
				if (!_line0.inf0 && sp<0.0) sp=0.0;
				if (!_line0.inf1 && sp>1.0) sp=1.0;

				if (!_line1.inf0 && tq<0.0) tq=0.0;
				if (!_line1.inf1 && tq>1.0) tq=1.0;
			}

			_line0.pointAt(sp, p0);
			_line1.pointAt(tq, p1);
		}

		if (_lineConnector) {
			_lineConnector.t0=sp;
			_lineConnector.t1=tq;

			_lineConnector.setPoints(p0, p1, false, false);
			return _lineConnector.length;
		}
		else return vec2.distance(p0, p1);
	}
	//.................................................................................Circle2d
	_cogl.Circle2=function(_center, _r) {
		this.center=_cogl.vectorize2(_center);
		this.r=_r;
	} 

	_cogl.Circle2.prototype.isInside=function(_p) {
		return vec2.distance(_p, this.center)<this.r;
	}


	_cogl.Circle2.prototype.clone=function(_clone) {
		if (_clone) {
			vec2.copy(_clone.center, this.center);
			_clone.r=this.r;

			return _clone;	
		}
		else {
			var clone= new _cogl.newcircle(this.center, this.r);

			return clone;	
		}
	}	


	_cogl.Circle2.prototype.synthesize=function() {
		this.x=this.center[0];
		this.y=this.center[1];


		var that=this;

		CO.CO(this).variable("x").onChange(this, function(_e) {
			that.center[0]=that.x;
		});

		CO.CO(this).variable("y").onChange(this, function(_e) {
			that.center[1]=that.y;
		});

		CO.CO(this).variable("r");


		//CO.CO(this).variable("length")
	}

	//geometry interface
	_cogl.Circle2.prototype.signedDistance=function(_p) {
		return vec2.distance(_p, this.center)-r;
	}

	_cogl.Circle2.prototype.distance=function(_p) {
		return Math.abs(vec2.distance(_p, this.center)-r);
	}

	_cogl.Circle2.prototype.closestPoint=function(_p, _cp) {		
		var cp=_cp || vec3.create();

		vec2.subtract(cp, _p, this.center);
		var len=vec2.length(cp);
		if (len==0.0) vec2.set(cp, this.r, 0.0);
		else vec2.scale(cp, cp, this.r/len);
		
		vec2.add(cp, this.center, cp);

		return cp;
	}

	_cogl.Circle2.prototype.distanceAndPoint=function(_p, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0, "distance":0.0};
		pp.p=pp.p||vec3.create();
		pp.p[2]=0.0;

		this.closestPoint(_p, pp.p);
		pp.distance=this.distance(_p);

		return pp;
	}


	//.................................................................................Sphere
	_cogl.Sphere=function(_center, _r) {
		this.center=_cogl.vectorize3(_center);
		this.r=_r;
	} 

	_cogl.Sphere.prototype.isInside=function(_p) {
		return vec3.distance(_p, this.center)<this.r;
	}


	_cogl.Sphere.prototype.clone=function(_clone) {
		if (_clone) {
			vec3.copy(_clone.center, this.center);
			_clone.r=this.r;

			return _clone;	
		}
		else {
			var clone= new _cogl.Sphere(this.center, this.r);

			return clone;	
		}
	}	

	_cogl.Sphere.prototype.synthesize=function() {
		this.x=this.center[0];
		this.y=this.center[1];
		this.z=this.center[2];

		var that=this;

		CO.CO(this).variable("x").onChange(this, function(_e) {
			that.center[0]=that.x;
		});

		CO.CO(this).variable("y").onChange(this, function(_e) {
			that.center[1]=that.y;
		});

		CO.CO(this).variable("z").onChange(this, function(_e) {
			that.center[2]=that.z;
		});

		CO.CO(this).variable("r");


		//CO.CO(this).variable("length")
	}

	//geometry interface
	_cogl.Sphere.prototype.signedDistance=function(_p) {
		return vec3.distance(_p, this.center)-r;
	}

	_cogl.Sphere.prototype.distance=function(_p) {
		return Math.abs(vec3.distance(_p, this.center)-r);
	}

	_cogl.Sphere.prototype.closestPoint=function(_p, _cp) {		
		var cp=_cp || vec3.create();

		vec3.subtract(cp, _p, this.center);
		var len=vec3.length(cp);
		if (len==0.0) vec3.set(cp, this.r, 0.0);
		else vec3.scale(cp, cp, this.r/len);
		
		vec3.add(cp, this.center, cp);

		return cp;
	}

	_cogl.Sphere.prototype.distanceAndPoint=function(_p, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0, "distance":0.0};
		pp.p=pp.p||vec3.create();

		this.closestPoint(_p, pp.p);
		pp.distance=this.distance(_p);

		return pp;
	}


	//.................................................................................Plane
	_cogl.Plane=function(_origin, _normal, _yAxisHint) {
		this.origin=_cogl.vectorize3(_origin);
		this.zAxis=_cogl.vectorize3(_normal);

		vec3.normalize(this.zAxis, this.zAxis);

		this.yAxis=_yAxisHint||(Math.abs(this.zAxis[2])<0.9? vec3.fromValues(0,0,1): vec3.fromValues(0,1,0));

		this.xAxis=vec3.create();

		vec3.cross(this.xAxis, this.yAxis, this.zAxis);
		vec3.normalize(this.xAxis, this.xAxis);

		vec3.cross(this.yAxis, this.zAxis, this.xAxis);
		vec3.normalize(this.yAxis, this.yAxis);
	} 


	
	_cogl.Plane.prototype.update=function() {
		vec3.normalize(this.zAxis, this.zAxis);

		vec3.cross(this.xAxis, this.yAxis, this.zAxis);
		vec3.normalize(this.xAxis, this.xAxis);

		vec3.cross(this.yAxis, this.zAxis, this.xAxis);
		vec3.normalize(this.yAxis, this.yAxis);
	}

	_cogl.Plane.prototype.getMatrix=function(_matrix) {
		var matrix=_matrix||mat4.create();

		matrix[0]=this.xAxis[0];
		matrix[1]=this.xAxis[1];
		matrix[2]=this.xAxis[2];
		matrix[3]=0.0;

		matrix[4]=this.yAxis[0];
		matrix[5]=this.yAxis[1];
		matrix[6]=this.yAxis[2];
		matrix[7]=0.0;

		matrix[8]=this.zAxis[0];
		matrix[9]=this.zAxis[1];
		matrix[10]=this.zAxis[2];
		matrix[11]=0.0;

		matrix[12]=this.origin[0];
		matrix[13]=this.origin[1];
		matrix[14]=this.origin[2];
		matrix[15]=1.0;

	/*	matrix[0]=this.xAxis[0];
		matrix[4]=this.xAxis[1];
		matrix[8]=this.xAxis[2];
		matrix[3]=0.0;

		matrix[1]=this.yAxis[0];
		matrix[5]=this.yAxis[1];
		matrix[9]=this.yAxis[2];
		matrix[7]=0.0;

		matrix[2]=this.zAxis[0];
		matrix[6]=this.zAxis[1];
		matrix[10]=this.zAxis[2];
		matrix[11]=0.0;

		matrix[12]=this.origin[0];
		matrix[13]=this.origin[1];
		matrix[14]=this.origin[2];
		matrix[15]=1.0;*/

		return matrix;
	}

	_cogl.Plane.prototype.globalToLocal=function(_pGlobal, _pLocal) {
		var p=_pLocal||vec3.create();

		var dp=vec3.create();

		vec3.subtract(dp, _pGlobal, this.origin);

		p[0]=vec3.dot(dp, this.xAxis);
		p[1]=vec3.dot(dp, this.yAxis);
		p[2]=vec3.dot(dp, this.zAxis);

		return p;
	}

	_cogl.Plane.prototype.localToGlobal=function(_pLocal, _pGlobal) {
		var p=_pGlobal||vec3.create();

		vec3.copy(p, this.origin);

		vec3.scaleAndAdd(p, p, this.xAxis, _pLocal[0]);
		vec3.scaleAndAdd(p, p, this.yAxis, _pLocal[1]);
		vec3.scaleAndAdd(p, p, this.zAxis, _pLocal[2]);

		return p;
	}


	_cogl.Plane.prototype.clone=function(_clone) {
		if (_clone) {
			vec3.copy(_clone.origin, this.origin);
			vec3.copy(_clone.xAxis, this.xAxis);
			vec3.copy(_clone.yAxis, this.yAxis);
			vec3.copy(_clone.zAxis, this.zAxis);


			return _clone;	
		}
		else {
			var clone= new _cogl.Plane(this.origin, this.zAxis, this.yAxis);

			vec3.copy(clone.origin, this.origin);
			vec3.copy(clone.xAxis, this.xAxis);
			vec3.copy(clone.yAxis, this.yAxis);
			vec3.copy(clone.zAxis, this.zAxis);

			return clone;	
		}
	}	

	_cogl.Plane.prototype.synthesize=function() {
		this.x=this.origin[0];
		this.y=this.origin[1];
		this.z=this.origin[2];

		var that=this;

		CO.CO(this).variable("x").onChange(this, function(_e) {
			that.origin[0]=that.x;
		});

		CO.CO(this).variable("y").onChange(this, function(_e) {
			that.origin[1]=that.y;
		});

		CO.CO(this).variable("z").onChange(this, function(_e) {
			that.origin[2]=that.z;
		});

		CO.CO(this).variable("zAxis").onChange(this, function(_e) {
			that.update();
		});


		//CO.CO(this).variable("length")
	}



	//geometry interface
	_cogl.Plane.prototype.signedDistance=function(_p) {
		var dp=vec3.create();
		vec3.subtract(dp, _p, this.origin);

		return vec3.dot(dp, this.zAxis);
	}

	_cogl.Plane.prototype.distance=function(_p) {
		return Math.abs(this.signedDistance(_p));
	}

	_cogl.Plane.prototype.closestPoint=function(_p, _cp) {		
		var cp=_cp||vec3.create();
		vec3.subtract(cp, _p, this.origin);
		var dist=vec3.dot(cp, this.zAxis);

		vec3.scaleAndAdd(cp, _p, this.zAxis, -dist);

		return cp;
	}

	_cogl.Plane.prototype.distanceAndPoint=function(_p, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0, "distance":0.0};
		pp.p=pp.p||vec3.create();

		vec3.subtract(pp.p, _p, this.origin);
		var dist=vec3.dot(pp.p, this.zAxis);

		vec3.scaleAndAdd(pp.p, _p, this.zAxis, -dist);
		pp.distance=Math.abs(dist);

		return pp;
	}

//.................................................................................Circle 3d
	_cogl.Circle3d=function(_plane, _r) {
		this.plane=_plane.clone();
		this.r=_r;
	} 

	

	_cogl.Circle3d.prototype.clone=function(_clone) {
		if (_clone) {
			this.plane.clone(_clone.plane);
			_clone.r=this.r;

			return _clone;	
		}
		else {
			var clone= new _cogl.Circle3d(this.plane, this.r);

			return clone;	
		}
	}	

	_cogl.Circle3d.prototype.synthesize=function() {
		this.x=this.plane.origin[0];
		this.y=this.plane.origin[1];
		this.z=this.plane.origin[2];

		this.zAxis=vec3.clone(this.plane.zAxis);

		var that=this;

		CO.CO(this).variable("x").onChange(this, function(_e) {
			that.plane.origin[0]=that.x;
		});

		CO.CO(this).variable("y").onChange(this, function(_e) {
			that.plane.origin[1]=that.y;
		});

		CO.CO(this).variable("z").onChange(this, function(_e) {
			that.plane.origin[2]=that.z;
		});

		CO.CO(this).variable("r");

		CO.CO(this).variable("zAxis").onChange(this, function(_e) {
			vec3.copy(that.plane.zAxis, that.zAxis);
			that.plane.update();
		});


		//CO.CO(this).variable("length")
	}

	

	_cogl.Circle3d.prototype.signedDistance=function(_p) {
		var pp=this.plane.closestPoint(_p);
		var dplane=vec3.distance(pp, this.plane.origin);

		if (dplane>this.r) return this.distance(_p);
		else return -this.distance(_p);
	}

	_cogl.Circle3d.prototype.distance=function(_p) {
		return vec3.distance(this.closestPoint(_p), _p);
	}

	_cogl.Circle3d.prototype.closestPoint=function(_p, _cp) {		
		var cp=this.plane.closestPoint(_p, _cp);

		vec3.subtract(cp, cp, this.plane.origin);
		var len=vec3.length(cp);
		if (len==0.0) {
			this.plane.localToGlobal([this.r, 0, 0], cp);
		}
		else {
			vec3.scale(cp, cp, this.r/len);		
			vec2.add(cp, this.plane.origin, cp);
		}

		return cp;
	}

	_cogl.Circle3d.prototype.distanceAndPoint=function(_p, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0, "distance":0.0};
		pp.p=this.closestPoint(_p, pp.p);
	
		pp.distance=vec3.distance(pp.p, _p);

		return pp;
	}

//.................................................................................Circle 3d
	_cogl.Cylinder=function(_plane, _r, _height) {
		this.baseCircle=new _cogl.Circle3d(_plane, _r);
		this.height=_height;
	} 

	_cogl.Cylinder.prototype.clone=function(_clone) {
		if (_clone) {
			this.baseCircle.clone(_clone.baseCircle);
			_clone.height=this.height;

			return _clone;	
		}
		else {
			var clone= new _cogl.Cylinder(this.baseCircle.plane, this.baseCircle.r, this.height);

			return clone;	
		}
	}	


	_cogl.Circle3d.prototype.synthesize=function() {
		this.x=this.baseCircle.plane.origin[0];
		this.y=this.baseCircle.plane.origin[1];
		this.z=this.baseCircle.plane.origin[2];

		this.zAxis=vec3.clone(this.baseCircle.plane.zAxis);

		var that=this;

		CO.CO(this).variable("x").onChange(this, function(_e) {
			that.baseCircle.plane.origin[0]=that.x;
		});

		CO.CO(this).variable("y").onChange(this, function(_e) {
			that.baseCircle.plane.origin[1]=that.y;
		});

		CO.CO(this).variable("z").onChange(this, function(_e) {
			that.baseCircle.plane.origin[2]=that.z;
		});

		CO.CO(this).variable("r");
		CO.CO(this).variable("height");


		CO.CO(this).variable("zAxis").onChange(this, function(_e) {
			vec3.copy(that.baseCircle.plane.zAxis, that.zAxis);
			that.baseCircle.plane.update();
		});


		//CO.CO(this).variable("length")
	}
	

	_cogl.Cylinder.prototype.signedDistance=function(_p) {
		var pp=this.baseCircle.plane.closestPoint(_p);
		var dplane=vec3.distance(pp, this.baseCircle.plane.origin);

		if (dplane>this.r) return this.distance(_p);
		else return -this.distance(_p);
	}

	_cogl.Cylinder.prototype.distance=function(_p) {
		return vec3.distance(this.closestPoint(_p), _p);
	}

	_cogl.Cylinder.prototype.closestPoint=function(_p, _cp) {		
		var cp=this.baseCircle.closestPoint(_p, _cp);

		var dv=vec3.create();

		vec3.subtract(dv, _p, cp);

		var dn=vec3.dot(dv, this.baseCircle.plane.zAxis);

		if (dn<0.0) dn=0.0;
		else if (dn>this.height) dn=this.height;

		vec3.scaleAndAdd(cp, cp, this.baseCircle.plane.zAxis, dn);

		return cp;
	}

	_cogl.Cylinder.prototype.distanceAndPoint=function(_p, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0, "distance":0.0};
		pp.p=this.closestPoint(_p, pp.p);
	
		pp.distance=vec3.distance(pp.p, _p);

		return pp;
	}
//..............................................................................................Line3d
	_cogl.Line=function(_p0, _p1, _infiniteStart, _infiniteEnd) {

		this.p0=_cogl.vectorize3(_p0);
		this.p1=_cogl.vectorize3(_p1);

		this.dv=vec3.create();
		this.dvn=vec3.create();

		this.length=0.0;

		this.inf0=_infiniteStart||false;
		this.inf1=_infiniteEnd||false;

		this.update();
	} 

	_cogl.Line.prototype.update=function() {
		vec3.subtract(this.dv, this.p1, this.p0);
		this.length=vec3.length(this.dv);

		if (this.length>0.0) vec3.scale(this.dvn, this.dv, 1.0/this.length);
		else vec3.set(this.dvn, 0.0, 0.0, 0.0);
	}

	_cogl.Line.prototype.setPoints=function(_p0, _p1, _infiniteStart, _infiniteEnd) {
		this.p0=_cogl.vectorize3(_p0);
		this.p1=_cogl.vectorize3(_p1);

		this.inf0=_infiniteStart||false;
		this.inf1=_infiniteEnd||false;

		this.update();
	}

	_cogl.Line.prototype.pointAt=function(_t, _point) {
		var pt=_point||vec3.create();

		vec3.scaleAndAdd(pt, this.p0, this.dv, _t);
		return _point;	
	}

	var dvec=vec3.create();
	var pvec=vec3.create();

	_cogl.Line.prototype.clone=function(_clone) {
		if (_clone) {
			_clone.setPoints(this.p0, this.p1, this.inf0, this.inf1);

			return _clone;	
		}
		else {
			var clone= new _cogl.Line(this.p0, this.p1, this.inf0, this.inf1);

			return clone;	
		}
	}	

	_cogl.Line.prototype.synthesize=function() {
		this.x0=this.p0[0];
		this.y0=this.p0[1];
		this.z0=this.p0[2];

		this.x1=this.p1[0];
		this.y1=this.p1[1];
		this.z1=this.p1[2];

		var that=this;

		CO.CO(this).variable("x0").onChange(this, function(_e) {
			that.p0[0]=that.x0;
			that.update();
		});

		CO.CO(this).variable("y0").onChange(this, function(_e) {
			that.p0[1]=that.y0;
			that.update();
		});

		CO.CO(this).variable("z0").onChange(this, function(_e) {
			that.p0[2]=that.z0;
			that.update();
		});


		CO.CO(this).variable("x1").onChange(this, function(_e) {
			that.p1[0]=that.x1;
			that.update();
		});

		CO.CO(this).variable("y1").onChange(this, function(_e) {
			that.p1[1]=that.y1;
			that.update();
		});

		CO.CO(this).variable("z1").onChange(this, function(_e) {
			that.p1[2]=that.z1;
			that.update();
		});

		//CO.CO(this).variable("length")
	}

	_cogl.Line.prototype.signedDistance=function(_p) {
		return this.distanceAndPoint(_p).distance;
	}

	_cogl.Line.prototype.distance=function(_p) {
		return this.distanceAndPoint(_p).distance;
	}

	_cogl.Line.prototype.closestPoint=function(_p, _cp) {		
		var pp=this.distanceAndPoint(_p);
		if (_cp) vec3.copy(_cp, pp.p);
		return _cp||pp.p;
	}

	_cogl.Line.prototype.distanceAndPoint=function(_p, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0, "distance":0.0};
		pp.p=pp.p||vec3.create();


		vec3.subtract(dvec, _p, this.p0);
		var d=vec3.dot(this.dvn, dvec);
		
		
		if ((d>=0.0 || this.inf0) && (d<=this.length || this.inf1)) {
			vec3.scale(pp.p, this.dvn, d);
			vec3.subtract(pvec, dvec, pp.p);
	
			
			vec3.add(pp.p, pp.p, this.p0)
			pp.t=d/this.length;
			
			pp.distance=vec3.length(pvec);
		}

		if (d<0.0) {
			vec3.copy(pp.p, this.p0);
			pp.t=0.0;

			pp.distance=vec3.length(dvec);
		}

		if (d>this.length) {
			vec3.subtract(dvec, _p, this.p1);
			
			vec3.copy(pp.p, this.p1);
			pp.t=1.0;

			pp.distance=vec3.length(dvec);
		}

		return pp;
	}

	


	_cogl.Line.prototype.distanceToLine=function(_line, _lineConnector, _enforceInfinity) {
		return _cogl.Line.distanceLine2Line(this, _line, _lineConnector, _enforceInfinity);		
	}

	var wv=vec3.create();
	var p0=vec3.create();
	var p1=vec3.create();

	_cogl.Line.distanceLine2Line=function(_line0, _line1, _lineConnector, _enforceInfinity) {

		vec3.subtract(wv, _line0.p0, _line1.p0);
		
		var a=_line0.length*_line0.length;
		var b=vec3.dot(_line0.dv, _line1.dv);
		var c=_line1.length*_line1.length;
		var d=vec3.dot(_line0.dv, wv);
		var e=vec3.dot(_line1.dv, wv);

		var dd=a*c-b*b;

		if (dd==0.0) {
			vec3.copy(p0, _line0.p0);

			var clop={p:p1, t:0.0};
			_line1.distanceToPoint(p0, clop);
		}
		else {
			var sp=(b*e-c*d)/dd;
			var tq=(a*e-b*d)/dd;

			if (!_enforceInfinity) {
				if (!_line0.inf0 && sp<0.0) sp=0.0;
				if (!_line0.inf1 && sp>1.0) sp=1.0;

				if (!_line1.inf0 && tq<0.0) tq=0.0;
				if (!_line1.inf1 && tq>1.0) tq=1.0;
			}

			_line0.pointAt(sp, p0);
			_line1.pointAt(tq, p1);
		}

		if (_lineConnector) {
			_lineConnector.t0=sp;
			_lineConnector.t1=tq;

			_lineConnector.setPoints(p0, p1, false, false);
			return _lineConnector.length;
		}
		else return vec3.distance(p0, p1);
	}
	
	_cogl.Line.xAxis=new _cogl.Line([0,0,0], [1,0,0], true, true);
	_cogl.Line.yAxis=new _cogl.Line([0,0,0], [0,1,0], true, true);
	_cogl.Line.zAxis=new _cogl.Line([0,0,0], [0,0,1], true, true);

	_cogl.Line.prototype.distanceToXaxis=function(_point0, _lineConnector) {
		return this.distanceToLine(new _cogl.Line(_point0, [1,0,0], true, true), _lineConnector);	
	}

	_cogl.Line.prototype.distanceToYaxis=function(_point0, _lineConnector) {
		return this.distanceToLine(new _cogl.Line(_point0, [0,1,0], true, true), _lineConnector);	
	}

	_cogl.Line.prototype.distanceToZaxis=function(_point0, _lineConnector) {
		return this.distanceToLine(new _cogl.Line(_point0, [0,0,1], true, true), _lineConnector);	
	}

	_cogl.Line.prototype.midPoint=function(_out) {
		return _cogl.midPoint(this.p0, this.p1, _out);
	}

	var dp10=vec3.create();
	var dp20=vec3.create();
	var dv0=vec3.create();
	var w=vec3.create();

	_cogl.Line.prototype.intersectTriangle=function(_p0, _p1, _p2, _n, _closestPointData) {
		var pp=_closestPointData||{"p":0, "t":0.0};
		pp.p=pp.p||vec3.create();

		var den=vec3.dot(this.dv, _n);

		if (Math.abs(den)<0.0000000001) return false;

		vec3.subtract(dv0, _p0, this.p0);

		pp.t=vec3.dot(dv0, _n)/den;
		if ((!this.inf0 && pp.t<0.0) || (!this.inf1 && pp.t>1.0)) return false;

		this.pointAt(pp.t, pp.p);

		vec3.subtract(dp10, _p1, _p0);
		vec3.subtract(dp20, _p2, _p0);


		var uu=vec3.dot(dp10, dp10);
		var uv=vec3.dot(dp10, dp20);
		var vv=vec3.dot(dp20, dp20);
	
		vec3.subtract(w, pp.p, _p0);

		var wu=vec3.dot(w, dp10);
		var wv=vec3.dot(w, dp20);

		var D=uv*uv-uu*vv;

		var s1=(uv*wv - vv*wu)/D;

		if (s1 < -0.001 || s1 > 1.001) return false;

		var s2 = (uv * wu - uu * wv)/D;
		if (s2 < -0.001 || (s1 + s2) > 1.001) return false;

		return true;
	}

	_cogl.Line.prototype.intersectXYplane=function(_z, _closestPointData, _tol) {
		var pp=_closestPointData||{"p":0, "t":0.0};
		pp.p=pp.p||vec3.create();

		if (Math.abs(this.dvn[2])<0.0000001) return false;
		var dz0=z-this.p0[2];
		var dz1=z-this.p1[2];

		pp.t=dz0/this.dv[2];

		this.pointAt(pp.t, pp.p);

	
		if (pp.t<0.0 && !this.inf0) return false;
		if (pp.t>1.0 && !this.inf1) return false;

		return true;
	}

}