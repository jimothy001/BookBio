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

COGL.DrawModule=function(_cogl) {
	var gl=_cogl.gl;

/*	DrawModes={};

	DrawModes[gl.POINTS]=0;
	DrawModes[gl.LINE_STRIP]=1;
	DrawModes[gl.LINES]=2;
	DrawModes[gl.TRIANGLES]=3;*/

	const VSIZE=8; //floats per vertex


	_cogl.DrawingEngine=function(_mode) {  
		this.mode=_mode;

		this.lastNormal=new Float32Array(3);
		this.lastTexCoord=new Float32Array(2);

		this.maxCount=20000*VSIZE;
		this.VBOdata=new Float32Array(this.maxCount);
		this.count=0;
		this.elcount=0;
		this.VBO=gl.createBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
		gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.DYNAMIC_DRAW);//gl.STATIC_DRAW);
	}

	_cogl.DrawingEngine.prototype.fullVertex=function(_p, _n, _uv) { 
		if (this.count+VSIZE>=this.maxCount) this.commit();

		this.VBOdata.set(_p, this.count);
		this.count+=3;
		this.VBOdata.set(_n, this.count);
		this.count+=3;
		this.VBOdata.set(_uv, this.count);
		this.count+=2;

		this.elcount++;
	}

	_cogl.DrawingEngine.prototype.vertex=function(_p) {
		this.fullVertex(_p, this.lastNormal, this.lastTexCoord);
	}


	_cogl.DrawingEngine.prototype.buffer=function(_a) {
		if (this.count+_a>=this.maxCount) this.commit();

		this.VBOdata.set(_a);
		this.count+=_a.length;

		this.elcount+=Math.floor(_a.length/VSIZE);
	}


	_cogl.DrawingEngine.prototype.texCoords=function(_uv) {
		this.lastTexCoord.set(_uv);
	}
	
	_cogl.DrawingEngine.prototype.normal=function(_n) {
		this.lastNormal.set(_n);
	}

	_cogl.DrawingEngine.prototype.commit=function(_mode) {
		if (!this.count) return;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO); 

		var view=new Float32Array(this.VBOdata, 0, this.count);

		gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);

		//gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.VBOdata);


  
        _cogl.Mesh.setDefaultAttributes();

        gl.drawArrays(this.mode, 0, this.elcount);


		this.count=0;
		this.elcount=0;
	}

}