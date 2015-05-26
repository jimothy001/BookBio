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

COGL.FBOModule=function(_cogl) {
    var gl=_cogl.gl;

    _cogl.FBO=function(_w, _h, _smoothtexture) {

        this.width = _w;
        this.height = _h;

        this.FBO = gl.createFramebuffer();
        this.RBO = gl.createRenderbuffer()

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.FBO);
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.RBO);

        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _w, _h);

        this.texture = _cogl.newTexture(_w, _h, _smoothtexture);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.RBO);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.FBO);
        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
        switch (status) {
            case gl.FRAMEBUFFER_COMPLETE:
                break;
            case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                throw ("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                break;
            case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                throw ("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                break;
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                throw ("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                break;
            case gl.FRAMEBUFFER_UNSUPPORTED:
                alert("FRAMEBUFFER_UNSUPPORTED by WebGL Driver")
                throw ("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
                break;
            default:
                throw ("Incomplete framebuffer: " + status);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    _cogl.FBO.prototype.bindFBO = function () {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.FBO);
        gl.viewport(0, 0, this.width, this.height);

       // gl.clearColor(1, 1, 1, 1);
       // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    _cogl.FBO.prototype.unBindFBO = function () {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, _cogl.width, _cogl.height);
    }

    _cogl.FBO.prototype.bindTexture = function () {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    _cogl.FBO.prototype.bindTextureAt = function (_t) {
        gl.activeTexture(gl.TEXTURE0 + _t);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }


}

COGL.RenderingPassModule=function(_cogl) {
    var gl=_cogl.gl;

    _cogl.renderingPasses={};
    _cogl.currentPass=null;


    _cogl.addBlurCapacity=function(_width, _height) {
        _cogl.blurFBO=new _cogl.FBO(_width, _height, true);        
    }

    _cogl.drawQuadNoDepth=function() {
        var Dtest=gl.isEnabled(gl.DEPTH_TEST);
        gl.disable(gl.DEPTH_TEST);
        _cogl.stockMeshes.screenQuad.render();
        if (Dtest) gl.enable(gl.DEPTH_TEST);
    }

    _cogl.texturePass=function(_name, _TextureOrnameOfPass, _target, _clearColor, _shader, _shaderUniforms) {
        var pass=_cogl.addRenderingPass(_name).
                        setTarget(_target);

        if (_clearColor) {           
            pass.clearColor(_clearColor[0], _clearColor[1], _clearColor[2], _clearColor[3]);
            pass.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }

        if (_TextureOrnameOfPass.bindTextureAt) {
            pass.bindTexture(_TextureOrnameOfPass, 0);
        }
        else {
            pass.requires(_TextureOrnameOfPass, 0);
        }

        var uniforms=_shaderUniforms||{};

        uniforms.uTexture=0;

        if (!uniforms.hasOwnProperty("uColor")) uniforms.uColor=[1,1,1,1];

        pass.shader(_shader||"quad", uniforms).
        renderQuad().
        activate();

        return pass;
    }

     _cogl.addMaskMapPass=function(_name, _modelsOn, _filterOn, _modelsOff, _filterOff, _camera, _target, _shader, _shaderUniforms) {
        var pass=_cogl.addRenderingPass(_name).
                setTarget(_target).            
                clearColor(0.0, 0.0, 0.0, 0.0).
                clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT).
                camera(_camera).                
                noBlend().
                shader(_shader||"mask", _shaderUniforms).
                renderModels(_modelsOn, _filterOn).
                shader(_shader||"mask", _shaderUniforms).
                renderModels(_modelsOff, _filterOff).
                regularBlend().
                activate();

        return pass;
    }

    _cogl.addNormalMapPass=function(_name, _models, _filter, _camera, _target, _shader, _shaderUniforms) {
        var pass=_cogl.addRenderingPass(_name).
                setTarget(_target).            
                clearColor(0.0, 0.0, 0.0, 1.0).
                clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT).
                camera(_camera).
                shader(_shader||"normal", _shaderUniforms).
                noBlend().
                renderModels(_models, _filter).
                regularBlend().
                activate();

        return pass;
    }

    _cogl.addDepthMapPass=function(_name, _models, _filter, _camera, _target, _shader, _shaderUniforms) {
        var pass=_cogl.addRenderingPass(_name).
                setTarget(_target).            
                clearColor(1.0, 1.0, 1.0, 1.0).
                clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT).
                camera(_camera).
                shader(_shader||"depth", _shaderUniforms).
                noBlend().
                renderModels(_models, _filter).
                regularBlend().
                activate();

        return pass;
    }


    _cogl.enableShadowPass=function(_name, _models, _filter, _camera, _light, _targetLightDepthMap, _targetShadowTexture, _shader, _shaderUniforms, _blur) {
        //_name_depthmap is the depth map associated with this
        //_target is either teo numbers [512, 512] or an FBO
        //_shader "shadow" "shadowsoft" "shadowsoftnoisy"

        var lightdepthtmap=null;

        if (_targetLightDepthMap.fixFBOBinding) //is a rendering pass
            lightdepthtmap=_targetLightDepthMap;
        else
            lightdepthtmap=_cogl.addDepthMapPass(_name+"_depthtmap", _models, _filter, _light, _targetLightDepthMap);

        var uniforms=_shaderUniforms||{};
        uniforms.uTextureDepthMap=0;

        if (!uniforms.hasOwnProperty("uBias")) uniforms.uBias=0.004;
        if (!uniforms.hasOwnProperty("uSpread")) uniforms.uSpread=[40, 8820.0];
        //if (!uniforms.hasOwnProperty("uSamples")) uniforms.uSpread=[15,12];
        if (!uniforms.hasOwnProperty("uSizeInverse")) {
            uniforms.uSizeInverse=[lightdepthtmap.target.width||_cogl.width,lightdepthtmap.target.height||_cogl.height];
            uniforms.uSizeInverse[0]=1.0/uniforms.uSizeInverse[0];
            uniforms.uSizeInverse[1]=1.0/uniforms.uSizeInverse[1];
        }
        if (!uniforms.hasOwnProperty("uReduction")) uniforms.uReduction=0.8;

        
  
        var pass=_cogl.addRenderingPass(_name).
            requires(lightdepthtmap.uname, 0).
            setTarget(_targetShadowTexture).
            clearColor(0.0, 0.0, 0.0, 1.0).
            clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT).
            camera(_camera).
            light(_light).
            shader(_shader||"shadowsoftnoisy", uniforms).
            noBlend().
            renderModels(_models, _filter).
            regularBlend().
            activate();

        return pass;
    }

    _cogl.enableEdgePass=function(_name, _models, _filter, _camera, _targetDepthMap, _targetNormalMap, _targetEdgeTexture, _shader, _shaderUniforms, _blur) {
        //_name_lightmap is the depth map associated with this
        //_target is either teo numbers [512, 512] or an FBO or a string of another rendering pass
        //_shader "edge" 

        var depthtmap=null;

        if (_targetDepthMap.fixFBOBinding) //is a rendering pass
            depthtmap=_targetDepthMap;
        else
            depthtmap=_cogl.addDepthMapPass(_name+"_depthtmap", _models, _filter, _camera, _targetDepthMap);


        var normalmap=null;

        if (_targetNormalMap.fixFBOBinding) //is a rendering pass
            normalmap=_targetNormalMap;
        else
            normalmap=_cogl.addNormalMapPass(_name+"_normalmap", _models, _filter, _camera, _targetNormalMap);


        var uniforms=_shaderUniforms||{};
        uniforms.uTextureDepthMap=0;
        uniforms.uTextureNormalMap=1;

        if (!uniforms.hasOwnProperty("uSizeInverse")) {
            uniforms.uSizeInverse=[depthtmap.target.width||_cogl.width,depthtmap.target.height||_cogl.height];
            uniforms.uSizeInverse[0]=1.0/uniforms.uSizeInverse[0];
            uniforms.uSizeInverse[1]=1.0/uniforms.uSizeInverse[1];
        }
        if (!uniforms.hasOwnProperty("uWidth")) uniforms.uWidth=2.0;
        if (!uniforms.hasOwnProperty("uDepthFactor")) uniforms.uDepthFactor=1.0;
        if (!uniforms.hasOwnProperty("uNormalFactor")) uniforms.uNormalFactor=130.0;


        var pass=_cogl.addRenderingPass(_name).
            requires(depthtmap.uname, 0).
            requires(normalmap.uname, 1).
            setTarget(_targetEdgeTexture).
            shader(_shader||"edge", uniforms).
            noBlend().
            renderQuad().
            regularBlend().
            activate();

            return pass;
    }


    _cogl.resetRenderingPasses=function() {
        for(var i in _cogl.renderingPasses) {
            _cogl.renderingPasses[i].reset();
        }
    }

    _cogl.runRenderingPasses=function() {
        _cogl.resetRenderingPasses();

        for(var i in _cogl.renderingPasses) {
            if (!_cogl.renderingPasses[i].active) continue;
            _cogl.renderingPasses[i].run();
            _cogl.flush();
        }
    }

    _cogl.addRenderingPass=function(_uname) {        
        var rpass=new _cogl.RenderingPass(_uname);

        _cogl.renderingPasses[_uname]=rpass;
        return rpass;
    }

    _cogl.activateRenderingPass=function(_uname) {        
        _cogl.renderingPasses[_uname].activate();
    }

    _cogl.deActivateRenderingPass=function(_uname) {        
        _cogl.renderingPasses[_uname].deActivate();
    }

    _cogl.RenderingPass=function(_uname) {
        this.uname=_uname;        
        this.hasExecuted=false;

        this.active=true;

        this.target=0;
        this.currentCamera=_cogl.camera;
        this.currentShaderOverride=null;
        this.currentShaderUniforms=null;

        this.usedShaders={};

        this.textureBindings={};

        this.chain=[];        
    } 

    _cogl.RenderingPass.prototype.setTarget=function(_target) {
        if (CO.isArray(_target)) {
            this.targetNewFBO(_target[0], _target[1], _target[2]);
        }
        else if (CO.isString(_target)) {        
            this.target(_cogl.renderingPasses[_target].target);
        }
        else {//if (_target.bindFBO){
            this.targetFBO(_target||0);
        }

        return this;
    }

     _cogl.RenderingPass.prototype.fixFBOBinding=function() {


        if (this.target) this.target.bindFBO();
        else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, _cogl.width, _cogl.height);
        }

    }

    _cogl.RenderingPass.prototype.run=function() {
        this.reset();
        _cogl.currentPass=this;

        this.fixFBOBinding();


        for (var i in this.usedShaders) {
            _cogl.mouse.applyToShader(this.usedShaders[i]);
          
        }

        for(var i=0; i<this.chain.length; ++i) {
            if (this.chain[i].call(this)=="HALT") break;
        }

        this.hasExecuted=true;
    }

    _cogl.RenderingPass.prototype.activate=function() {
        this.active=true;
        return this;
    }

    _cogl.RenderingPass.prototype.deActivate=function() {
        this.active=false;
        return this;
    }

    _cogl.RenderingPass.prototype.reset=function() {
        this.hasExecuted=false;

        this.currentCamera=_cogl.camera;
        this.currentShaderOverride=null;
        this.currentShaderUniforms=null;

        this.textureBindings={};
        return this;
    }



    _cogl.RenderingPass.prototype.targetNewFBO=function(_width, _height, _isSmooth) {
        this.target=new _cogl.FBO(_width, _height, _isSmooth);
        return this;
    }

    _cogl.RenderingPass.prototype.targetSharedFBO=function(_passName) {
        if (_cogl.renderingPasses[_passname]) this.target=_cogl.renderingPasses[_passname].target;
        return this;
     }

     _cogl.RenderingPass.prototype.targetFBO=function(_FBO) {
        this.target=_FBO;
        return this;
     }

     _cogl.RenderingPass.prototype.targetViewport=function() {
        this.target=0;
        return this;
     }

    _cogl.RenderingPass.prototype.camera=function(_camera) {
        var fn=function() {
            this.currentCamera=_camera || _cogl.camera;
            if (this.currentCamera) {
                //this.currentCamera.update();
                for (var i in this.usedShaders) {
                   this.currentCamera.applyToShaderAsTransform(this.usedShaders[i]);
                }
            }
        }
        
       this.chain.push(fn);
        return this;
    }

    _cogl.RenderingPass.prototype.light=function(_camera) {
        var fn=function() {
            if (_camera) {
                for (var i in this.usedShaders) {
                   _camera.applyToShaderAsLight(this.usedShaders[i]);
                }
            }
        }
        
       this.chain.push(fn);
        return this;
    }

    _cogl.RenderingPass.prototype.shader=function(_shaderName, _uniforms) {

         var fn=function() {
            this.currentShaderUniforms=_uniforms||null;

            if (!_shaderName || !_cogl.shaders[_shaderName]) {
                this.currentShaderOverride=null;                
            }
            else {
                this.currentShaderOverride=_cogl.shaders[_shaderName];  
                this.usedShaders[_shaderName]=this.currentShaderOverride;
            
                if (this.currentShaderUniforms) {
                    this.currentShaderOverride.applyUniforms(this.currentShaderUniforms);
                    
                }

                this.currentShaderOverride.use();
                
            }
        }
       this.chain.push(fn);
        return this;
    }

    _cogl.RenderingPass.prototype.shaderUniforms=function(_uniforms) {
        var fn=function() {
            this.currentShaderUniforms=_uniforms||null;

            if (this.currentShaderUniforms && this.currentShaderOverride) {
                this.currentShaderOverride.applyUniforms(this.currentShaderUniforms);     
            }

            this.currentShaderOverride=_cogl.shaders[_shaderName];  
        }

       this.chain.push(fn);
        return this;
    }

    _cogl.RenderingPass.prototype.renderModels=function(_models, _filter) {
         var fn=function() {
            if (_filter) {
                for(var i in _models) {
                    if (!_filter(_models[i])) continue;
                    _models[i].render();
                }
            }
            else {
                for(var i in _models) {
                    _models[i].render();
                }
            }
        }

       this.chain.push(fn);
        return this;
    }

    _cogl.RenderingPass.prototype.renderQuad=function() {
        var fn=function() {
            _cogl.drawQuadNoDepth();
         }

       this.chain.push(fn);
        return this;
     }

    _cogl.RenderingPass.prototype.requires=function(_passname, _at) {
        var fn=function() {
            if (!_passname || !_cogl.renderingPasses[_passname] ) return;

            if (!_cogl.renderingPasses[_passname].hasExecuted) {
                _cogl.renderingPasses[_passname].run();
                this.fixFBOBinding();
            }
            if (_cogl.renderingPasses[_passname].target)
                _cogl.renderingPasses[_passname].target.bindTextureAt(_at);
         }

       this.chain.push(fn);
        return this;
    }

    _cogl.RenderingPass.prototype.blur=function(_uBlurSize, _shaderUniforms, _maskTexture, _blurFBO) {

        
        var fn=function() {
            if (!this.target) return;

            var fbo=_blurFBO||_cogl.blurFBO;

            if (!fbo && !_cogl.blurFBO) _cogl.addBlurCapacity(256, 256);
            fbo=_cogl.blurFBO;

            if (!fbo) return;

            fbo.bindFBO();


            uniforms=_shaderUniforms||{};
            uniforms.uTexture=0;
            uniforms.uMaskTexture=1;
            uniforms.uBlurSize=_uBlurSize;


            this.target.bindTextureAt(0);


            _cogl.shaders.blurx.applyUniforms(uniforms);
            _cogl.shaders.blurx.use();
    

            _cogl.drawQuadNoDepth();


            fbo.bindTextureAt(0);

            this.fixFBOBinding();     

             _cogl.shaders.blury.applyUniforms(uniforms);
            _cogl.shaders.blury.use();
    

            _cogl.drawQuadNoDepth();



            if (this.currentShaderOverride) this.currentShaderOverride.use();


                   
         }
       
        this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.bindTexture=function(_texture, _at) {
        var fn=function() {
            if (_texture) _texture.bindTextureAt(_at);
         }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.enable=function(_glFlags) {
        var fn;
        if (_glFlags.length) {
            fn=function() {
                for(var i=0; i<_glFlags.length; ++i) {
                    gl.enable(_glFlags[i]);
                }
             }
        }
        else {
            fn=function() {
                gl.enable(_glFlags);
             }
        }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.disable=function(_glFlags) {
        var fn;
        if (_glFlags.length) {
            fn=function() {
                for(var i=0; i<_glFlags.length; ++i) {
                    gl.disable(_glFlags[i]);
                }
             }
        }
        else {
            fn=function() {
                gl.disable(_glFlags);
             }
        }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.clearColor=function(_r, _g, _b, _a) {
        var fn=function() {
            gl.clearColor(_r, _g, _b, _a);
         }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.clearColorV=function(_v) {
        var fn=function() {
            gl.clearColor(_v[0], _v[1], _v[2], _v[3]);
         }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.clear=function(_clearBits) {
        var fn=function() {
            gl.clear(_clearBits || (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT) );
         }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.halt=function(_function) {
        var fn=function() {
            if (_function) {
                if (_function()) return "HALT";
            }
            else return "HALT";
         }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.execute=function(_function) {
       this.chain.push(_function);
        return this;
     }

     _cogl.RenderingPass.prototype.readPixels=function(_callback, _window) {

        var pixels = null; //new Uint8Array(64*64*4);
        var fn=function() {
            var w=this.target.width||_cogl.width;
            var h=this.target.height||_cogl.height;
            if (pixels && pixels.length<w*h) pixels=null;
            if (!pixels) pixels=new Uint8Array(w*h*4);

            if (_window) {
                gl.readPixels(_window[0], _window[1], _window[2], _window[3], gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                if (_callback) _callback(pixels, w, h);
            }
            else {
                gl.readPixels(0,0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                if (_callback) _callback(pixels, w, h);
            }            
            
         }
       
        this.chain.push(fn);
        return this;
     }

      _cogl.RenderingPass.prototype.additiveBlend=function() {

        var fn=function() {
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.SRC_ALPHA, gl.ONE);
            gl.enable(gl.BLEND);
         }
       
        this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.subtractiveBlend=function() {

        var fn=function() {
            gl.blendEquationSeparate(gl.FUNC_SUBTRACT, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);
            gl.enable(gl.BLEND);
         }
       
        this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.multiplyBlend=function() {

        var fn=function() {
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.DST_COLOR, gl.ZERO, gl.SRC_ALPHA, gl.ONE);//gl.ONE, gl.ONE);
            gl.enable(gl.BLEND);
         }
       
        this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.noBlend=function() {

        var fn=function() {
            gl.disable(gl.BLEND);
            //gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO); //not needed actually
         }
       
        this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.regularBlend=function() {

        var fn=function() {
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);
            gl.enable(gl.BLEND);
         }
       
        this.chain.push(fn);
        return this;
     }


     _cogl.RenderingPass.prototype.applyShadows=function(_TextureOrnameOfPass, _shaderUniforms, _shader) { //multiply compositing

        var uniforms=_shaderUniforms||{};
        uniforms.uTexture=0;

        this.multiplyBlend();

        if (_TextureOrnameOfPass.bindTextureAt) {
            this.bindTexture(_TextureOrnameOfPass, 0);

            if (!uniforms.hasOwnProperty("uSizeInverse")) {
                uniforms.uSizeInverse=[_TextureOrnameOfPass.width||_cogl.width,_TextureOrnameOfPass.height||_cogl.height];
                uniforms.uSizeInverse[0]=1.0/uniforms.uSizeInverse[0];
                uniforms.uSizeInverse[1]=1.0/uniforms.uSizeInverse[1];
            }
        }
        else {
            this.requires(_TextureOrnameOfPass, 0);

            if (!uniforms.hasOwnProperty("uSizeInverse")) {
                 var ctarget=_cogl.renderingPasses[_TextureOrnameOfPass]
                if ( ctarget && ctarget.target) {                   
                    uniforms.uSizeInverse=[ctarget.target.width, ctarget.target.height];
                    uniforms.uSizeInverse[0]=1.0/uniforms.uSizeInverse[0];
                    uniforms.uSizeInverse[1]=1.0/uniforms.uSizeInverse[1];
                }
                else {
                     uniforms.uSizeInverse=[_TextureOrnameOfPass.width||_cogl.width,_TextureOrnameOfPass.height||_cogl.height];
                     uniforms.uSizeInverse[0]=1.0/uniforms.uSizeInverse[0];
                    uniforms.uSizeInverse[1]=1.0/uniforms.uSizeInverse[1];
                }                
            }
        }

        if (!uniforms.hasOwnProperty("uColor")) uniforms.uColor=[0.0, 0.0, 0.0, 1.0];
        

        this.shader(_shader||"shadowcomposite", uniforms).
        renderQuad().
        regularBlend();

        return this;
     }

     _cogl.RenderingPass.prototype.applyLight=function(_TextureOrnameOfPass, _shaderUniforms, _shader) { //additive compositing

        var uniforms=_shaderUniforms||{};
        uniforms.uTexture=0;

        this.additiveBlend();

        if (_TextureOrnameOfPass.bindTextureAt) this.bindTexture(_TextureOrnameOfPass, 0);
        else this.requires(_TextureOrnameOfPass, 0);

        this.shader(_shader||"lightcomposite", _shaderUniforms).
        renderQuad().
        regularBlend();

        return this;
     }

     _cogl.RenderingPass.prototype.applyEdges=function(_TextureOrnameOfPass, _method, _shaderUniforms, _shader) { //addcompositing

        var uniforms=_shaderUniforms||{};
        uniforms.uTexture=0;

        if (_method=="multiply") this.multiplyBlend();
        else if (_method=="add") this.additiveBlend();
        else if (_method=="subtract") this.subtractiveBlend();
        else this.regularBlend();

        if (_TextureOrnameOfPass.bindTextureAt) {
            this.bindTexture(_TextureOrnameOfPass, 0);

            if (!uniforms.hasOwnProperty("uSizeInverse")) {
                uniforms.uSizeInverse=[_TextureOrnameOfPass.width||_cogl.width,_TextureOrnameOfPass.height||_cogl.height];
                uniforms.uSizeInverse[0]=1.0/uniforms.uSizeInverse[0];
                uniforms.uSizeInverse[1]=1.0/uniforms.uSizeInverse[1];
            }
        }
        else {
            this.requires(_TextureOrnameOfPass, 0);

            if (!uniforms.hasOwnProperty("uSizeInverse")) {
                 var ctarget=_cogl.renderingPasses[_TextureOrnameOfPass]
                if ( ctarget && ctarget.target) {                   
                    uniforms.uSizeInverse=[ctarget.target.width, ctarget.target.height];
                    uniforms.uSizeInverse[0]=1.0/uniforms.uSizeInverse[0];
                    uniforms.uSizeInverse[1]=1.0/uniforms.uSizeInverse[1];
                }
                else {
                     uniforms.uSizeInverse=[_TextureOrnameOfPass.width||_cogl.width,_TextureOrnameOfPass.height||_cogl.height];
                     uniforms.uSizeInverse[0]=1.0/uniforms.uSizeInverse[0];
                    uniforms.uSizeInverse[1]=1.0/uniforms.uSizeInverse[1];
                }                
            }
        }

        if (!uniforms.hasOwnProperty("uColor")) uniforms.uColor=[0.0, 0.0, 0.0, 1.0];
        if (!uniforms.hasOwnProperty("uSoften")) uniforms.uSoften=0.0;


        this.shader(_shader||"edgecomposite", _shaderUniforms).
        renderQuad().
        regularBlend();

        return this;
     }

     //...............................................................

     _cogl.RenderingPass.prototype.beginSelection=function(_coords, _pvMatrix) {
       var fn=function() {
            var coords=_coords;
            if (!coords) {
                coords=_cogl.mouse;
            }
                 
            var shader=this.currentShaderOverride||_shaderthis.shaders.selection;
            var camera=this.currentCamera||_cogl.camera;

            _cogl.selectionEngine.beginIndexRendering(shader, coords.x, coords.y, _pvMatrix||camera.matrices.pVMatrix);
         }

        this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.endSelection=function(_callback) {
        
        var fn=function() {
            var index=_cogl.selectionEngine.endIndexRendering();
            if (_callback) _callback([index]);
         }

       this.chain.push(fn);
        return this;
     }

     //..............................................................
     _cogl.RenderingPass.prototype.beginDepth=function(_coords, _pvMatrix, _shader) {
        var fn=function() {
            var coords=_coords;
            if (!coords) {
                coords=_cogl.mouse;
            }
                 
            var shader=this.currentShaderOverride||_shaderthis.shaders.selection;
            var camera=this.currentCamera||_cogl.camera;

            _cogl.selectionEngine.beginIndexRendering(shader, coords.x, coords.y, _pvMatrix||camera.matrices.pVMatrix);
         }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.endDepth=function(_callback) {
        var fn=function() {
            var p2=vec3.create();
            var p3=vec3.create();

            _cogl.selectionEngine.endDepthRendering(p2, p3);
            if (_callback) _callback(p2, p3);
         }

       this.chain.push(fn);
        return this;
     }

          //..............................................................
     _cogl.RenderingPass.prototype.beginUV=function(_coords, _pvMatrix, _shader) {
        var fn=function() {
            var coords=_coords;
            if (!coords) {
                coords=_cogl.mouse;
            }
                 
            var shader=this.currentShaderOverride||_shaderthis.shaders.uvcoord;
            var camera=this.currentCamera||_cogl.camera;

            _cogl.selectionEngine.beginUVRendering(shader, coords.x, coords.y, _pvMatrix||camera.matrices.pVMatrix);
         }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.endUV=function(_callback) {
        var fn=function() {
            var uv=vec2.create();
            

            _cogl.selectionEngine.endUVRendering(uv);
            if (_callback) _callback(uv);
         }

       this.chain.push(fn);
        return this;
     }

          //..............................................................
     _cogl.RenderingPass.prototype.beginWNormal=function(_coords, _pvMatrix, _shader) {
        var fn=function() {
            var coords=_coords;
            if (!coords) {
                coords=_cogl.mouse;
            }
                 
            var shader=this.currentShaderOverride||_shaderthis.shaders.wnormal;
            var camera=this.currentCamera||_cogl.camera;

            _cogl.selectionEngine.beginWNormalRendering(shader, coords.x, coords.y, _pvMatrix||camera.matrices.pVMatrix);
         }

       this.chain.push(fn);
        return this;
     }

     _cogl.RenderingPass.prototype.endWNormal=function(_callback) {
        var fn=function() {
            
            var n=vec3.create();

            _cogl.selectionEngine.endWNormalRendering(n);
            if (_callback) _callback(n);
         }

       this.chain.push(fn);
        return this;
     }
}