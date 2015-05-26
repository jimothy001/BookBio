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
function LineShader(gl, vs, fs) {
	var that=this;
	this.ready=false;

	this.program=LoadShaderFromFiles(gl, vs, fs, 
			function(prog) {
				that.PVMatrix=gl.getUniformLocation(prog, "PVMatrix");
				that.MMatrix=gl.getUniformLocation(prog, "MMatrix");
				that.vport=gl.getUniformLocation(prog, "vport");

				that.p0=gl.getUniformLocation(prog, "p0");
				that.p1=gl.getUniformLocation(prog, "p1");

				that.color=gl.getUniformLocation(prog, "color");
				that.w=gl.getUniformLocation(prog, "w");
				that.ext=gl.getUniformLocation(prog, "ext");

				gl.useProgram(prog);

				gl.uniform4f(that.color, 0,0,0,0);
				gl.uniform2f(that.w1, 1,1);
				gl.uniform1f(that.ext, 0);

				that.ready=true;
			}
		);
}

function CLine(gl, _canvas) {
	this.gl=gl;
	this.canvas=_canvas;

	this.shader3d=new LineShader(gl, "shaders/line_3d_vs.glsl", "shaders/line_3d_fs.glsl");
	this.shaderflat=new LineShader(gl, "shaders/line_flat_vs.glsl", "shaders/line_flat_fs.glsl");

	this.activeshader=this.shaderflat;


	this.VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, -0.5,
    1.0, -0.5,
    0.0, 0.5,
    0.0, 0.5,
    1.0, -0.5,
    1.0, 0.5]), gl.STATIC_DRAW);


    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var cres=30;
    this.CarrayX=new Array();
    this.CarrayY=new Array();

    var t=0.0;
    var dt=2.0*Math.PI/cres;
    for(var i=0; i<=cres; ++i) {

    	this.CarrayX.push(Math.cos(t));
    	this.CarrayY.push(Math.sin(t));
    	t+=dt;
    }
}


CLine.prototype.BeginPerspective= function(PVMat) {
	this.activeshader=this.shader3d;

	this.Begin(PVMat);
}

CLine.prototype.BeginFlat= function(PVMat) {
	this.activeshader=this.shaderflat;

	this.Begin(PVMat);
}

CLine.prototype.Begin= function(PVMat) {
	this.gl.useProgram(this.activeshader.program);
	this.SetPViewMatrix(PVMat);
	this.ResetModelMatrix();

	this.gl.uniform3f(this.activeshader.vport, this.canvas.width, this.canvas.height, this.canvas.width/this.canvas.height);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);

    this.gl.enableVertexAttribArray(0);
    this.gl.disableVertexAttribArray(1);
    this.gl.disableVertexAttribArray(2);
    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 8 , 0);
}

CLine.prototype.End= function() {
}

CLine.prototype.SetColor=function(r,g,b,a) {
	this.gl.uniform4f(this.activeshader.color, r,g,b,a);
}

CLine.prototype.SetWidth=function(w1, w2) {
	this.gl.uniform2f(this.activeshader.w, w1, w2);
}

CLine.prototype.SetExt=function(ex) {
	this.gl.uniform1f(this.activeshader.ext, ex);
}

CLine.prototype.Draw=function(x0, y0, z0, x1, y1, z1) {
	this.gl.uniform3f(this.activeshader.p0, x0,y0,z0);
	this.gl.uniform3f(this.activeshader.p1, x1,y1,z1);

	this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
}

CLine.prototype.Circle=function(x0, y0, z0, R) {
	for(var i=0; i<this.CarrayX.length-1;++i) {
		this.Draw(x0+this.CarrayX[i]*R, y0+this.CarrayY[i]*R, 0.0, x0+this.CarrayX[i+1]*R, y0+this.CarrayY[i+1]*R, 0.0);
	}
}


CLine.prototype.SetPViewMatrix=function(mat) {
	this.gl.uniformMatrix4fv(this.activeshader.PVMatrix, false, mat);
}

CLine.prototype.SetModelMatrix=function(mat) {
	this.gl.uniformMatrix4fv(this.activeshader.MMatrix, false, mat);
}

CLine.prototype.ResetModelMatrix=function() {
	var mid=mat4.create();
	mat4.identity(mid);
	this.SetModelMatrix(mid);
}

