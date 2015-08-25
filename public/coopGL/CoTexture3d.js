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

COGL.Texture3dModule=function(_cogl) {
    var gl=_cogl.gl;

  

    _cogl.Texture3d=function(_rx, _ry, _rz) {

        
        this.texture = null;

        this.rx = _rx;
        this.ry = _ry;
        this.rz = _rz;

       
        this.blanc(_rx, _ry, _rz, [1,1,1,0.5]);    



        this.needUpdate=true; 
    }

    _cogl.Texture3d.prototype.update = function ()  {
        this.needUpdate=false;
    }

   
    _cogl.Texture3d.prototype.blanc=function( _rx, _ry, _rz, _color) {
        var maxwidth=2048;
        var maxheight=2048;

        this.rx = _rx;
        this.ry = _ry;
        this.rz = _rz;

        this.layersPerRow=Math.floor(maxwidth/this.rx);
        this.layersPerCol=Math.floor(maxheight/this.ry);

        var maxLayers=this.layersPerRow*this.layersPerCol;

        if (this.rz>maxLayers) {
            this.rz=maxLayers; //rescaling could be a better solution here
        }

        var w=0;
        var h=0;

        if (this.layersPerRow<=this.rz) { //fits in one row
            w=this.rz*this.rx;
            h=this.ry;
        }
        else {
            w=this.layersPerRow*this.rx;

            var rows=Math.ceil(this.rz/this.layersPerRow)+1;
            h=rows*this.ry;
        }

        var pw = Math.ceil(Math.log(w)/Math.log(2)); // N
        var ph = Math.ceil(Math.log(h)/Math.log(2)); // N

        w=Math.pow(2, pw);
        h=Math.pow(2, ph);

        this.data=new Uint8Array(w*h*4);

        this.texture=_cogl.createSolidTexture(w, h, true, _color);
    }

    _cogl.Texture3d.prototype.setColor=function( _i, _j, _k, _color) {
        var row=Math.floor(_k/this.layersPerRow);
        var col=_k-row*this.layersPerRow;

        var j0=row*this.ry+_j;
        var i0=col*this.rx+_i;

        var c=j0*this.texture.width+i0;

        this.data[c++]=_color[0];
        this.data[c++]=_color[1];
        this.data[c++]=_color[2];
        this.data[c++]=_color[3];

        this.needUpdate=true;
    }


    
    _cogl.Texture3d.prototype.bindTexture = function () {
        this.texture.bindTexture();
    }

    _cogl.Texture3d.prototype.bindTextureAt = function (_t) {
        this.texture.bindTextureAt(_t);
    }   


}