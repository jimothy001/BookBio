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

COGL.ConstrainsModule=function(_cogl) {
	var gl=_cogl.gl;

	_cogl.Constraint=function(_geometry, _interior) {  //interior<0 inside, >0 outside and ==0 on
		this.geometry=_geometry;
		this.attached=[];
		this.interior=_interior;
	}

	_cogl.Constraint.prototype.attach=function(_p) {
		if (!_p) return;
		if (CO.contains(this.attached, _p)) return;

		this.attached.push(_p);
		this.apply(_p);
	}

	_cogl.Constraint.prototype.apply=function(_p) {
		if (!this.geometry) return;

		if (_p.getLocation && _p.setLocation) {
			var pp=this.geometry.closestPoint(_cogl.vectorize3(_p.getLocation()));

			_p.setLocation(pp);			
		}
		else {
			var pp=this.geometry.closestPoint(_cogl.vectorize3(_p));
			_cogl.deVectorize3(pp, _p);		
		}
	}

	_cogl.Constraint.prototype.onChange=function(_callback) {
		if (!this.geometry) return;

		if (!this.geometry.__CODATA) this.geometry.synthesize();


		var that=this;
		CO.CO(this.geometry).onChange(this, function(_e) {that.geometryChanged(_e, _callback)});
	}

	_cogl.Constraint.prototype.geometryChanged=function(_e, _callback) {
		if (!this.geometry) return;

		this.updateAttachments();

		if (_callback) _callback(this);
	}

	_cogl.Constraint.prototype.updateAttachments=function() {
		if (!this.geometry) return;

		for(var i=0; i<this.attached.length; ++i) {
			this.apply(this.attached[i]);
		}
	}
}