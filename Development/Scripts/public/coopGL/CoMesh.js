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

COGL.MeshModule=function(_cogl) {
    var gl=_cogl.gl;

    var maxattr=6; //gl.MAX_VERTEX_ATTRIBS; 

    var defaultsSet=false;

    _cogl.stockMeshes={};

    _cogl.loadMeshFromJSON=function(_file, _callback) {
        var mesh=new _cogl.Mesh([0,0,0, 0,0,1, 0,0,    //what if the mesh needs to be dynamic?
                            1,0,0, 0,0,1, 1,0,
                            0,1,0, 0,0,0, 0,1], [0,1,2]);
        _cogl.loader.get(_file, mesh, function(_err, _response) {
            if (_err || !_response) {
                if (_callback) _callback(_err, null);
            }
            else {
                //var json=JSON.parse(_response);
                var json=_response; //it comes parsed
                mesh.setData(json.VBO, json.IBO);
                if (_callback) _callback(null, mesh);
            }
        });

        return mesh;
    }

    _cogl.Mesh=function(_vdata, _fdata) {
        

        this.VBOdata=new Float32Array(_vdata);
        this.IBOdata=new Uint16Array(_fdata);

        if(_vdata.length > 64)
        { 
            console.log("custom mesh");
            console.log(this.VBOdata);
            console.log(this.IBOdata);
        }

        this.VBO=null;
        this.IBO=null;

        this.needUpdateFlag=true;
    }

    _cogl.Mesh.setFloatAttributes=function(_attr) {

        var stride=0;
        var maxa=-1;
        for(var i=0; i<maxattr; ++i) {
            if (_attr[i]) {
                gl.enableVertexAttribArray(i);
                stride+=_attr[i]*4; //bytes per float
                maxa=i;
            }
            else {
                gl.disableVertexAttribArray(i);
            }
        }

        var offset=0;
        for(var i=0; i<=maxa; ++i) {
            if (_attr[i]) {          
                gl.vertexAttribPointer(i, _attr[i], gl.FLOAT, false, stride, offset); // position
                offset+=_attr[i]*4;
            }
        }
        defaultsSet=false;
    }

    _cogl.Mesh.setDefaultAttributes=function() {
        //_cogl.Mesh.setFloatAttributes([3,3,2]);
        defaultsSet=true;
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 32, 0); // position
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 32, 12); // normal
        gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 32, 24); // texcoord
    }


    _cogl.Mesh.prototype.setData=function(_vdata, _fdata) {
        this.VBOdata=new Float32Array(_vdata);
        this.IBOdata=new Uint16Array(_fdata);

        this.needUpdateFlag=true;
    }

    _cogl.Mesh.prototype.render=function() {
        if (this.needUpdateFlag) this.update();        
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);     

  
        _cogl.Mesh.setDefaultAttributes();

        gl.drawElements(gl.TRIANGLES, this.IBOdata.length, gl.UNSIGNED_SHORT, 0);
    }

    _cogl.Mesh.prototype.update=function() {
        if (!this.VBOdata || !this.IBOdata) return;
        if (this.VBO==null) {
            this.VBO = gl.createBuffer();
            this.IBO = gl.createBuffer();
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.STATIC_DRAW);

        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.IBOdata, gl.STATIC_DRAW);


        this.needUpdateFlag=false;
    }

     _cogl.Mesh.prototype.destroy=function() {
        if (this.VBO) gl.deleteBuffer(this.VBO);
        if (this.IBO) gl.deleteBuffer(this.IBO);

        this.VBO=null;
        this.IBO=null;

        this.VBOdata=null;
        this.IBOdata=null;

        this.needUpdateFlag=false;
    }

    var TempVBOdata=new Float32Array([
    1,0,0, 0,0,-1, 0,0,
    1,1,0, 0,0,-1,1,
    0,0,0, 0,0,0,-1,0,
    1,0,1, 0,0,0,-1,1,
    1,0,0, 1,0,0,1,0,
    0,0,1, 1,0,0,1,1,
    0,1,0, 1,0,0,1,0,
    1,1,1, 1,0,0,1,1,
    1,0,0,0,-1,0,0,0,0,
    0,1,0,-1,0,0,1,0,0,
    0,1,-1,0,0,0,1,0,1,1,-1,0,0,1,1,0,1,0,0,1,0,0,0,1,1,0,0,1,0,1,0,0,1,1,0,1,0,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,1,1,1,0,0,0,1,1,0,1,1,0,0,1,1,1,0,0,0,-1,0,0,0,0,0,0,0,-1,0,1,0,1,0,1,0,-1,0,0,1,0,0,1,0,-1,0,1,1]);
    var TempIBOdata=new Uint16Array([0,2,3,4,6,7,8,10,11,12,14,15,16,18,19,20,22,23,0,3,1,4,7,5,8,11,9,12,15,13,16,19,17,20,23,21]);
    
    _cogl.stockMeshes.cube=new _cogl.Mesh(TempVBOdata, TempIBOdata);


    TempVBOdata=new Float32Array([
                                    -1,-1,0, 0,0,1, 0,0,
                                     1,-1,0, 0,0,1, 1,0,
                                     1, 1,0, 0,0,1, 1,1,
                                    -1, 1,0, 0,0,1, 0,1
        ]);

    TempIBOdata =new Uint16Array([0,1,2, 0,2,3]); /// = new Uint16Array([]); //
    
    _cogl.stockMeshes.screenQuad=new _cogl.Mesh(TempVBOdata, TempIBOdata);


    var m = 0.4;
    TempVBOdata=new Float32Array([
                                 0,0,0, 0,0,m, 0,0,
                                 -m,0,0, 0,0,m, m,0,
                                 -m,m,0, 0,0,m, m,m,
                                 0,m,0, 0,0,m, 0,m
    ]);

    TempIBOdata=new Uint16Array([0,1,2, 0,2,3]);
    
    _cogl.stockMeshes.edition=new _cogl.Mesh(TempVBOdata, TempIBOdata);


    m = 3.0;//1.0;
    n = 9.0;//3.0;
    /*TempVBOdata=new Float32Array([
                                 0,0,m, 0,m,0, 0,0,
                                 -n,0,m, 0,m,0, m,0,
                                 -n,0,0, 0,m,0, m,m,
                                 0,0,0, 0,m,0, 0,m
    ]);*/

    TempVBOdata=new Float32Array([
                                 0,0,m, 0,m,0, 0,0,
                                 -n,0,m, 0,m,0, m,0,
                                 -n,0,0, 0,m,0, m,m,
                                 0,0,0, 0,m,0, 0,m
    ]);

    TempIBOdata=new Uint16Array([0,1,2, 0,2,3]);
    
    _cogl.stockMeshes.timetag=new _cogl.Mesh(TempVBOdata, TempIBOdata);

   /* _cogl.DynamicMesh=function(_vdata, _fdata) {
        this.VBOdata=_vdata;
        this.IBOdata=_fdata;

        this.VBO=null;
        this.IBO=null;

        this.needUpdateFlag=true;
    }

    _cogl.DynamicMesh.prototype.render=function() {
        if (this.needUpdateFlag) this.update();

        if (!defaultsSet) _cogl.Mesh.setDefaultAttributes();
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);     

        gl.drawElements(gl.TRIANGLES, this.IBOdata.length, gl.UNSIGNED_SHORT, 0);
    }

    _cogl.DynamicMesh.prototype.update=function() {
        if (!this.VBOdata || !this.IBOdata) return;
        if (this.VBO==null) {
            this.VBO = gl.createBuffer();
            this.IBO = gl.createBuffer();

            this.needUpdateFlag=true;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bufferData(gl.ARRAY_BUFFER, this.VBOdata, gl.DYNAMIC_DRAW);

        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.IBOdata, gl.DYNAMIC_DRAW);
    }

    _cogl.DynamicMesh.prototype.computeNormals=function() {

    }

     _cogl.DynamicMesh.prototype.destroy=function() {
        if (this.VBO) gl.deleteBuffer(this.VBO);
        if (this.IBO) gl.deleteBuffer(this.IBO);

        this.VBO=null;
        this.IBO=null;

        this.VBOdata=null;
        this.IBOdata=null;

        this.needUpdateFlag=false;
    }*/
}