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
/** @module cooplib */

/**
 * CO namespace. It contains all coop functionality and classes
 * @namespace
 */
var COGL=COGL || {};


COGL.ShadersModule=function(_cogl) {
    var gl=_cogl.gl;

    _cogl.currentShader=null;
    _cogl.shaders={};

    _cogl.useShader=function(_uname) {
        if (!_cogl.shaders[_uname]) return null;
        return _cogl.shaders[_uname].use();
    }
//.................................................ShderUniforms
    var UNIINIT={};

    function defVarChangev(_var, _vec) {
        Object.defineProperty(_var.shaderProgram.u, _var.name, {
                                get : _vec?(function(){ return _vec; }):(function(){ return _var.value; }),
                                set : function(_newValue){ _var.set(_newValue); },
                                enumerable : true,
                                configurable : true}
                               );
    }

    function defSubVar(_var, _vec, _lit, _index) {
        Object.defineProperty(_vec, _lit, {
                                get : function(){ return _var.value[_index]; },
                                set : function(_newValue){ _var.value[_index]=+_newValue; _var.needUpdate();},
                                enumerable : true,
                                configurable : true}
                               );
    }

    UNIINIT[gl.INT]=function(_var) {
       if (!_var.value || isNan(_var.value))  _var.value=0;
         defVarChangev(_var);
    }

     UNIINIT[gl.INT_VEC2]=function(_var) {
        if (!_var.value || _var.value.length!=2) _var.value=new Int32Array([0,0]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "x", 0);
        defSubVar(_var, vec, "y", 1);
    }

    UNIINIT[gl.INT_VEC3]=function(_var) {
        if (!_var.value || _var.value.length!=3) _var.value=new Int32Array([0,0,0]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "x", 0);
        defSubVar(_var, vec, "y", 1);
        defSubVar(_var, vec, "z", 2);
    }

    UNIINIT[gl.INT_VEC4]=function(_var) {
       if (!_var.value || _var.value.length!=4) _var.value=new Int32Array([0,0,0,0]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "x", 0);
        defSubVar(_var, vec, "y", 1);
        defSubVar(_var, vec, "z", 2);
        defSubVar(_var, vec, "w", 2);
    }

    UNIINIT[gl.FLOAT]=function(_var) {
         if (!_var.value || isNan(_var.value))  _var.value=0;
         defVarChangev(_var);
    }

     UNIINIT[gl.FLOAT_VEC2]=function(_var) {
         if (!_var.value || _var.value.length!=2) _var.value=new Float32Array([0,0]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "x", 0);
        defSubVar(_var, vec, "y", 1);
    }

    UNIINIT[gl.FLOAT_VEC3]=function(_var) {
        if (!_var.value || _var.value.length!=3) _var.value=new Float32Array([0,0,0]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "x", 0);
        defSubVar(_var, vec, "y", 1);
        defSubVar(_var, vec, "z", 2);
    }

    UNIINIT[gl.FLOAT_VEC4]=function(_var) {
         if (!_var.value || _var.value.length!=4) _var.value=new Float32Array([0,0,0,0]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "x", 0);
        defSubVar(_var, vec, "y", 1);
        defSubVar(_var, vec, "z", 2);
        defSubVar(_var, vec, "w", 2);
    }

     UNIINIT[gl.FLOAT_MAT2]=function(_var) {
        if (!_var.value || _var.value.length!=4) _var.value=new Float32Array([1,0,1,0]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "m00", 0);
        defSubVar(_var, vec, "m01", 1);
        defSubVar(_var, vec, "m10", 2);
        defSubVar(_var, vec, "m11", 3);
    }

    UNIINIT[gl.FLOAT_MAT3]=function(_var) {
        if (!_var.value || _var.value.length!=9) _var.value=new Float32Array([1,0,0, 0,1,0, 0,0,1]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "m00", 0);
        defSubVar(_var, vec, "m01", 1);
        defSubVar(_var, vec, "m02", 2);

        defSubVar(_var, vec, "m10", 3);
        defSubVar(_var, vec, "m11", 4);
        defSubVar(_var, vec, "m12", 5);

        defSubVar(_var, vec, "m20", 6);
        defSubVar(_var, vec, "m21", 7);
        defSubVar(_var, vec, "m22", 8);
    }

    UNIINIT[gl.FLOAT_MAT4]=function(_var) {
        if (!_var.value || _var.value.length!=9) _var.value=new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
        var vec={};

        defVarChangev(_var, vec);

        defSubVar(_var, vec, "m00", 0);
        defSubVar(_var, vec, "m01", 1);
        defSubVar(_var, vec, "m02", 2);
        defSubVar(_var, vec, "m03", 3);

        defSubVar(_var, vec, "m10", 4);
        defSubVar(_var, vec, "m11", 5);
        defSubVar(_var, vec, "m12", 6);
        defSubVar(_var, vec, "m13", 7);

        defSubVar(_var, vec, "m20", 8);
        defSubVar(_var, vec, "m21", 9);
        defSubVar(_var, vec, "m22", 10);
        defSubVar(_var, vec, "m23", 11);

        defSubVar(_var, vec, "m30", 12);
        defSubVar(_var, vec, "m31", 13);
        defSubVar(_var, vec, "m32", 14);
        defSubVar(_var, vec, "m33", 15);
    }

    UNIINIT[gl.SAMPLER_2D]=function(_var) {
        if (!_var.value || isNan(_var.value))  _var.value=0;
         defVarChangev(_var);
    }
//.............................................................
    var UNISETTERS={};

    UNISETTERS[gl.INT]=function() {
        gl.uniform1i(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }

     UNISETTERS[gl.INT_VEC2]=function() {
        gl.uniform2iv(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }

    UNISETTERS[gl.INT_VEC3]=function() {
        gl.uniform3iv(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }

    UNISETTERS[gl.INT_VEC4]=function() {
        gl.uniform4iv(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }

    UNISETTERS[gl.FLOAT]=function() {
        gl.uniform1f(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }

     UNISETTERS[gl.FLOAT_VEC2]=function() {
        gl.uniform2fv(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }

    UNISETTERS[gl.FLOAT_VEC3]=function() {
        gl.uniform3fv(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }

    UNISETTERS[gl.FLOAT_VEC4]=function() {
        gl.uniform4fv(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }

     UNISETTERS[gl.FLOAT_MAT2]=function() {
        gl.uniformMatrix2fv(this.ulocation, this.transpose, this.value);
        this.needUpdateFlag=false;
    }

    UNISETTERS[gl.FLOAT_MAT3]=function() {
        gl.uniformMatrix3fv(this.ulocation, this.transpose, this.value);
        this.needUpdateFlag=false;
    }

    UNISETTERS[gl.FLOAT_MAT4]=function() {
      
        gl.uniformMatrix4fv(this.ulocation, this.transpose, this.value);
        this.needUpdateFlag=false;
    }

    UNISETTERS[gl.SAMPLER_2D]=function() {
        gl.uniform1i(this.ulocation, this.value);
        this.needUpdateFlag=false;
    }
//..................................................................

 var UNIVALUESETTERS={};

    UNIVALUESETTERS[gl.INT]=function(_v) {
        this.value=Number(_v);
        this.needUpdate();
    }

     UNIVALUESETTERS[gl.INT_VEC2]=function(_v) {
        if (!_v || _v.length!=2) return;
        this.value.set(_v);        
        this.needUpdate();
    }

    UNIVALUESETTERS[gl.INT_VEC3]=function(_v) {
        if (!_v || _v.length!=3) return;
        this.value.set(_v);

        this.needUpdate();
    }

    UNIVALUESETTERS[gl.INT_VEC4]=function(_v) {
       if (!_v || _v.length!=4) return;
        this.value.set(_v);
        this.needUpdate();
    }

    UNIVALUESETTERS[gl.FLOAT]=function(_v) {
        this.value=Number(_v);
        this.needUpdate();
    }

     UNIVALUESETTERS[gl.FLOAT_VEC2]=function(_v) {
        if (!_v || _v.length!=2) return;
        this.value.set(_v);
        this.needUpdate();
    }

    UNIVALUESETTERS[gl.FLOAT_VEC3]=function(_v) {
        if (!_v || _v.length!=3) return;
       this.value.set(_v);
        this.needUpdate();
    }

    UNIVALUESETTERS[gl.FLOAT_VEC4]=function(_v) {
        if (!_v || _v.length!=4) return;
        this.value.set(_v);
        this.needUpdate();
    }

     UNIVALUESETTERS[gl.FLOAT_MAT2]=function(_v) {
        if (!_v || _v.length!=4) return;
       this.value.set(_v);
        this.needUpdate();
    }

    UNIVALUESETTERS[gl.FLOAT_MAT3]=function(_v) {
        if (!_v || _v.length!=9) return;
        this.value.set(_v);
       this.needUpdate();
    }

    UNIVALUESETTERS[gl.FLOAT_MAT4]=function(_v) {
        if (!_v || _v.length!=16) return;
       this.value.set(_v);
        this.needUpdate();
    }

    UNIVALUESETTERS[gl.SAMPLER_2D]=function(_v) {
        this.value=Number(_v);
       this.needUpdate();
    }

     _cogl.ShaderUniform=function(_shaderProgram, _uniformInfo, _index) {
        this.shaderProgram=_shaderProgram;
        this.name=_uniformInfo.name;
        this.type=_uniformInfo.type;
        this.size=_uniformInfo.size;
        this.index=_index;
        this.ulocation=gl.getUniformLocation(this.shaderProgram.program, this.name)

        this.transpose=false;

        this.needUpdateFlag=true;
        this.value=0;

        this.update=UNISETTERS[this.type];
        this.set=UNIVALUESETTERS[this.type];

        var tempval=null;
        if (this.shaderProgram.u.hasOwnProperty(this.name)) {
            tempval=this.shaderProgram.u[this.name];
               
        }

        UNIINIT[this.type](this);

        if (tempval!=null) this.set(tempval);        

        this.shaderProgram.uniform[this.name]=this;
     }

     _cogl.ShaderUniform.prototype.updateLocation=function() {
        this.ulocation=gl.getUniformLocation(this.shaderProgram.program, this.name);
     }

     _cogl.ShaderUniform.prototype.needUpdate=function() {
        this.shaderProgram.needUpdateFlag=true;
        this.needUpdateFlag=true;
     }

     _cogl.ShaderAttribute=function(_shaderProgram, _attributeInfo, _index) {
        this.shaderProgram=_shaderProgram;
        this.name=_attributeInfo.name;
        this.type=_attributeInfo.type;
        this.size=_attributeInfo.size;
        this.index=_index;

        this.shaderProgram.attribute[this.name]=this;
     }
//.................................................ShaderProgram
    _cogl.ShaderProgram=function(_uname) {
        if (_cogl.shaders[this.uname]) return _cogl.shaders[this.uname];

        this.uname=_uname;

        _cogl.shaders[this.uname]=this;

        this.ready=false;
        this.program=null;

        this.vertexShader=null;
        this.fragmentShader=null;

        this.attribute={};
        this.uniform={};

        this.u={}; //shorthand aliases with getter/setter mechanics
        this.needUpdateFlag=true;

        this.error=null;
    }

    _cogl.ShaderProgram.prototype.update=function() {
        if (!this.needUpdateFlag) return;
        for(var i in this.uniform) {
            if (!this.uniform[i].needUpdateFlag) continue;
            this.uniform[i].update();
        }
        this.needUpdateFlag=false;
    }
    _cogl.ShaderProgram.prototype.fromFiles=function(_vertexShaderFile, _fragmentShaderFile, _onLoaded) {   
        if (this.error) return;

        var that=this;     
        _cogl.loader.get(_vertexShaderFile, that, function(_error, _vscode){
            if (_error) {
                that.error=_error;
                if (_onLoaded) _onLoaded(that.error, null);
            }
            else {
                _cogl.loader.get(_fragmentShaderFile, that, function(_error, _fscode){
                    if (_error) {
                        that.error=_error;
                        if (_onLoaded) _onLoaded(that.error, null);
                    }
                    else {
                        that.fromCode(_vscode, _fscode);
                        if (_onLoaded) _onLoaded(null, that);
                    }
                });
            }
        });
    }

    _cogl.ShaderProgram.prototype.fromDOM=function(_vertexShaderElement, _fragmentShaderElement) {
        var vscode = document.getElementById(_vertexShaderElement).firstChild.textContent;
        var fscode = document.getElementById(_fragmentShaderElement).firstChild.textContent;

        if (!vscode) {
            this.error="element not found: "+_vertexShaderElement;
            return;
        }

        if (!fscode) {
            this.error="element not found: "+_fragmentShaderElement;
            return;
        }

        this.fromCode(vscode, fscode);
    }

    _cogl.ShaderProgram.prototype.fromCode=function(_vertexShaderCode, _fragmentShaderCode) {
        var vshader=new _cogl.Shader(gl.VERTEX_SHADER, _vertexShaderCode);
        var fshader=new _cogl.Shader(gl.FRAGMENT_SHADER, _fragmentShaderCode);
        this.fromShaders(vshader, fshader);
    }

    _cogl.ShaderProgram.prototype.fromShaders=function(_vertexShader, _fragmentShader) {
        this.vertexShader=_vertexShader;
        this.fragmentShader=_fragmentShader;
    }

    _cogl.ShaderProgram.prototype.applyUniforms=function(_uniforms) {
        if (this.error || !this.program || !_uniforms) return this;
        
        for(var i in _uniforms) {
            if (this.u.hasOwnProperty(i)) this.u[i]=_uniforms[i];
        }
    }


    _cogl.ShaderProgram.prototype.compileAndLink=function() {
        if (this.error) return null;
        if (this.program) return this;

        if (!this.vertexShader || !this.fragmentShader) return null;

        if (!this.vertexShader.compile()) {
            this.error="vertex shader error:" + this.vertexShader.error;
            console.log(this.error);
            return null;
        }

        if (!this.fragmentShader.compile()) {
            this.error="fragment shader error:" + this.fragmentShader.error;
             console.log(this.error);
            return null;
        }

        this.program=gl.createProgram();

        gl.attachShader(this.program, this.vertexShader.shader);
        gl.attachShader(this.program, this.fragmentShader.shader);   


        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
          this.error = gl.getProgramInfoLog(this.program);

          console.log(this.error);
          return null;
        }

        this.enumerateVariables();

        this.applyUniforms(this.vertexShader.uniformDefaults);
        this.applyUniforms(this.fragmentShader.uniformDefaults);

        this.ready=true;
        return this;
    }

    _cogl.ShaderProgram.prototype.enumerateVariables=function() {
        if (this.error || !this.program) return;

        var p=gl.getParameter(gl.CURRENT_PROGRAM);
        gl.useProgram(this.program);   


        var adata=gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        var udata=gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

        for (var i=0; i<udata;++i)
        {
            var info=gl.getActiveUniform(this.program, i);
            var u=new _cogl.ShaderUniform(this, info, i);
        }


        //gl.bindAttribLocation(this.program, 0, "aPosition");
        //gl.bindAttribLocation(this.program, 1, "aNormal");
        //gl.bindAttribLocation(this.program, 2, "aTexCoord");

        for (var i=0; i<adata;++i)
        {
            var info=gl.getActiveAttrib(this.program, i);

            /*var a=null;
            var an=info.name.split("_");
            if (an.length>1 && !isNaN(an[an.length-1])) {
               gl.bindAttribLocation(this.program, an[an.length-1], info.name);
            }*/
            
            a=new _cogl.ShaderAttribute(this, info, i);
        }

        this.setAttributeLocations(["aPosition", "aNormal", "aTexCoord"]);
        

        gl.useProgram(p);   
    }

    _cogl.ShaderProgram.prototype.setAttributeLocations=function(_attributes) {
        if (this.error || !this.program) return this;
        for (var i=0; i<_attributes.length;++i)
        {
           gl.bindAttribLocation(this.program, i, _attributes[i]);
        }

        this.reLink(); //relink in order for agttribute binding to take effect

        return this;
    }

    _cogl.ShaderProgram.prototype.reLink=function() {
        if (this.error || !this.program) return this;
        gl.linkProgram(this.program);

        gl.useProgram(this.program); 


        for(var i in this.uniform) {
            this.uniform[i].updateLocation();
        }

        return this;
    }

    _cogl.ShaderProgram.prototype.use=function() {
        if (this.error) return null;
        if (!this.program) {    //deferrs compiling on first use
            if (!this.compileAndLink()) {
             //   console.log(this.error);
                return null;             
            }
        }
        if (!this.ready) return this; //chain uniform setting

        if (_cogl.currentPass) _cogl.currentPass.usedShaders[this.uname]=this; //every pass keeps track of shaders used for optimization
        _cogl.currentShader=this ;
        gl.useProgram(this.program);   //this is important to be befor the update

        this.update();        

        //if (_cogl.currentShader==this) return this;    
        
        return this;
    }

    _cogl.ShaderProgram.prototype.destroy=function() {
        this.ready=false;
        //this.error=null;

        delete _cogl.shaders[this.uname];

        if (this.program) gl.deleteProgram(this.program);
        this.program=0;

        if (this.vertexShader) this.vertexShader.destroy();
        if (this.fragmentShader) this.fragmentShader.destroy();
    }

//...............................................Shader

    _cogl.Shader=function(_shadertype, _code) {
        this.code=_code;
        this.shaderType=_shadertype;

        this.shader=null;

        this.error=null;

        this.uniformDefaults={};

        this.parseCode();
    }

    _cogl.Shader.prototype.parseCode=function() {
        var reg=(/uniform\s+(\w+)\s+(\w+)\s*\;\s*\/\/\=(.*)/g);

        this.uniformDefaults={};
        var match;
        while (match = reg.exec(this.code)) {
            try{
                var data=JSON.parse(match[3]);
                this.uniformDefaults[match[2]]=data;
               // this.uniformDefaults.push({type:match[1], name:match[2], value:data});
            }
            catch(e) {

            }
            
        }
    }

    _cogl.Shader.prototype.compile=function() {
        if (this.error) return null;
        if (this.shader) return this;

        this.shader=gl.createShader(this.shaderType);

        gl.shaderSource(this.shader, this.code);
        gl.compileShader(this.shader);

        if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
            this.error=gl.getShaderInfoLog(this.shader);
            console.log(this.error);
            return null;
        }

        return this;
    }

     _cogl.Shader.prototype.destroy=function() {
        //this.error=null;

        if (this.shader) gl.deleteShader(this.dhader);
        this.shader=null;

    }
//..........................................

    _cogl.LoadShadersFromDOM=function(_uname, _vertexShaderElement, _fragmentShaderElement) {
        var shader=new _cogl.ShaderProgram(_uname);
        shader.fromDOM(_vertexShaderElement, _fragmentShaderElement);
        
        return shader;
    }


    _cogl.LoadShaderFromFiles=function(_uname, _vertexShaderFile, _fragmentShaderFile, _onLoaded) {
        var shader=new _cogl.ShaderProgram(_uname);
        shader.fromFiles(_vertexShaderFile, _fragmentShaderFile, _onLoaded);
        
        return shader;
    }



 /*   _COGLExt.BindTexturesForShader=function(shader, Textures) {
        if (!Textures) return;
        
        gl.useProgram(shader);
        

        for(var i=0; i<Textures.length; ++i) {
            Textures[i][0].BindTextureAt(gl, Textures[i][1]);
            gl.uniform1i(gl.getUniformLocation(shader, Textures[i][2]), Textures[i][1]);
        }
    }

    function UnBindTextures(shader, Textures) {
        if (!Textures) return;
        
        gl.useProgram(shader);
        

        for(var i=0; i<Textures.length; ++i) {
            Textures[i][0].BindTextureAt(gl, Textures[i][1]);
            gl.uniform1i(gl.getUniformLocation(shader, Textures[i][2]), Textures[i][1]);
        }
    }


    var BufferQuad;
    function RenderQuad(shader, Textures, TargetFBO) {
        if (TargetFBO) TargetFBO.BindFBO(gl);   
        else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, width, height);
        }

        var Dtest=gl.isEnabled(gl.DEPTH_TEST);
        gl.disable(gl.DEPTH_TEST);
        BindTextures(gl, shader, Textures);


        if (!BufferQuad) {
            BufferQuad={};
            BufferQuad.VBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, BufferQuad.VBO);

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1.0,-1.0,0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
             1.0,-1.0,0.0, 0.0, 0.0, 1.0, 1.0, 0.0,
             1.0, 1.0,0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
            -1.0,-1.0,0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
             1.0, 1.0,0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
            -1.0, 1.0,0.0, 0.0, 0.0, 1.0, 0.0, 1.0
            ]), gl.STATIC_DRAW);

        }

        gl.bindBuffer(gl.ARRAY_BUFFER, BufferQuad.VBO);

        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 32, 0); // position
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 32, 12); // normal
        gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 32, 24); // texcoord

        gl.drawArrays(gl.TRIANGLES, 0, 6);


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      

        if (TargetFBO) TargetFBO.UnBindFBO(gl);  

        if (Dtest) gl.enable(gl.DEPTH_TEST);
    }*/

    //..........................................................Material
    _cogl.Material=function(_shader, _shaderUniforms, _textures) {
        this.shader=_shader;
        this.shaderUniforms=_shaderUniforms || {};
        this.textures=_textures||null;
    }

    _cogl.Material.prototype.apply=function(_shader) {

        if (this.textures) {
            for(var i in this.textures) {
                this.textures[i].bindTextureAt(i);
            }
        }

        if (_shader) {
            _shader.applyUniforms(this.shaderUniforms);
        }
        else if (this.shader) {
            this.shader.use();
            this.shader.applyUniforms(this.shaderUniforms);
         }
    }
}