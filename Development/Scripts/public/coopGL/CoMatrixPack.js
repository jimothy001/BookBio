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


COGL.MatrixPackModule=function(_cogl) {
	var gl=_cogl.gl;

	_cogl.MatrixPack=function() {
		this.normalMatrix=mat4.create();
		this.projectionMatrix=mat4.create();
		this.viewMatrix=mat4.create();
		this.pVMatrix=mat4.create();
		this.iViewMatrix=mat4.create();
		this.iPVMatrix=mat4.create();

		this.identity();
	}


	_cogl.MatrixPack.prototype.perspective=function(fov, ratio, near, far) {
		if (this.left) {
			delete this.left;
			delete this.right;
			delete this.top;
			delete this.bottom;
		}

		this.fov=fov;
		this.ratio=ratio;
		this.near=near;
		this.far=far;

		return this;
	}

	_cogl.MatrixPack.prototype.ortho=function(left, right, top, bottom, near, far) {
		if (this.fov) {
			delete this.fov;
		}

		this.left=left;
		this.right=right;
		this.top=top;
		this.bottom=bottom;
		this.near=near;
		this.far=far;

		return this;
	}

	_cogl.MatrixPack.prototype.lookAt=function(vp, tp, up) {
		this.viewPoint=vp;
		this.targetPoint=tp;
		this.upVector=up;

		return this;
	}

	_cogl.MatrixPack.prototype.near=function(val) {
		this.near=val;
		return this;
	}

	_cogl.MatrixPack.prototype.far=function(val) {
		this.far=val;
		return this;
	}

	_cogl.MatrixPack.prototype.fov=function(val) {
		this.Perspective(val, this.ratio, this.near, this.far);
		return this;
	}

	_cogl.MatrixPack.prototype.xAxis=function() {
		return [this.viewMatrix[0],this.viewMatrix[1],this.viewMatrix[2]];
	}

	_cogl.MatrixPack.prototype.yAxis=function() {
		return [this.viewMatrix[4],this.viewMatrix[5],this.viewMatrix[6]];
	}

	_cogl.MatrixPack.prototype.zAxis=function() {
		return [this.viewMatrix[8],this.viewMatrix[9],this.viewMatrix[10]];
	}

	_cogl.MatrixPack.prototype.update=function() {
		if (this.fov) {
			mat4.perspective(this.projectionMatrix, this.fov*Math.PI/180.0, this.ratio, this.near, this.far);   
		}
		else if (this.left) {
			mat4.ortho(this.projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far);   
		}

		if (this.viewPoint) {
			mat4.lookAt(this.viewMatrix, this.viewPoint, this.targetPoint, this.upVector);
		}
		
	    
	    mat4.multiply(this.pVMatrix, this.projectionMatrix, this.viewMatrix);
	    mat4.invert(this.iViewMatrix, this.viewMatrix);
	    mat4.transpose(this.normalMatrix, this.iViewMatrix);

	    mat4.invert(this.iPVMatrix, this.pVMatrix);

		return this;
	}

	_cogl.MatrixPack.prototype.identity=function() {
		mat4.identity(this.normalMatrix);
		mat4.identity(this.projectionMatrix);
		mat4.identity(this.viewMatrix);
		mat4.identity(this.pVMatrix);
		mat4.identity(this.iViewMatrix);
		mat4.identity(this.iPVMatrix);
	}

	_cogl.MatrixPack.prototype.applyToShaderAsTransform=function(shader) {
		shader.u.uVMatrix4=this.viewMatrix;
		shader.u.uPVMatrix4=this.pVMatrix;
		shader.u.uNormalMatrix4=this.normalMatrix;
		shader.u.uViewPoint=this.viewPoint;

	    return this;
	}

	_cogl.MatrixPack.prototype.applyToShaderAsLight=function(shader) {
		shader.u.uLightPosition=this.viewPoint;
		shader.u.uLPVMatrix4=this.pVMatrix;


	    return this;
	}

	var tempscreencoords=vec4.create();
	_cogl.MatrixPack.prototype.sceneToScreen=function(_pScene, _pScreen) {
		var p3d=vec4.fromValues(_pScene[0], _pScene[1], _pScene[2], 1.0);
		 
        vec4.transformMat4(tempscreencoords, p3d, this.pVMatrix);

        _pScreen[0]=tempscreencoords[0]/tempscreencoords[3];
        _pScreen[1]=tempscreencoords[1]/tempscreencoords[3];
        _pScreen[2]=tempscreencoords[2]/tempscreencoords[3];

        _pScreen[0]=(_pScreen[0]+1.0)*0.5*_cogl.width;
        _pScreen[1]=(_pScreen[1]+1.0)*0.5*_cogl.height;

        return this;
    }


}