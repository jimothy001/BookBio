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
var CO=CO || {};

CO.loaders={};



CO.loadQueue=function(_uname) {
	return new CO.LoaderQueue(_uname);
}

CO.LoaderQueue=function(_uname) {
	this.uname=_uname;
	this.queue=[];
}

CO.LoaderQueue.prototype.get=function(_url, _callback) {
	this.queue.push({"type":"get", "url":_url, "callback":_callback});

	return this;
}

CO.LoaderQueue.prototype.getJSON=function(_url, _jsondata, _callback) {
	this.queue.push({"type":"getJSON", "url":_url, "jasondata":_jasondata, "callback":_callback});

	return this;
}
	
CO.LoaderQueue.prototype.getImage=function(_url, _callback) {
	this.queue.push({"type":"getImage", "url":_url, "image":new Image(), "callback":_callback});
	return image;
}

CO.LoaderQueue.prototype.start=function(_callback) {
	var loader=new CO.Loader("temp");

	for(var i=0; i<this.queue.length; ++i) {
		var q=this.queue[i];
		var type=q.type;
		if (type=="get") loader.get(q.url, this, q.callback);
		else if (type=="getJSON") loader.getJSON(q.url, q.jasondata ,this, q.callback);
		else if (type=="getImage") loader.getImage(q.url, this, q.callback);
	}

	loader.monitor(_callback);
}

//.......................................................................
CO.createLoader=function(_uname) {
	if (CO.loaders[_uname]) return CO.loaders[_uname];
	CO.loaders[_uname]=new CO.Loader(_uname);
	return CO.loaders[_uname];
}

CO.callCallback=function(_thisobject, _error, _data, _callback) {
	if (!_callback) return null;
	if (_thisobject) return _callback.call(_thisobject, _error, _data);
	else return _callback(_error, _data);
}

CO.Loader=function(_uname) {
	this.pendingJobs=[];
	this.uname=_uname;
	this.onFinish=null;
	this.monitoring=false;
	this.errors=[];
}

CO.Loader.prototype.monitor=function(_onFinish) {
	this.monitoring=true;
	this.onFinish=_onFinish;

	if (!this.isPending()) {
		this.Completed();

	}	
	return this;
}

CO.Loader.prototype.Completed=function() {
	this.monitoring=false;
	if (this._onFinish) 
		this._onFinish(this);


	this.error.length=0;
}

CO.Loader.prototype.isPending=function() {
	return this.pendingJobs.length;
}

CO.Loader.prototype.get=function(_url, _thisobject, _callback) {
	var job=this.addJob(_url, _thisobject);

	var that=this;

	$.get(_url, function (_response) {
		that.jobDone(job);
		CO.callCallback(_thisobject, null, _response, _callback);
	})
	.fail(function() {
		that.jobDone(job, "get failed: "+_url);
		CO.callCallback(_thisobject, "get failed: "+_url, null, _callback);
	});

	return this;
}

CO.Loader.prototype.getJSON=function(_url, _jsondata, _thisobject, _callback) {
	/*var job=this.addJob(_url, _thisobject);

	var that=this;

	$.get(_url, function (_response) {
		that.jobDone(job);
		CO.callCallback(_thisobject, null, _response, _callback);
	})
	.fail(function() {
		that.jobDone(job, "get failed"+_url);
		CO.callCallback(_thisobject, "get failed"+_url, null, _callback);
	});*/ //TODO:

	return this;
}
	
CO.Loader.prototype.getImage=function(_url, _thisobject, _callback) {
	var image=new Image();  

	var job=this.addJob(_url, _thisobject);

	var that=this;

	image.onload = function () { 
		that.jobDone(job);
		CO.callCallback(_thisobject, null, image, _callback);
	}
	image.onerror = function () { 
		that.jobDone(job, "image loading error: "+_url);
		CO.callCallback(_thisobject, "image loading error: "+_url, null, _callback);
	}
	image.onabort = function () { 
		that.jobDone(job, "image loading aborted: "+_url);
		CO.callCallback(_thisobject, "image loading aborted: "+_url, null, _callback);
	}
  	
  	image.src = _url;

	return image;
}

CO.Loader.prototype.addJob=function(_url, _thisobject) {
	var job={"url":_url, "thisobject":_thisobject};
	this.pendingJobs.push(job);

	if (_thisobject)
		_thisobject.__pending=true;

	return job;
}

CO.Loader.prototype.jobDone=function(job, _error) {
	if (job.thisobject) 
		delete job.thisobject.__pending;

	if (_error) this.errors.push(_error);
	
	this.pendingJobs.splice(this.pendingJobs.indexOf(job), 1);
	if (this.monitoring && !this.isPending()) this.Completed();
}