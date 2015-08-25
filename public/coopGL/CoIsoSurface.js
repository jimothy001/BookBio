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

COGL.IsoSurfaceModule=function(_cogl) {
    var gl=_cogl.gl;

//........................................................IsoSurfaceFunction
    _cogl.IsoSurfaceFunc=function(_rx, _ry, _rz, _p0, _p1, _func, _params, _nfunc, _uvfunc) {
        this.voxels=new _cogl.IsoSurface(_rx, _ry, _rz, _p0, _p1);
        this.func=_func;
        this.nfunc=_nfunc;
        this.uvfunc=_uvfunc;
        this.params={};

        var that=this;

        if (_params) {
            for(var i in _params) {
                CO.CO(this).variable("params."+i).onChange(this, function(_e) {
                    that.needUpdateFlag=true;
                });
            }
        }

         CO.CO(this).variable("func").onChange(this, function(_e) {
            that.needUpdateFlag=true;
        });

        this.needUpdateFlag=true;
    }

    _cogl.IsoSurfaceFunc.prototype.updateGeometry = function (){


        for(var k=0; k<this.voxels.data.length;++k) {
            var dat=this.voxels.data[k];
             this.voxels.data[k].v=this.func(dat.p[0], dat.p[1], dat.p[2]);   
        }

        if (this.nfunc) {
            for(var k=0; k<this.voxels.data.length;++k) {
                this.nfunc(this.voxels.data[k]); 
            }
        }
        else {
            this.voxels.estimateNormals();

            /*var dx=1.0/(this.dx*0.05);
            var dy=1.0/(this.dy*0.05);
            var dz=1.0/(this.dz*0.05);

            for(var k=0; k<this.voxels.data.length;++k) {
                var dat=this.voxels.data[k];
                 this.voxels.data[k].n[0]=(this.func(dat.p[0]+dx, dat.p[1], dat.p[2])-this.func(dat.p[0]-dx, dat.p[1], dat.p[2]))*dx;   
                 this.voxels.data[k].n[1]=(this.func(dat.p[0], dat.p[1]+dy, dat.p[2])-this.func(dat.p[0], dat.p[1]-dy, dat.p[2]))*dy;   
                 this.voxels.data[k].n[2]=(this.func(dat.p[0], dat.p[1], dat.p[2]+dz)-this.func(dat.p[0], dat.p[1], dat.p[2]-dz))*dz;   
            }*/
        }

        if (this.uvfunc) {
            for(var k=0; k<this.voxels.data.length;++k) {
                this.uvfunc(this.voxels.data[k]); 
            }
        }

        this.voxels.needUpdateFlag=true;
        this.needUpdateFlag=false;
    }

    _cogl.IsoSurfaceFunc.prototype.render=function () {
        if (this.voxels.needBoxUpdateFlag) {
            this.voxels.resolutionChanged();
        }
        if(this.needUpdateFlag || this.voxels.needUpdateFlag) {
            this.updateGeometry();            
        }

        this.voxels.render();
    }

//.......................................................Voxel
    _cogl.IsoVoxel=function(_x, _y, _z, _v) {
        this.p=vec3.fromValues(_x, _y, _z);
        this.n=vec3.create();
        this.uv=vec2.create();
        this.v=_v;
    }

//........................................................IsoSurface

    _cogl.IsoSurface=function(_rx, _ry, _rz, _p0, _p1) {
        this.rx=_rx;
        this.ry=_ry;
        this.rz=_rz;

        this.p0=vec3.fromValues(_p0[0],_p0[1],_p0[2]);
        this.p1=vec3.fromValues(_p1[0],_p1[1],_p1[2]);

        this.dx=0.0;
        this.dy=0.0;
        this.dz=0.0;


        this.isovalue=0.0;

       
        var that=this;
        CO.CO(this).variable("rx").onChange(this, function(_e) {
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("ry").onChange(this, function(_e) {
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("rz").onChange(this, function(_e) {
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("p0x").onChange(this, function(_e) {
            that.p0[0]=that.p0x;
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("p0y").onChange(this, function(_e) {
            that.p0[1]=that.p0y;
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("p0z").onChange(this, function(_e) {
            that.p0[2]=that.p0z;
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("p1x").onChange(this, function(_e) {
            that.p1[0]=that.p1x;
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("p1y").onChange(this, function(_e) {
            that.p1[1]=that.p1y;
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("p1z").onChange(this, function(_e) {
            that.p1[2]=that.p1z;
            that.needBoxUpdateFlag=true;
            that.needUpdateFlag=true;
        });
        CO.CO(this).variable("isovalue").onChange(this, function(_e) {
            that.needUpdateFlag=true;
        });

        this.data=[];

        this.vertexCount=0;
        this.maxVertexCount=256;
        this.VBOdata=new Float32Array(this.maxVertexCount*8);

        this.VBO = null;

        this.needBoxUpdateFlag=true;
        this.needUpdateFlag=true;
        this.needBufferRealloc=true;

        this.resolutionChanged();
    }

    _cogl.IsoSurface.prototype.resolutionChanged=function() {
        this.dx=(this.p1[0]-this.p0[0])/(this.rx-1.0);
        this.dy=(this.p1[1]-this.p0[1])/(this.ry-1.0);
        this.dz=(this.p1[2]-this.p0[2])/(this.rz-1.0);

        this.data=[];

        var cc=0;

        var x=0.0;
        var y=0.0;
        var z=this.p0[2];

        for(var k=0; k<this.rz;++k) {
            y=this.p0[1];
            for(var j=0; j<this.ry;++j) {
                x=this.p0[0];
                for(var i=0; i<this.rx;++i) {     
                    this.data.push(new  _cogl.IsoVoxel(x,y,z,0.0));
                    x+=this.dx;
                } 
                y+=this.dy;           
            }
            z+=this.dz;
        }

        this.needBoxUpdateFlag=false;

        this.needUpdateFlag=true;
    }

    _cogl.IsoSurface.prototype.estimateNormals=function() {
        var rxy=this.rx*this.ry;
        var cc=0;
        for(var k=0; k<this.rz;++k) {
            for(var j=0; j<this.ry;++j) {
                for(var i=0; i<this.rx;++i) {     
                    if (i==0)  
                        this.data[cc].n[0]=2.0*(this.data[cc+1].v-this.data[cc].v)/this.dx;
                    else if (i==this.rx-1)  
                        this.data[cc].n[0]=2.0*(this.data[cc].v-this.data[cc-1].v)/this.dx;
                    else 
                        this.data[cc].n[0]=(this.data[cc+1].v-this.data[cc-1].v)/this.dx;

                    if (j==0)  
                        this.data[cc].n[1]=2.0*(this.data[cc+this.rx].v-this.data[cc].v)/this.dx;
                    else if (j==this.ry-1)  
                        this.data[cc].n[1]=2.0*(this.data[cc].v-this.data[cc-this.rx].v)/this.dx;
                    else 
                        this.data[cc].n[1]=(this.data[cc+this.rx].v-this.data[cc-this.rx].v)/this.dx;

                    if (k==0)  
                        this.data[cc].n[2]=2.0*(this.data[cc+rxy].v-this.data[cc].v)/this.dx;
                    else if (k==this.rz-1)  
                        this.data[cc].n[2]=2.0*(this.data[cc].v-this.data[cc-rxy].v)/this.dx;
                    else 
                        this.data[cc].n[2]=(this.data[cc+rxy].v-this.data[cc-rxy].v)/this.dx;

                    cc++;
                }      
            }
        }
    }    

    _cogl.IsoSurface.prototype.addVertex=function(_p, _n, _uv) {
        if (this.vertexCount==this.maxVertexCount) {
            var oldData=this.VBOdata;
            this.maxVertexCount=2*this.maxVertexCount;
            this.VBOdata=new Float32Array(this.maxVertexCount*8);

            this.VBOdata.set(oldData);
        }

        var cc=this.vertexCount*8;

        this.VBOdata.set(_p, cc);
        this.VBOdata.set(_n||[0,0,1], cc+3);
        this.VBOdata.set(_uv||[0,0], cc+6);

        this.vertexCount++;
    }

    _cogl.IsoSurface.prototype.updateGeometry = function (){
        var cc=0;
        this.vertexCount=0;
        var rxy=this.rx*this.ry;
        for(var k=0; k<this.rz-1;++k) {
            for(var j=0; j<this.ry-1;++j) {
                for(var i=0; i<this.rx-1;++i) {     
                    cc=k*rxy+j*this.rx+i;

                    var vd=[this.data[cc], this.data[cc+1], this.data[cc+1+this.rx], this.data[cc+this.rx], this.data[cc+rxy], this.data[cc+1+rxy], this.data[cc+1+this.rx+rxy], this.data[cc+this.rx+rxy]];

                    var sign=0;

                    for(var m=0; m<8; ++m) {
                        if (vd[m].v>this.isovalue) sign|=VERTEXID[m];
                    }

                    var map=MAPV2E[sign];

                    if (!map.length) continue;

                    var facepoints=[];
                    for(var m=0; m<map.length; ++m) {
                        var v0 = vd[EDGEVERTICES[map[m]][0]];
                        var v1 = vd[EDGEVERTICES[map[m]][1]];

                        var fp = vec3.clone(v0.p);
                        var t = (v0.v - this.isovalue) / (v0.v - v1.v);
                        var dv=vec3.create();
                        vec3.subtract(dv, v1.p, v0.p);
                        vec3.scaleAndAdd(fp, fp, dv, t); 


                        var fn = vec3.clone(v0.n);
                        vec3.subtract(dv, v1.n, v0.n);
                        vec3.scaleAndAdd(fn, fn, dv, t); 

                        
                        this.addVertex(fp, fn);
                    }
                }            
            }
        }


        if (this.VBO==null) {
            this.VBO = gl.createBuffer();
            this.needBufferRealloc=true;            
        }

        if (this.needBufferRealloc) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            //gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.DYNAMIC_DRAW);
            gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.STATIC_DRAW);
            this.needBufferRealloc=false;
        }
        else {//here use the dynamic updates for portions of the array
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            //gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.VBOdata);
            gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.STATIC_DRAW);
        }        

        this.needUpdateFlag=false;
    }

    _cogl.IsoSurface.prototype.render=function () {
        if (this.needBoxUpdateFlag) {
            this.resolutionChanged();
        }
        if(this.needUpdateFlag) {
            this.updateGeometry();            
        }


        if (!this.vertexCount) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO); 

        var view=new Float32Array(this.VBOdata, 0, this.vertexCount*8);

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
  
        _cogl.Mesh.setDefaultAttributes();

        gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);

    }


    const VERTEXID=[0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80];
    const EDGEID = [ 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x100, 0x200, 0x400, 0x800 ];
    const EDGEVERTICES =[
                            [0,1],
                            [1,2],
                            [2,3],
                            [3,0],

                            [4,5],
                            [5,6],
                            [6,7],
                            [7,4],

                            [0,4],
                            [1,5],
                            [2,6],
                            [3,7]
                        ];
    const MAPV2E =[ [],
                    [0, 8, 3],
                    [0, 1, 9],
                    [1, 8, 3, 9, 8, 1],
                    [1, 2, 10],
                    [0, 8, 3, 1, 2, 10],
                    [9, 2, 10, 0, 2, 9],
                    [2, 8, 3, 2, 10, 8, 10, 9, 8],
                    [3, 11, 2],
                    [0, 11, 2, 8, 11, 0],
                    [1, 9, 0, 2, 3, 11],
                    [1, 11, 2, 1, 9, 11, 9, 8, 11],
                    [3, 10, 1, 11, 10, 3],
                    [0, 10, 1, 0, 8, 10, 8, 11, 10],
                    [3, 9, 0, 3, 11, 9, 11, 10, 9],
                    [9, 8, 10, 10, 8, 11],
                    [4, 7, 8],
                    [4, 3, 0, 7, 3, 4],
                    [0, 1, 9, 8, 4, 7],
                    [4, 1, 9, 4, 7, 1, 7, 3, 1],
                    [1, 2, 10, 8, 4, 7],
                    [3, 4, 7, 3, 0, 4, 1, 2, 10],
                    [9, 2, 10, 9, 0, 2, 8, 4, 7],
                    [2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4],
                    [8, 4, 7, 3, 11, 2],
                    [11, 4, 7, 11, 2, 4, 2, 0, 4],
                    [9, 0, 1, 8, 4, 7, 2, 3, 11],
                    [4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1],
                    [3, 10, 1, 3, 11, 10, 7, 8, 4],
                    [1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4],
                    [4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3],
                    [4, 7, 11, 4, 11, 9, 9, 11, 10],
                    [9, 5, 4],
                    [9, 5, 4, 0, 8, 3],
                    [0, 5, 4, 1, 5, 0],
                    [8, 5, 4, 8, 3, 5, 3, 1, 5],
                    [1, 2, 10, 9, 5, 4],
                    [3, 0, 8, 1, 2, 10, 4, 9, 5],
                    [5, 2, 10, 5, 4, 2, 4, 0, 2],
                    [2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8],
                    [9, 5, 4, 2, 3, 11],
                    [0, 11, 2, 0, 8, 11, 4, 9, 5],
                    [0, 5, 4, 0, 1, 5, 2, 3, 11],
                    [2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5],
                    [10, 3, 11, 10, 1, 3, 9, 5, 4],
                    [4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10],
                    [5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3],
                    [5, 4, 8, 5, 8, 10, 10, 8, 11],
                    [9, 7, 8, 5, 7, 9],
                    [9, 3, 0, 9, 5, 3, 5, 7, 3],
                    [0, 7, 8, 0, 1, 7, 1, 5, 7],
                    [1, 5, 3, 3, 5, 7],
                    [9, 7, 8, 9, 5, 7, 10, 1, 2],
                    [10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3],
                    [8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2],
                    [2, 10, 5, 2, 5, 3, 3, 5, 7],
                    [7, 9, 5, 7, 8, 9, 3, 11, 2],
                    [9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11],
                    [2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7],
                    [11, 2, 1, 11, 1, 7, 7, 1, 5],
                    [9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11],
                    [5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0],
                    [11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0],
                    [11, 10, 5, 7, 11, 5],
                    [10, 6, 5],
                    [0, 8, 3, 5, 10, 6],
                    [9, 0, 1, 5, 10, 6],
                    [1, 8, 3, 1, 9, 8, 5, 10, 6],
                    [1, 6, 5, 2, 6, 1],
                    [1, 6, 5, 1, 2, 6, 3, 0, 8],
                    [9, 6, 5, 9, 0, 6, 0, 2, 6],
                    [5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8],
                    [2, 3, 11, 10, 6, 5],
                    [11, 0, 8, 11, 2, 0, 10, 6, 5],
                    [0, 1, 9, 2, 3, 11, 5, 10, 6],
                    [5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11],
                    [6, 3, 11, 6, 5, 3, 5, 1, 3],
                    [0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6],
                    [3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9],
                    [6, 5, 9, 6, 9, 11, 11, 9, 8],
                    [5, 10, 6, 4, 7, 8],
                    [4, 3, 0, 4, 7, 3, 6, 5, 10],
                    [1, 9, 0, 5, 10, 6, 8, 4, 7],
                    [10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4],
                    [6, 1, 2, 6, 5, 1, 4, 7, 8],
                    [1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7],
                    [8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6],
                    [7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9],
                    [3, 11, 2, 7, 8, 4, 10, 6, 5],
                    [5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11],
                    [0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6],
                    [9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6],
                    [8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6],
                    [5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11],
                    [0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7],
                    [6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9],
                    [10, 4, 9, 6, 4, 10],
                    [4, 10, 6, 4, 9, 10, 0, 8, 3],
                    [10, 0, 1, 10, 6, 0, 6, 4, 0],
                    [8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10],
                    [1, 4, 9, 1, 2, 4, 2, 6, 4],
                    [3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4],
                    [0, 2, 4, 4, 2, 6],
                    [8, 3, 2, 8, 2, 4, 4, 2, 6],
                    [10, 4, 9, 10, 6, 4, 11, 2, 3],
                    [0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6],
                    [3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10],
                    [6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1],
                    [9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3],
                    [8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1],
                    [3, 11, 6, 3, 6, 0, 0, 6, 4],
                    [6, 4, 8, 11, 6, 8],
                    [7, 10, 6, 7, 8, 10, 8, 9, 10],
                    [0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10],
                    [10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0],
                    [10, 6, 7, 10, 7, 1, 1, 7, 3],
                    [1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7],
                    [2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9],
                    [7, 8, 0, 7, 0, 6, 6, 0, 2],
                    [7, 3, 2, 6, 7, 2],
                    [2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7],
                    [2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7],
                    [1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11],
                    [11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1],
                    [8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6],
                    [0, 9, 1, 11, 6, 7],
                    [7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0],
                    [7, 11, 6],
                    [7, 6, 11],
                    [3, 0, 8, 11, 7, 6],
                    [0, 1, 9, 11, 7, 6],
                    [8, 1, 9, 8, 3, 1, 11, 7, 6],
                    [10, 1, 2, 6, 11, 7],
                    [1, 2, 10, 3, 0, 8, 6, 11, 7],
                    [2, 9, 0, 2, 10, 9, 6, 11, 7],
                    [6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8],
                    [7, 2, 3, 6, 2, 7],
                    [7, 0, 8, 7, 6, 0, 6, 2, 0],
                    [2, 7, 6, 2, 3, 7, 0, 1, 9],
                    [1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6],
                    [10, 7, 6, 10, 1, 7, 1, 3, 7],
                    [10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8],
                    [0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7],
                    [7, 6, 10, 7, 10, 8, 8, 10, 9],
                    [6, 8, 4, 11, 8, 6],
                    [3, 6, 11, 3, 0, 6, 0, 4, 6],
                    [8, 6, 11, 8, 4, 6, 9, 0, 1],
                    [9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6],
                    [6, 8, 4, 6, 11, 8, 2, 10, 1],
                    [1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6],
                    [4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9],
                    [10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3],
                    [8, 2, 3, 8, 4, 2, 4, 6, 2],
                    [0, 4, 2, 4, 6, 2],
                    [1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8],
                    [1, 9, 4, 1, 4, 2, 2, 4, 6],
                    [8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1],
                    [10, 1, 0, 10, 0, 6, 6, 0, 4],
                    [4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3],
                    [10, 9, 4, 6, 10, 4],
                    [4, 9, 5, 7, 6, 11],
                    [0, 8, 3, 4, 9, 5, 11, 7, 6],
                    [5, 0, 1, 5, 4, 0, 7, 6, 11],
                    [11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5],
                    [9, 5, 4, 10, 1, 2, 7, 6, 11],
                    [6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5],
                    [7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2],
                    [3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6],
                    [7, 2, 3, 7, 6, 2, 5, 4, 9],
                    [9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7],
                    [3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0],
                    [6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8],
                    [9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7],
                    [1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4],
                    [4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10],
                    [7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10],
                    [6, 9, 5, 6, 11, 9, 11, 8, 9],
                    [3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5],
                    [0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11],
                    [6, 11, 3, 6, 3, 5, 5, 3, 1],
                    [1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6],
                    [0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10],
                    [11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5],
                    [6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3],
                    [5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2],
                    [9, 5, 6, 9, 6, 0, 0, 6, 2],
                    [1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8],
                    [1, 5, 6, 2, 1, 6],
                    [1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6],
                    [10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0],
                    [0, 3, 8, 5, 6, 10],
                    [10, 5, 6],
                    [11, 5, 10, 7, 5, 11],
                    [11, 5, 10, 11, 7, 5, 8, 3, 0],
                    [5, 11, 7, 5, 10, 11, 1, 9, 0],
                    [10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1],
                    [11, 1, 2, 11, 7, 1, 7, 5, 1],
                    [0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11],
                    [9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7],
                    [7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2],
                    [2, 5, 10, 2, 3, 5, 3, 7, 5],
                    [8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5],
                    [9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2],
                    [9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2],
                    [1, 3, 5, 3, 7, 5],
                    [0, 8, 7, 0, 7, 1, 1, 7, 5],
                    [9, 0, 3, 9, 3, 5, 5, 3, 7],
                    [9, 8, 7, 5, 9, 7],
                    [5, 8, 4, 5, 10, 8, 10, 11, 8],
                    [5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0],
                    [0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5],
                    [10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4],
                    [2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8],
                    [0, 4, 11, 0, 11, 3, 4, 5, 11, 2, 11, 1, 5, 1, 11],
                    [0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5],
                    [9, 4, 5, 2, 11, 3],
                    [2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4],
                    [5, 10, 2, 5, 2, 4, 4, 2, 0],
                    [3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9],
                    [5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2],
                    [8, 4, 5, 8, 5, 3, 3, 5, 1],
                    [0, 4, 5, 1, 0, 5],
                    [8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5],
                    [9, 4, 5],
                    [4, 11, 7, 4, 9, 11, 9, 10, 11],
                    [0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11],
                    [1, 10, 11, 1, 11, 4, 1, 4, 0, 7, 4, 11],
                    [3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4],
                    [4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2],
                    [9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3],
                    [11, 7, 4, 11, 4, 2, 2, 4, 0],
                    [11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4],
                    [2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9],
                    [9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7],
                    [3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10],
                    [1, 10, 2, 8, 7, 4],
                    [4, 9, 1, 4, 1, 7, 7, 1, 3],
                    [4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1],
                    [4, 0, 3, 7, 4, 3],
                    [4, 8, 7],
                    [9, 10, 8, 10, 11, 8],
                    [3, 0, 9, 3, 9, 11, 11, 9, 10],
                    [0, 1, 10, 0, 10, 8, 8, 10, 11],
                    [3, 1, 10, 11, 3, 10],
                    [1, 2, 11, 1, 11, 9, 9, 11, 8],
                    [3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9],
                    [0, 2, 11, 8, 0, 11],
                    [3, 2, 11],
                    [2, 3, 8, 2, 8, 10, 10, 8, 9],
                    [9, 10, 2, 0, 9, 2],
                    [2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8],
                    [1, 10, 2],
                    [1, 3, 8, 9, 1, 8],
                    [0, 9, 1],
                    [0, 3, 8],
                    []
                ];

}