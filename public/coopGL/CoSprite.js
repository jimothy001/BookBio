/*
* Copyright (c) 2012 Panagiotis Michalatos [www.sawapan.eu]
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

function CSprite(gl) {
    this.gl=gl;
    this.VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0]), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.ready=false;
    var that=this;

    this.program=LoadShaderFromFiles(gl, "shaders/sprite_vs.glsl", "shaders/sprite_fs.glsl", 
            function(prog) {
                that.PVMatrix=gl.getUniformLocation(prog, "PVMatrix");
                that.VMatrix=gl.getUniformLocation(prog, "VMatrix");
                that.uPos=gl.getUniformLocation(prog, "uPos");
                that.uDim=gl.getUniformLocation(prog, "uDim");
                that.uTexture0=gl.getUniformLocation(prog, "uTexture0");
                that.color=gl.getUniformLocation(prog, "color");


                gl.useProgram(prog);

                gl.uniform4f(that.color, 1,1,1,1);
                gl.uniform1i(that.uTexture0, 0);

                that.ready=true;
            }
        );    
}

CSprite.prototype.Begin=function(PVMAT, VMAT) {
    if (!this.ready) return;
    this.gl.useProgram(this.program);

    this.gl.uniformMatrix4fv(this.PVMatrix, false, PVMAT);
    this.gl.uniformMatrix4fv(this.VMatrix, false, VMAT);
    

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);

    this.gl.enableVertexAttribArray(0);
    this.gl.disableVertexAttribArray(1);
    this.gl.disableVertexAttribArray(2);
    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 8 , 0);
}

CSprite.prototype.End=function() {
    if (!this.ready) return;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
}

CSprite.prototype.Render=function(_texture, _x, _y, _z, _l, _r, _b, _t) {
    if (!this.ready) return;
    if (_texture != null) _texture.BindTextureAt(this.gl, 0);
    this.gl.uniform3f(this.uPos, _x, _y, _z);
    this.gl.uniform4f(this.uDim, _l, _r, _b, _t);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
}
