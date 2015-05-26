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

COGL.ModelModule=function(_cogl) {
	var gl=_cogl.gl;



	_cogl.Model=function(_mesh, _x, _y, _z, _shaderUniforms){
		this.modelmatrix=mat4.create();
		mat4.identity(this.modelmatrix);

		this.parent=null; //if not null concatenate transforms during rendering

		this.x=_x;
		this.y=_y;
		this.z=_z;

		this.setTranslation(_x, _y, _z);

		this.mesh=_mesh;			

		this.material=null; 
		this.shaderUniforms=_shaderUniforms || {}; //this properties are set on the shader each time this object is rendered
		this.shaderUniforms.uMMatrix4=this.modelmatrix;

		this.constraints=null;

		if (!this.shaderUniforms.uSelectionIndex) this.shaderUniforms.uSelectionIndex=0; //ensures that the object will affect the depth buffer of the selection rendering pass even if it is not selectable
	}

	_cogl.Model.prototype.setLocation=function(_p) {
		this.setTranslation(_p[0], _p[1], _p[2]);
	}

	_cogl.Model.prototype.getLocation=function(_p) {
		if (_p) return vec3.set(_p, this.x, this.y, this.z);
		return vec3.fromValues(this.x, this.y, this.z);	
	}

	_cogl.Model.prototype.updateConstraints=function() {
		if (!this.constraints || !this.constraints.length) return;
		if (this.constraints.length==1) {
			this.constraints[0].apply(this);
			return;
		}

		for(var i=0; i<this.constraints.length; ++i) {
			this.constraints[i].apply(this); //TODO: find the closest and apply only that one
		}
		
	}

	_cogl.Model.prototype.localToScene=function(_pLocal, _pScene) {
		vec3.transformMat4(_pScene, _pLocal, this.modelmatrix);
	}

	_cogl.Model.prototype.applyConstraints=function(_p) {
		if (!this.constraints || !this.constraints.length) return;
		if (this.constraints.length==1) {
			this.constraints[0].apply(_p);
			return;
		}

		for(var i=0; i<this.constraints.length; ++i) {
			this.constraints[i].apply(_p); //TODO: find the closest and apply only that one
		}
		
	}

	_cogl.Model.prototype.moveTo=function(_p) {
		var pdest=vec3.clone(_p);
		this.applyConstraints(pdest);
		this.setTranslation(pdest[0], pdest[1], pdest[2]);		
	}

	_cogl.Model.prototype.addConstraints=function(_const) {
		if (!this.constraints) this.constraints=[];

		if (CO.contains(this.constraints, this)) return;

		this.constraints.push(_const);
		_const.attach(this);
	}

	_cogl.Model.prototype.isMouseOver=function() {
		return (this.uSelectionIndex && this.uSelectionIndex==_cogl.mouseOverIndex);
	}



	_cogl.Model.prototype.setTranslation=function(x,y,z) {
		if (y!=undefined) {
			this.x=x;
			this.y=y;
			this.z=z;	
		}
		else if (x.hasOwnProperty("x")) {
			this.x=x.x;
			this.y=x.y;
			this.z=x.z
		}
		else {
			this.x=x[0];
			this.y=x[1];
			this.z=x[2];
		}

		
		this.modelmatrix[12]=this.x;
		this.modelmatrix[13]=this.y;
		this.modelmatrix[14]=this.z;

		return this;
	}

	_cogl.Model.prototype.destory=function() {
		//TODO:
	}

	_cogl.Model.prototype.render=function (_shader) {
		var shader=(_cogl.currentPass.currentShaderOverride || (_shader || (this.material?this.material.shader:null)));
		if (!shader || !this.mesh) return this;
	

		if (this.material && !_cogl.currentPass.currentShaderOverride && !_shader) 
			this.material.apply(shader);

		shader.applyUniforms(this.shaderUniforms);

		if (_cogl.currentPass.currentShaderUniforms) shader.applyUniforms(_cogl.currentPass.currentShaderUniforms);
        
        shader.use();
	    this.mesh.render();

	    return this;
	}

}