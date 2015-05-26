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

COGL.TextureModule=function(_cogl) {
    var gl=_cogl.gl;

    var dummycanvas=document.createElement("canvas");
    var c2d = dummycanvas.getContext("2d");



    _cogl.createTextureWithCanvas=function(_w, _h) {
        var canvas=document.createElement("canvas");
        canvas.width=_w;
        canvas.height=_h;
        canvas.style.visibility="hidden";
        document.body.appendChild(canvas);

   
        return _cogl.createTextureFromCanvas(canvas);            
    }

    _cogl.createTextureFromFile=function(_fileName, _onLoad) { 
        return new _cogl.Texture(_fileName, _onLoad);            
    }

    _cogl.createTextureFromCanvas=function(_canvas) {
   
        return new _cogl.Texture(_canvas);           
    }

    _cogl.createTextureFromImage=function(_image) {
  
        return new _cogl.Texture(_image);           
    }

    _cogl.createSolidTexture=function(_w, _h, _color) {
  
        return new _cogl.Texture([_w, _h, _color]);           
    }

    

    _cogl.Texture=function(_fileorcanvas, _onload) {
        this.image=null;
        this.texture = null;
        this.width = 0;
        this.height = 0;
        this.ready=false;
        this.graphics=null;
       
       if (_fileorcanvas.hasOwnProperty("src")) { //image
        this.fromImage(_fileorcanvas);    
       }
       else if (_fileorcanvas.width) { //canvas
        this.fromCanvas(_fileorcanvas);    
       }
       else if (CO.isArray(_fileorcanvas)){ //width,height,color
         
         if (_fileorcanvas.length>=3 && _fileorcanvas[2].length) {
            this.blanc(_fileorcanvas[0], _fileorcanvas[1], _fileorcanvas[2]);
         }
         else 
            this.blanc(_fileorcanvas[0], _fileorcanvas[1], [255,255,255,255]);
       }
       else if(_fileorcanvas) { //filename
            this.load(_fileorcanvas, _onload);
       }
       
        
    }

    _cogl.Texture.prototype.update = function ()  {
        if (!this.texture) {
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        if (this.canvas) {
            if (this.canvas.width!=this.width || this.canvas.height!=this.height) {
                 this.width = this.canvas.width;
                this.height = this.canvas.height;
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
            }
            else {
                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
            }

        }
        else if (this.image) {
            if (this.image.width!=this.width || this.image.height!=this.height) {
                 this.width = this.image.width;
                this.height = this.image.height;
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            }
            else {
                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            }
        }
    }

    _cogl.Texture.prototype.fromCanvas = function (_canvas) {
        this.canvas=_canvas;
        this.graphics=this.canvas.getContext("2d");
        this.update();
      /*  if (_canvas == null) return;
        if (this.texture == null) {
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        this.canvas=_canvas;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        //if (true){//this.Width != this.Canvas.width || this.Height != this.Canvas.height) {
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
       // }
       // else {
       //     gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.Canvas);
      //  }
        gl.bindTexture(gl.TEXTURE_2D, null);*/

        this.ready=true;
    }

     _cogl.Texture.prototype.fromImage = function (_image) {
        this.image=_image;
        this.ready=true;

       /* if (!_image) return;
        if (this.texture == null) {
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

           // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
           // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        }

        this.image=_image;

        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        this.width = this.image.width;
        this.height = this.image.height;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
      //  gl.generateMipmap(gl.TEXTURE_2D);
    
        gl.bindTexture(gl.TEXTURE_2D, null);

        this.ready=true;*/
    }


    _cogl.Texture.prototype.load=function( _file, _onload) {

        var that=this;
        _cogl.loader.getImage(_file, this, function(_err, _img) {
            if (_err && _onload) _onload(_err, null);
            if (_img) that.loaded(img, _onload);
        });
    }


    _cogl.Texture.prototype.loaded = function (_img, _onload) {
        this.fromImage(_img);

        if (_onload) _onload(null, this);
    }

    _cogl.Texture.prototype.blanc=function( _width, _height, _color) {
        this.texture=_cogl.newTexture(_width, _height, true, _color);
        this.width=_width;
        this.height=_height;

        this.ready=true;
    }

    _cogl.Texture.prototype.captureFBO = function(_fbo) {
        var w=0;
        var h=0;
        if (_fbo) {
            w=_fbo.width;
            h-_fbo.height;
        }
        else {
            w=_cogl.width;
            h=_cogl.height;
        }

        if (this.width!=w || this.height!=h) {
            gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, w, h, 0);
        }
        else {
            gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, w, h);
        }
    }

    _cogl.Texture.prototype.getImageData = function() {
        return new ImageData(this.image);
    }

    _cogl.Texture.prototype.bindTexture = function () {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    _cogl.Texture.prototype.bindTextureAt = function (_t) {
        gl.activeTexture(gl.TEXTURE0 + Number(_t));
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }


    _cogl.newTexture=function(_w, _h, _smoothtexture, _color) {
        var t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);

        _cogl.emptyTexImage2D(gl.RGBA, _w, _h, gl.RGBA, gl.UNSIGNED_BYTE, _color);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        if (_smoothtexture) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }

        t.width = _w;
        t.height = _h;
        return t;
    }

    _cogl.emptyTexImage2D=function(_internalFormat, _w, _h, _format, _type, _color) {
      //  try {
      //      gl.texImage2D(gl.TEXTURE_2D, 0, _internalFormat, _width, _height, 0, _format, _type, null);
      //  } catch (e) {
            var pixels = new Uint8Array(_w * _h * (_internalFormat == gl.RGBA ? 4 : 3));
            if (_color && _color.length) {
                var j=0;
                for(var i =0; i<pixels.length; ++i) {
                    j=i%_color.length;
                    pixels[i]=_color[j];
                }
            }
            gl.texImage2D(gl.TEXTURE_2D, 0, _internalFormat, _w, _h, 0, _format, _type, pixels);
      //  }
    }

    //.....................................................ImageData
    _cogl.ImageData=function(img, rx, ry){
        if (img!=null) {
            dummycanvas.width = img.width;
            dummycanvas.height = img.height;

            c2d.drawImage(img, 0, 0);

            this.width=img.width;
            this.height=img.height;
            this.data=c2d.getImageData(0, 0, img.width, img.height);
        }
        else {
            dummycanvas.width = rx;
            dummycanvas.height = ry;

            this.width=rx;
            this.height=ry;
            this.data=c2d.getImageData(0, 0, rx, ry);
        }

        this.AvgR=0.0;
        this.AvgG=0.0;
        this.AvgB=0.0;
        this.Rx=0.0;
        this.Ry=0.0;
        this.Gx=0.0;
        this.Gy=0.0;
        this.Bx=0.0;
        this.By=0.0;
    }

    _cogl.ImageData.prototype.ComputeAverages = function () {
        this.AvgR=0.0;
        this.AvgG=0.0;
        this.AvgB=0.0;
        this.Rx=0.0;
        this.Ry=0.0;
        this.Gx=0.0;
        this.Gy=0.0;
        this.Bx=0.0;
        this.By=0.0;

       for(var j=0; j<this.height; ++j){
            for(var i=0; i<this.width; ++i){
                var v=this.GetColor(i,j);
                
                this.AvgR+=v[0];
                this.AvgG+=v[1];
                this.AvgB+=v[2];

                this.Rx+=i*v[0];
                this.Ry+=j*v[0];
                this.Gx+=i*v[1];
                this.Gy+=j*v[1];
                this.Bx+=i*v[2];
                this.By+=j*v[2];
            }
        }

        this.Rx/=this.AvgR;
        this.Ry/=this.AvgR;
        this.Gx/=this.AvgG;
        this.Gy/=this.AvgG;
        this.Bx/=this.AvgB;
        this.By/=this.AvgB;

        this.AvgR/=(this.height*this.width);
        this.AvgG/=(this.height*this.width);
        this.AvgB/=(this.height*this.width);
    }

    _cogl.ImageData.prototype.GetColor = function (i,j,dest) {
        var c=(j*this.width+i)*4;

        if(!dest) dest = new Float32Array(4);

        dest[0]=this.data.data[c++]/255;
        dest[1]=this.data.data[c++]/255;
        dest[2]=this.data.data[c++]/255;
        dest[3]=this.data.data[c]/255;
        return dest;
    }

    _cogl.ImageData.prototype.SetColor = function (i,j,r,g,b,a) {
        var c=(j*this.width+i)*4;

        this.data.data[c++]=r*255;
        this.data.data[c++]=g*255;
        this.data.data[c++]=b*255;
        this.data.data[c]=a*255;
    }


    _cogl.ImageData.prototype.GetR = function (i,j) {
        return this.data.data[(j*this.width+i)*4]/255;
    }

    _cogl.ImageData.prototype.GetG = function (i,j) {
        return this.data.data[(j*this.width+i)*4+1]/255;
    }

    _cogl.ImageData.prototype.GetB = function (i,j) {
        return this.data.data[(j*this.width+i)*4+2]/255;
    }

    _cogl.ImageData.prototype.GetA = function (i,j) {
        return this.data.data[(j*this.width+i)*4+3]/255;
    }

    _cogl.ImageData.prototype.SetR = function (i,j, v) {
        this.data.data[(j*this.width+i)*4]=v*255;
    }

    _cogl.ImageData.prototype.SetG = function (i,j, v) {
        this.data.data[(j*this.width+i)*4+1]=v*255;
    }

    _cogl.ImageData.prototype.SetB = function (i,j, v) {
        this.data.data[(j*this.width+i)*4+2]=v*255;
    }

    _cogl.ImageData.prototype.SetA = function (i,j, v) {
        this.data.data[(j*this.width+i)*4+3]=v*255;
    }

    _cogl.ImageData.prototype.CreateTexture = function (gl) {
        dummycanvas.width = this.width;
        dummycanvas.height = this.height;

        c2d.putImageData(this.data,0,0);

        return new CTexture(gl, dummycanvas);
    }


}