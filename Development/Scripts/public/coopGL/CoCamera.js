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

COGL.CameraModule=function(_cogl) {
    var gl=_cogl.gl;

    _cogl.Camera=function() {
        this.matrices=new _cogl.MatrixPack();

        this.vPoint = vec3.create();

        this.tPoint = vec3.create();
        this.tPointTarget = vec3.create();

        this.up = vec3.fromValues(0, 0, 1);        
        this.upTarget=vec3.fromValues( 0, 0, 1);
        
        this.angleXY = 0.0;
        this.angleZ = 0.0;
        this.distance = 30.0;

        this.angleXYTarget = 0.0;
        this.angleZTarget = 0.0;
        this.distanceTarget = 30.0;

        this.aspectOverride=0;

        this.viewVector=vec3.fromValues(0, 0, 1);        
        
        this.fov=60.0;
        this.near=0.1;
        this.far=100.0;

        this.fovTarget=60.0;
        this.nearTarget=0.1;
        this.farTarget=100.0;


        this.minDistance=0.1;
        this.maxDistance=80.0;

        this.easeIn=0.95;
    }


    _cogl.Camera.prototype.update = function () {

        if (this.angleZTarget>Math.PI*0.48) this.angleZTarget=Math.PI*0.48;
        if (this.angleZTarget<-Math.PI*0.48) this.angleZTarget=-Math.PI*0.48;

        if (this.distanceTarget < this.minDistance)
            this.distanceTarget = this.minDistance;
        else if (this.distanceTarget > this.maxDistance)
            this.distanceTarget = this.maxDistance;

        var it = this.easeIn;
        var itt = 1.0 - this.easeIn;

        
        this.tPoint[0] = this.tPoint[0] * it + this.tPointTarget[0] * itt;
        this.tPoint[1] = this.tPoint[1] * it + this.tPointTarget[1] * itt;
        this.tPoint[2] = this.tPoint[2] * it + this.tPointTarget[2] * itt;

        this.up[0] = this.up[0] * it + this.upTarget[0] * itt;
        this.up[1] = this.up[1] * it + this.upTarget[1] * itt;
        this.up[2] = this.up[2] * it + this.upTarget[2] * itt;


        this.angleXY = this.angleXY * it + this.angleXYTarget * itt;




        this.angleZ = this.angleZ * it + this.angleZTarget * itt;
        this.distance = this.distance * it + this.distanceTarget * itt;

        this.fov    = this.fov  * it + this.fovTarget * itt;
        this.near   = this.near * it + this.nearTarget * itt;
        this.far    = this.far  * it + this.farTarget * itt;

        this.viewVector[0] =-this.distance * Math.cos(this.angleXY) * Math.cos(this.angleZ);
        this.viewVector[1] =-this.distance * Math.sin(this.angleXY) * Math.cos(this.angleZ);
        this.viewVector[2] =-this.distance * Math.sin(this.angleZ);

        this.vPoint[0] = this.tPoint[0] - this.viewVector[0];
        this.vPoint[1] = this.tPoint[1] - this.viewVector[1];
        this.vPoint[2] = this.tPoint[2] - this.viewVector[2];

        this.matrices.lookAt(this.vPoint, this.tPoint, this.up).perspective(this.fov, this.aspectOverride ||(_cogl.width/_cogl.height), this.near, this.far).update();

        return this;
    }


    _cogl.Camera.prototype.onMouseDown = function (_e) {
        _cogl.mouse.capture(this);
        return true;
    }

    _cogl.Camera.prototype.onMouseUp = function (_e) {
        _cogl.mouse.release(this);
    }

    _cogl.Camera.prototype.onMouseMove = function (_e) {
        this.angleXYTarget-= _cogl.mouse.dx * 0.01;
        this.angleZTarget+= _cogl.mouse.dy * 0.01;
    }



    _cogl.Camera.prototype.setTargetPointXYZ = function (_x, _y, _z) {
        this.tPointTarget[0] = _x;
        this.tPointTarget[1] = _y;
        this.tPointTarget[2] = _z;

        return this;
    }

    _cogl.Camera.prototype.setDistance = function (_d) {
        this.distanceTarget = _d;

        return this;
    }

    _cogl.Camera.prototype.setTargetPoint = function (_p) {
        this.setTargetPointXYZ(_p[0], _p[1], _p[2]);

        return this;
    }

    _cogl.Camera.prototype.setViewPoint = function (_p) {
        var vv=vec3.create();

        vv[0] = this.tPoint[0] - _p[0];
        vv[1] = this.tPoint[1] - _p[1];
        vv[2] = this.tPoint[2] - _p[2];

        var d=vec3.length(vv);
        var vn=vec3.create();

        vec3.normalize(vn, vv);

        var az=Math.asin(-vn[2]);
        var axy=Math.atan2(-vn[1], -vn[0]);
        if (axy<0.0) axy+=2.0*Math.PI;

        this.setDistance(d);
        this.setAngleXY(axy);
        this.setAngleZ(az);

       // this.viewVector[0] =-this.distance * Math.cos(this.angleXY) * Math.cos(this.angleZ);
        //this.viewVector[1] =-this.distance * Math.sin(this.angleXY) * Math.cos(this.angleZ);
        //this.viewVector[2] =-this.distance * Math.sin(this.angleZ);

        return this;
    }

    _cogl.Camera.prototype.setFov = function (_p) {
        this.fovTarget=_p;

        return this;
    }

    _cogl.Camera.prototype.setNear = function (_p) {
        this.nearTarget=_p;

        return this;
    }

    _cogl.Camera.prototype.setFar = function (_p) {
        this.farTarget=_p;

        return this;
    }

    _cogl.Camera.prototype.setAspectOverride = function (_p) {
        this.aspectOverride=_p;

        return this;
    }

     _cogl.Camera.prototype.setAngleXY = function (_p) {
        this.angleXY=this.angleXY%(2.0*Math.PI);
        if (this.angleXY<0.0) this.angleXY+=(2.0*Math.PI);


        this.angleXYTarget=_p;

        this.angleXYTarget=this.angleXYTarget%(2.0*Math.PI);
        if (this.angleXYTarget<0.0) this.angleXYTarget+=(2.0*Math.PI);

        if (this.angleXYTarget-this.angleXY>(Math.PI)) {
            this.angleXYTarget-=2.0*Math.PI;
        }
        else if (this.angleXYTarget-this.angleXY<(-Math.PI)) {
            this.angleXYTarget+=2.0*Math.PI;
        }

        return this;
    }

    _cogl.Camera.prototype.setAngleZ = function (_p) {
        this.angleZTarget=_p;

        return this;
    }


    _cogl.Camera.prototype.applyToShaderAsTransform=function(_shader) {
        this.matrices.applyToShaderAsTransform(_shader);
 
         return this;
    }

    _cogl.Camera.prototype.applyToShaderAsLight=function(_shader) {
        this.matrices.applyToShaderAsLight(_shader);

        return this;
    }

    _cogl.Camera.prototype.sceneToScreen=function(_pScene, _pScreen) {
        this.matrices.sceneToScreen(_pScene, _pScreen);

        return this;
    }
    

}