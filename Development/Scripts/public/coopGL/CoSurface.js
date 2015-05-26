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

COGL.SurfaceModule=function(_cogl) {
    var gl=_cogl.gl;

    _cogl.Surface=function(_ru, _rv, _u0, _v0, _u1, _v1, _funcx, _funcy, _funcz, _params) {
        this.ru=_ru;
        this.rv=_rv;

        this.u0=_u0;
        this.v0=_v0;
        this.u1=_u1;
        this.v1=_v1;

        this.fx=_funcx;
        this.fy=_funcy;
        this.fz=_funcz;

        var that=this;
        CO.CO(this).variable("ru").onChange(this, function(_e) {
            that.resolutionChanged();
        });
        CO.CO(this).variable("rv").onChange(this, function(_e) {
            that.resolutionChanged();
        });
        CO.CO(this).variable("u0").onChange(this, function(_e) {
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("u1").onChange(this, function(_e) {
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("v0").onChange(this, function(_e) {
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("v1").onChange(this, function(_e) {
            that.needUpdateFlag=true;
        });

        this.params={};

        if (_params) {
            for(var i in _params) {
                CO.CO(this).variable("params."+i).onChange(this, function(_e) {
                    that.needUpdateFlag=true;
                });
            }
        }

        this.vertexCount=this.ru*this.rv;
        this.faceCount=(this.ru-1)*(this.rv-1)*2;

        this.VBOdata=null;
        this.IBOdata=null;

        this.VBO = null;
        this.IBO = null;

        this.needUpdateFlag=true;

        this.needBufferRealloc=true;
    }

    _cogl.Surface.prototype.pointAt=function(_u, _v) {

        return [this.fx(_u,_v), this.fy(_u,_v), this.fz(_u,_v)];
    }

    _cogl.Surface.prototype.pointAtCopy=function(_out, _u, _v) {

        _out[0]=this.fx(_u,_v);
        _out[1]=this.fy(_u,_v);
        _out[2]=this.fz(_u,_v);

        return _out;
    }

    _cogl.Surface.prototype.resolutionChanged=function() {

        this.vertexCount=this.ru*this.rv;
        this.faceCount=(this.ru-1)*(this.rv-1)*2;

        if (this.vertexCount*8>this.VBOdata.length || this.faceCount*3>this.IBOdata.length) {
            this.VBOdata=null;
            this.IBOdata=null;
            this.needBufferRealloc=true;
        }
    }

    _cogl.Surface.prototype.updateGeometry = function (){
        var du=(this.u1-this.u0)/(this.ru-1);
        var dv=(this.v1-this.v0)/(this.rv-1);

        var dun=1.0/(this.ru-1);
        var dvn=1.0/(this.rv-1);

        if (!this.VBOdata) {
            this.VBOdata=new Float32Array(this.vertexCount*8);
            this.IBOdata=new Uint16Array(this.faceCount*3);
        }

        var dd=0.001*Math.min(this.u1-this.u0, this.v1-this.v0);
        var ddu=vec3.create();
        var ddv=vec3.create();
        var normal=vec3.create();

        var u=0.0;
        var v=0.0;

        var un=0.0;
        var vn=0.0;

        var k=0;
        for(var j=0; j<this.rv; ++j) {
            v=this.v0+j*dv;
            vn=j*dvn;
            for (var i=0; i<this.ru; ++i) {
                u=this.u0+i*du;
                un=i*dun;

                this.VBOdata[k++]=this.fx(u,v);
                this.VBOdata[k++]=this.fy(u,v);
                this.VBOdata[k++]=this.fz(u,v);

                ddu[0]=this.fx(u+dd, v)-this.fx(u-dd, v);
                ddu[1]=this.fy(u+dd, v)-this.fy(u-dd, v);
                ddu[2]=this.fz(u+dd, v)-this.fz(u-dd, v);

                ddv[0]=this.fx(u, v+dd)-this.fx(u, v-dd);
                ddv[1]=this.fy(u, v+dd)-this.fy(u, v-dd);
                ddv[2]=this.fz(u, v+dd)-this.fz(u, v-dd);

                vec3.cross(normal, ddu,ddv);

                this.VBOdata[k++]=normal[0];
                this.VBOdata[k++]=normal[1];
                this.VBOdata[k++]=normal[2];

                this.VBOdata[k++]=un; //maybe normalize here
                this.VBOdata[k++]=vn;
            }
        }

        var k=0;
        for(var j=0; j<this.rv-1; ++j) {
            for (var i=0; i<this.ru-1; ++i) {
                var i0=j*this.ru+i;

                this.IBOdata[k++]=i0;
                this.IBOdata[k++]=i0+1;
                this.IBOdata[k++]=i0+this.ru+1;

                this.IBOdata[k++]=i0;
                this.IBOdata[k++]=i0+this.ru+1;
                this.IBOdata[k++]=i0+this.ru;
            }
        }


        if (this.VBO==null) {
            this.VBO = gl.createBuffer();
            this.IBO = gl.createBuffer();

            this.needBufferRealloc=true;            
        }

        if (this.needBufferRealloc) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            //gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.DYNAMIC_DRAW);
            gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.STATIC_DRAW);
        
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
            //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.IBOdata, gl.DYNAMIC_DRAW);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.IBOdata, gl.STATIC_DRAW);

            this.needBufferRealloc=false;
        }
        else {//here use the dynamic updates for portions of the array
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            //gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.VBOdata);
            gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.STATIC_DRAW);
        
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
            //gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, 0, this.IBOdata);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.IBOdata, gl.STATIC_DRAW);

        }        

        this.needUpdateFlag=false;
    }

    _cogl.Surface.prototype.render=function () {
        if(this.needUpdateFlag) {
            this.updateGeometry();            
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);

        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 32, 0); // position
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 32, 12); // normal
        gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 32, 24); // texcoord

        gl.drawElements(gl.TRIANGLES, this.IBOdata.length, gl.UNSIGNED_SHORT, 0);
    }

}