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


var COGL=COGL || {};

COGL.SelectionModule=function(_cogl) {
    var gl=_cogl.gl;

    _cogl.selectables={};

    var selectionIndices=1;
    _cogl.mouseOverIndex=0;
    _cogl.mouseOverObject=null;

    _cogl.isMouseOverObject=function(_obj) {
        return (_obj.hasOwnProperty("uSelectionIndex") && _obj.uSelectionIndex==_cogl.mouseOverIndex);
    }

    _cogl.onMouseOverIndex=function(_newIndex) {
        var previousIndex=_cogl.mouseOverIndex;

        if (previousIndex==_newIndex) return;
        if (previousIndex) {
            if ( _cogl.selectables[previousIndex] && _cogl.selectables[previousIndex].onMouseLeave)  _cogl.selectables[previousIndex].onMouseLeave();
        }

         if ( _cogl.selectables[_newIndex]) {
            mouseOverObject=_cogl.selectables[_newIndex];

            if (mouseOverObject.onMouseEnter)  
                mouseOverObject.onMouseEnter();        


         }
         else mouseOverObject=null;
        
        _cogl.mouseOverIndex=_newIndex;
    }

    _cogl.onDepthBufferRead=function(_p2, _p3) {
        _cogl.mouse.newDepthValueProcessed(_p2, _p3);
    }

    
    _cogl.enableSelectionwindowPass=function(_models, _camera, _filter, _coords, _callback, _shader) {

    }

    _cogl.enableSelectionPass=function(_models, _camera, _filter, _coords, _callback, _shader) {
        return _cogl.addRenderingPass("selection").
                camera(_camera||_cogl.camera).
                shader(_shader || "selection").
                beginSelection(_coords || _cogl.mouse).
                renderModels(_models, _filter).
                endSelection(
                    function(_indices) {
                        _cogl.onMouseOverIndex(_indices[0]);                        
                        if (_callback) _callback(_indices);
                    }
                ).
                activate();
    }

    _cogl.enableDepthPass=function(_models, _camera, _filter, _coords, _callback, _shader){
        return _cogl.addRenderingPass("depth").
                camera(_camera||_cogl.camera).
                shader(_shader||"depth").
                beginDepth(_coords || _cogl.mouse).
                renderModels(_models, _filter).
                endDepth(
                    
                    function(_p2, _p3) {
                        _cogl.onDepthBufferRead(_p2, _p3);
                        if (_callback) _callback(_p2, _p3);
                    }
                ).
                activate();
    }

    _cogl.enableUVPass=function(_models, _camera, _filter, _coords, _callback, _shader){
        return _cogl.addRenderingPass("uv").
                camera(_camera||_cogl.camera).
                shader(_shader||"uvcoord").
                beginUV(_coords || _cogl.mouse).
                renderModels(_models, _filter).
                endUV(                    
                    function(_uv) {
                        vec2.copy(_cogl.mouse.pointUV, _uv)
                        if (_callback) _callback(_uv);
                    }
                ).
                activate();
    }

    _cogl.enableWNormalPass=function(_models, _camera, _filter, _coords, _callback, _shader){
        return _cogl.addRenderingPass("wnormal").
                camera(_camera||_cogl.camera).
                shader(_shader||"wnormal").
                beginWNormal(_coords || _cogl.mouse).
                renderModels(_models, _filter).
                endWNormal(                    
                    function(_n) {
                        vec3.copy(_cogl.mouse.normal, _n)
                        if (_callback) _callback(_n);
                    }
                ).
                activate();
    }

    _cogl.selectable=function(_object) {
        _object.uSelectionIndex=selectionIndices;

        _cogl.selectables[_object.uSelectionIndex]=_object;

        if (_object.shaderUniforms) _object.shaderUniforms.uSelectionIndex=_object.uSelectionIndex;
        else _object.shaderUniform={"uSelectionIndex":_object.uSelectionIndex};
        selectionIndices++;
    }

    _cogl.SelectionEngine=function() {
        this.bufferSize = 5;

        this.selectionFBO = new _cogl.FBO(this.bufferSize, this.bufferSize, false);
        //this.SelectionSprite = new CSprite(this.selectionFBO, 0.0, 0.0, 0.5, 0.5, 1.0, 0.5, 1.0, scene.Materials2D.Sprite2D);
        this.selectionPixel = new Uint8Array(4);

        this.depthFBO = new _cogl.FBO(this.bufferSize, this.bufferSize, false);
        //  this.DepthSprite = new CSprite(this.depthFBO, 0.0, 0.0, 0.5, 0.5, 1.0, 0.5, 1.0, this.Materials2D.Sprite2D);
        this.depthPixel = new Uint8Array(4);


        this.uvcoordsFBO = new _cogl.FBO(this.bufferSize, this.bufferSize, false);
        this.uvcoordsPixel = new Uint8Array(4);

        this.wnormalFBO = new _cogl.FBO(this.bufferSize, this.bufferSize, false);
        this.wnormalPixel = new Uint8Array(4);


        this.pickX = 0.0;
        this.pickY = 0.0;
        this.PickW = this.bufferSize;
        this.PickH = this.bufferSize;

        //........pickMatrix entries
        this.pickMatrix = mat4.create();
        mat4.identity(this.pickMatrix);

        this.savedPVmatrix = mat4.create();
        mat4.identity(this.savedPVmatrix);


        this.InversePVmatrix = mat4.create();
    }

    _cogl.SelectionEngine.prototype.saveMatrix = function (_PVmatrix) {
        this.externalPVmatrix=_PVmatrix;
        mat4.copy(this.savedPVmatrix, this.externalPVmatrix);        
    }

    _cogl.SelectionEngine.prototype.restoreMatrix = function () {
        mat4.copy(this.externalPVmatrix, this.savedPVmatrix);
        this.shader.u.uPVMatrix4=this.externalPVmatrix;
    }

    _cogl.SelectionEngine.prototype.setupPickMatrix = function (_shader, _x, _y, _PVmatrix) {
        this.pickX = _x;
        this.pickY = _cogl.height-_y;

        this.saveMatrix(_PVmatrix);        
      

        this.pickMatrix[0] = _cogl.width / this.PickW;
        this.pickMatrix[5] = _cogl.height / this.PickH;
        this.pickMatrix[12] = (_cogl.width - 2.0 * this.pickX) / this.PickW;
        this.pickMatrix[13] = (_cogl.height - 2.0 * this.pickY) / this.PickH;

        mat4.multiply(this.externalPVmatrix, this.pickMatrix, this.savedPVmatrix);


        this.shader=_shader;
        this.shader.u.uPVMatrix4=this.externalPVmatrix;
        this.shader.use();
    }

    _cogl.SelectionEngine.prototype.beginIndexRendering = function (_shader, _x, _y, _PVmatrix) {
        this.setupPickMatrix(_shader, _x, _y, _PVmatrix);

          //....................................
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);

        //.....................................Selection buffer
        this.selectionFBO.bindFBO(gl);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }


    _cogl.SelectionEngine.prototype.endIndexRendering = function () {
        

        gl.readPixels(Math.floor(this.bufferSize / 2), Math.floor(this.bufferSize / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.selectionPixel);
        this.selectionFBO.unBindFBO(gl);

       // var newindex = ((this.selectionPixel[0]) | (this.selectionPixel[1] << 8) | (this.selectionPixel[2] << 16) | (this.selectionPixel[3] << 24));
        var newindex = ((this.selectionPixel[0]) + (this.selectionPixel[1] *255) + (this.selectionPixel[2] *255*255) + (this.selectionPixel[3] *255*255*255));

        this.restoreMatrix();
        
         gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);

        return newindex;
    }


     _cogl.SelectionEngine.prototype.beginDepthRendering = function (_shader, _x, _y, _PVmatrix) {
        this.setupPickMatrix(_shader, _x, _y, _PVmatrix);


         //....................................
        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        //gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);
        gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);

        //.....................................Depth buffer
        this.depthFBO.bindFBO(gl);    
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    _cogl.SelectionEngine.prototype.endDepthRendering = function (_p2, _p3) {
        mat4.invert(this.InversePVmatrix, this.savedPVmatrix);

        gl.readPixels(Math.floor(this.bufferSize / 2), Math.floor(this.bufferSize / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.depthPixel);
        this.depthFBO.unBindFBO(gl);

        _p2[0] =  2.0 * ((this.pickX / (_cogl.width)) - 0.5);
        _p2[1] =  2.0 * ((this.pickY / (_cogl.height)) - 0.5);
        //_p2[2] = ( ( (this.depthPixel[0] / (256.0) + this.depthPixel[1]) / (256.0 ) + this.depthPixel[2]) / (256.0) + this.depthPixel[3]) / (256.0);
        //_p2[2] = this.depthPixel[0] / (256.0*256.0*256.0*255.0) + this.depthPixel[1]/(256.0*256.0*255.0) + this.depthPixel[2]/(256.0*255.0) + this.depthPixel[3]/ (255.0);
        _p2[2] = this.depthPixel[0] / (255.0*255.0*255.0*255.0) + this.depthPixel[1]/(255.0*255.0*255.0) + this.depthPixel[2]/(255.0*255.0) + this.depthPixel[3]/ (255.0);

        _p2[2]=(2*_p2[2])-1;
        //_p2[2]=(1/(2*_p2[2]))-1;

        this.unProjectPoint(_p2, _p3);

        if (this.depthPixel[0]==255 && this.depthPixel[1]==255 && this.depthPixel[2]==255 && this.depthPixel[3]==255) {
            _p2[2]=1.0;
        }

        this.restoreMatrix();
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);
    }

  
    _cogl.SelectionEngine.prototype.unProjectPoint = function (_p2, _p3) {
        //Transformation of normalized coordinates between -1 and 1
        var np = vec4.fromValues(_p2[0], _p2[1], _p2[2], 1.0);
        var out=vec4.create();

        vec4.transformMat4(out, np, this.InversePVmatrix);
       
        _p3[0] = out[0];
        _p3[1] = out[1];
        _p3[2] = out[2];

        if (out[3] != 0.0) {
            _p3[0] /= out[3];
            _p3[1] /= out[3];
            _p3[2] /= out[3];
        }
    }

    _cogl.SelectionEngine.prototype.unProjectPointXYZ = function (_x, _y, _z, _p3) {
        //Transformation of normalized coordinates between -1 and 1
        var np = vec4.fromValues(_x, _y, _z, 1.0);
        var out=vec4.create();
       
        vec4.transformMat4(out, np, this.InversePVmatrix);

        _p3[0] = out[0];
        _p3[1] = out[1];
        _p3[2] = out[2];

        if (out[3] != 0.0) {
            _p3[0] /= out[3];
            _p3[1] /= out[3];
            _p3[2] /= out[3];
        }
    }

    //......................................................UV

     _cogl.SelectionEngine.prototype.beginUVRendering = function (_shader, _x, _y, _PVmatrix) {
        this.setupPickMatrix(_shader, _x, _y, _PVmatrix);


         //....................................
        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        //gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);
        gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);

        //.....................................Depth buffer
        this.uvcoordsFBO.bindFBO(gl);    
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    _cogl.SelectionEngine.prototype.endUVRendering = function (_uv) {

        gl.readPixels(Math.floor(this.bufferSize / 2), Math.floor(this.bufferSize / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.uvcoordsPixel);
        this.uvcoordsFBO.unBindFBO(gl);

        _uv[0] = this.uvcoordsPixel[0] / 255.0 + this.uvcoordsPixel[1]/(255.0*255.0);
        _uv[1] = this.uvcoordsPixel[2] / 255.0 + this.uvcoordsPixel[3]/(255.0*255.0);


        this.restoreMatrix();
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);
    }
    //......................................................WNORMAL
     _cogl.SelectionEngine.prototype.beginWNormalRendering = function (_shader, _x, _y, _PVmatrix) {
        this.setupPickMatrix(_shader, _x, _y, _PVmatrix);


         //....................................
        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        //gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);
        gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);

        //.....................................Depth buffer
        this.wnormalFBO.bindFBO(gl);    
        gl.clearColor(1.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    _cogl.SelectionEngine.prototype.endWNormalRendering = function (_n) {

        gl.readPixels(Math.floor(this.bufferSize / 2), Math.floor(this.bufferSize / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.wnormalPixel);
        this.wnormalFBO.unBindFBO(gl);

        // gl_FragColor = vec4(packfloatToVec2i(clamp((1.0+atan(n.y, n.x)/M_PI)*0.5), 0.0, 1.0), packfloatToVec2i(clamp(0.5+asin(n.z)/M_PI, 0.0, 1.0)); 

        var a1=   this.wnormalPixel[0] / 255.0 + this.wnormalPixel[1]/(255.0*255.0);
        var a2=   this.wnormalPixel[2] / 255.0 + this.wnormalPixel[3]/(255.0*255.0);

        //var axy=Math.PI*(2.0*a1-1.0);
        //var az=Math.PI*(a2-0.5);

        /*_n[0]=Math.cos(axy)*Math.cos(az);
        _n[1]=Math.sin(axy)*Math.cos(az);
        _n[2]=Math.sin(az);

        vec3.normalize(_n, _n);*/


        _n[0]=2.0*a1-1.0;
        _n[1]=2.0*a2-1.0;
        _n[2]=Math.sqrt(Math.abs(1.0-_n[0]*_n[0]-_n[1]*_n[1]));

        vec3.normalize(_n, _n);

       
  

        this.restoreMatrix();
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);
    }

}