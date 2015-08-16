	
function Map() //GEOGRAPHY //need to replace w/ single quad w/ texture
{
	this.mat = new coGL.Material(coGL.shaders.default, {"uColor":[0.97,0.97,0.97,0.5]});
	this.meshes = [];

	for(var i=0; i<161; i++)
	{
		var _mesh = coGL.loadMeshFromJSON("models/geo" + i + ".json");
		var mesh = new coGL.Model(_mesh, 0.0, 0.0, 0.0);
		mesh.material=this.mat;
		mapmodels.push(mesh);
	}

	return this;
}

function TimeMark() //TIME DEMARCATION
{
	this.mat = new coGL.Material(coGL.shaders.default, {"uColor":[0.97, 0.97, 0.97, 0.2]});
	this.meshes = [];

	for(var i = 0; i<4; i++)
	{
		var _mesh= coGL.loadMeshFromJSON("models/mapbase.json");
		var mesh = new coGL.Model(_mesh, 0.0, 0.0, 10.0 * (i+1));
		mesh.material = this.mat;
		timemodels.push(mesh);
	}

	return this;
}

function ReshuffleMeshes()
{
	var _modelsToRender = [];


}