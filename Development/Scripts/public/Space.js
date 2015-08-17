
function TimeMark() //TIME DEMARCATION
{
	this.bounds = [1300, 2015];
	this.interval = 100;

	this.mat = new coGL.Material(coGL.shaders.default, {"uColor":[0.97, 0.97, 0.97, 0.2]});
	this.marks = [];

	for(var i = 0; i<5; i++)
	{
		var mark = new Mark(this.mat);
		mark.tag = mark.Tag();
		mark.Set(10.0 * i);


		this.marks.push(mark);

		tagmodels.push(mark.tag);
		if(i > 0) timemodels.push(mark.model);
	}

	this.MapMarks(this.bounds[0], this.bounds[1]);

	return this;
}

/*TimeMark.prototype.CheckBounds = (_from, _to)
{
	
}*/

TimeMark.prototype.MapMarks = function(_from, _to)
{	
	/*this.bounds[0] = _from;
	this.bounds[1] = _to;*/

	for(var i in this.marks)
	{
		var mark = this.marks[i];
		var date = Remap(mark.z, 0.0, 40.0, _from, _to)
		mark.date = date;
		//this.marks[i].date = date;
	}
}

function Mark(_mat)
{
	this.z = 0.0;
	this.date = 0;

	var _mark= coGL.loadMeshFromJSON("models/mapbase2.json");
	var mark = new coGL.Model(_mark, 0.0, 0.0, 0.0);
	mark.material = _mat;
	this.model = mark;

	//this.tag = this.Tag();

	return this;
}

Mark.prototype.Tag = function()
{
	var x = 48.0015;// + (offset * 2.0);
	var y = -24.319;
	var z = 0.0;

	var tex = this.Tex();

	var mat = this.TexMat(tex);

	var tag = new coGL.Model(coGL.loadMeshFromJSON("models/tag.json"), x, y, z);
	tag.x = x;
	tag.y = y;
	tag.z = z;

	tag.tex = tex;
	tag.material = mat;

	return tag;
}

Mark.prototype.Tex = function()
{
	var tex=coGL.createTextureWithCanvas(128,64);
	tex.graphics.fillRect(0,0,128,64);

	tex.update();

	return tex;
}

Mark.prototype.TexMat = function(_tex)
{
	var mat=new coGL.Material(coGL.shaders.phong,{"uColor":[0.97,0.97,0.97,0.3], "uSpecular": [0.0,0.0,0.0,0.0], "uAmbient":[0.5,0.5,0.5,1.0], "uTexture":0}, {"0":_tex});//coGL.textures.white
	//var mat=new coGL.Material(coGL.shaders.phong,{"uColor":[1.0,1.0,0.5,0.5], "uSpecular": [0.0,0.0,0.0,0.0], "uAmbient":[0.0,1.0,1.0,0.1], "uTexture":0}, {"0":_tex});//coGL.textures.white

	return mat;
}

Mark.prototype.Set = function(_z)
{
	this.x = 0.0;
	this.y = 0.0;
	this.z = _z;

	var v = vec3.create();
	v[0] = this.x;//-offset * 2.0; //?
	v[1] = this.y;
	v[2] = this.z;
	this.model.setLocation(v);

	var vv = vec3.create();
	vv[0] = this.tag.x;//-offset * 2.0; //?
	vv[1] = this.tag.y;
	vv[2] = this.z;
	this.tag.setLocation(vv);
}


function Map() //GEOGRAPHY //need to replace w/ single quad w/ texture
{
	this.mat = new coGL.Material(coGL.shaders.default, {"uColor":[0.97,0.97,0.97,0.5]});
	this.models = [];

	for(var i=0; i<161; i++)
	{
		var _mesh = coGL.loadMeshFromJSON("models/geo" + i + ".json");
		var mesh = new coGL.Model(_mesh, 0.0, 0.0, 0.0);
		mesh.material=this.mat;
		mapmodels.push(mesh);
	}

	return this;
}