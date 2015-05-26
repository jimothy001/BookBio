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

COGL.GripsModule=function(_cogl) {
	var gl=_cogl.gl;

	_cogl.Grips

	_cogl.Grip=function(_trasnformer, _anchor3d) {
		this.xScreen=0.0;
		this.yScreen=0.0;
		this.zScreen=0.0;

		this.xLocal=0.0;
		this.yLocal=0.0;
		this.zLocal=0.0;

		this.xScene=0.0;
		this.yScene=0.0;
		this.zScene=0.0;

		this.pScene=vec3.create();
		this.pLocal=vec3.create();
		this.pScreen=vec3.create();

		this.transformer=_trasnformer;
		this.anchor3d=_anchor3d;
	}

	_cogl.Grip.prototype.update=function() {
		if (this.anchor3d) {			
			this.anchor3d.localToScene(this.pLocal, this.pScene);			
		}
		else {
			vec3.copy(this.pScene, this.pLocal);
		}

		this.xScene=this.pScene[0];
		this.yScene=this.pScene[1];
		this.zScene=this.pScene[2];

		if (this.transformer) {
			this.transformer.sceneToScreen(this.pScene, this.pScreen);			
		}
		else {
			vec3.copy(this.pScreen, this.pScene);
		}

		this.xScreen=this.pScreen[0];
		this.yScreen=this.pScreen[1];
		this.zScreen=this.pScreen[2];

	}
}