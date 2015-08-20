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



COGL.Core=function(_canvasId) {
	var that=this;


	this.loader= CO.createLoader("defaultGLLoader");

	this.canvas = document.getElementById(_canvasId);

	this.canvas.__cogl=this;


	var width = $(this.canvas).innerWidth();
    var height = $(this.canvas).innerHeight();    

    this.canvas.width=width;
    this.canvas.height=height;

    var that=this;


    $(window).resize(function () {
        width = $(that.canvas).innerWidth();
        height = $(that.canvas).innerHeight();

        that.canvas.width=width;
        that.canvas.height=height;
    });



    //disable right click context menu on canvas
    this.canvas.oncontextmenu=function() {return false;};
    this.gl = WebGLUtils.setupWebGL(this.canvas, { depth: true, preserveDrawingBuffer: true });

    Object.defineProperty(this, "width", {
								get : function(){ return this.canvas.width; },
                               	//set : function(_newValue){ that.set(_newValue); },
                               	enumerable : true,
                               	configurable : true}
                               );
    Object.defineProperty(this, "height", {
								get : function(){ return this.canvas.height; },
                               	//set : function(_newValue){ that.set(_newValue); },
                               	enumerable : true,
                               	configurable : true}
                               );

    //this.currentWidth=width; //may change from viewport to FBO
    //this.currentHeight=height;

	COGL.ShadersModule(this);
	COGL.MatrixPackModule(this);
	COGL.CameraModule(this);
	COGL.MeshModule(this);
	COGL.ModelModule(this);
    COGL.IsoSurfaceModule(this);
	COGL.SurfaceModule(this);

	COGL.GeometryModule(this);
	COGL.ConstrainsModule(this);
	COGL.GripsModule(this);

	COGL.MouseModule(this);

	COGL.DrawModule(this);

	COGL.TextureModule(this);
    COGL.Texture3dModule(this);
	COGL.FBOModule(this);
	COGL.RenderingPassModule(this);
	COGL.SelectionModule(this);


	this.drawPoints=new this.DrawingEngine(this.gl.POINTS); //***ACTUAL GL
	this.drawLines=new this.DrawingEngine(this.gl.LINES); //***ACTUAL GL
	this.drawPolylines=new this.DrawingEngine(this.gl.LINE_STRIP); //***ACTUAL GL
	this.drawTriangles=new this.DrawingEngine(this.gl.TRIANGLES); //***ACTUAL GL


	this.mouse=new this.Mouse(this); //viewport and scene coordinates + constrained cursor
	this.camera=new this.Camera();

	this.selectionEngine=new this.SelectionEngine();


    this.backColorRed=0.9; 
    this.backColorGreen=0.93; 
    this.backColorBlue=0.95; 
    this.backColorAlpha=1.0; 
   

    this.onPreRender=null;
    this.onBeginRendering=null;

    this.onSelectionRender=null;
    this.onRender=null;

    this.onFinishRendering=null;
    this.onPostRender=null;


    this.textures={};
    this.textures.white=this.createSolidTexture(2,2,[255,255,255,255]);


    this.LoadShaderFromFiles("default", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/default_fs.glsl");
    this.LoadShaderFromFiles("defaultpoint", "coopGL/shaders/defaultpoint_vs.glsl", "coopGL/shaders/defaultpoint_fs.glsl");
    this.LoadShaderFromFiles("defaultline", "coopGL/shaders/defaultline_vs.glsl", "coopGL/shaders/defaultline_fs.glsl");

    this.LoadShaderFromFiles("phong", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/phong_fs.glsl");
    this.LoadShaderFromFiles("orennayar", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/oren_nayar_fs.glsl");
    this.LoadShaderFromFiles("cell", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/cell_fs.glsl");
    this.LoadShaderFromFiles("nolight", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/nolight_fs.glsl");
    this.LoadShaderFromFiles("falloff", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/falloff_fs.glsl");


    this.LoadShaderFromFiles("depth", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/depth_fs.glsl");
    this.LoadShaderFromFiles("selection", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/selection_fs.glsl");
    this.LoadShaderFromFiles("normal", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/normal_fs.glsl");
    this.LoadShaderFromFiles("normal_opp", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/normal_opp_fs.glsl");
    this.LoadShaderFromFiles("normal_color", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/normal_color_fs.glsl");


    this.LoadShaderFromFiles("uvcoord", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/uvcoord_fs.glsl");
    this.LoadShaderFromFiles("wnormal", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/wnormal_fs.glsl");
    

    this.LoadShaderFromFiles("shadow", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/shadow_fs.glsl");
    this.LoadShaderFromFiles("shadowsoft", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/shadowsoft_fs.glsl");
    this.LoadShaderFromFiles("shadowsoftnoisy", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/shadowsoftnoisy_fs.glsl");
    this.LoadShaderFromFiles("edge", "coopGL/shaders/default_vs.glsl", "coopGL/shaders/edge_fs.glsl");

    this.LoadShaderFromFiles("shadowcomposite", "coopGL/shaders/trivial_vs.glsl", "coopGL/shaders/shadow_composite_fs.glsl");
    this.LoadShaderFromFiles("shadowcompositecell", "coopGL/shaders/trivial_vs.glsl", "coopGL/shaders/shadow_composite_cell_fs.glsl");
    this.LoadShaderFromFiles("lightcomposite", "coopGL/shaders/trivial_vs.glsl", "coopGL/shaders/light_composite_fs.glsl");
    this.LoadShaderFromFiles("edgecomposite", "coopGL/shaders/trivial_vs.glsl", "coopGL/shaders/edge_composite_fs.glsl");
   
    this.LoadShaderFromFiles("blurx", "coopGL/shaders/trivial_vs.glsl", "coopGL/shaders/blurX_fs.glsl");
    this.LoadShaderFromFiles("blury", "coopGL/shaders/trivial_vs.glsl", "coopGL/shaders/blurY_fs.glsl");

    this.LoadShaderFromFiles("quad", "coopGL/shaders/trivial_vs.glsl", "coopGL/shaders/sprite_fs.glsl");

//..........................................Start rendering recurcion

	var animFunction= function() {
		window.requestAnimFrame(animFunction, this.canvas);
    	that.render();
	}
    
    animFunction();
}


COGL.Core.prototype.flush=function() { //commit all remaining drawing buffers
	this.drawPoints.commit();
	this.drawLines.commit();
	this.drawPolylines.commit();
	this.drawTriangles.commit();
}

COGL.Core.prototype.render=function() {
	if (this.loader.isPending()) return;
	var gl=this.gl;


	gl.viewport(0, 0, this.width, this.height);

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE);

    gl.disable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

 
 	this.camera.update();

	this.runRenderingPasses();

	return true;
}


COGL.init=function(_canvasId) {
	return new COGL.Core(_canvasId);
}


/*
CO.Selectables=[];
CO.Renderables=[];
//..................................Renderable
CO.Renderable=function(obj) {
	obj.visible=true;
	CO.Renderables.push(obj);
	return obj;
}

//...................................Selectable
CO.SelectionId=1;

CO.Selectable=function(obj) {
	obj.selectionId=CO.SelectionId;
	CO.SelectionId++;
	obj.selectable=true;
	CO.Selectables.push(obj);
	return obj;
}*/