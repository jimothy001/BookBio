uniform mat4 uPVMatrix4;
uniform mat4 uVMatrix4;

uniform vec3 uPos; //sprite centre position in world coordinates
uniform vec4 uDim; //Left,right, bottom, top

attribute vec2 aPosition;

varying vec2 vTexCoord; 

void main() {
	vec2 p2d=vec2((1.0-aPosition.x)*uDim.x+aPosition.x*uDim.y, (1.0-aPosition.y)*uDim.w+aPosition.y*uDim.z);

	vec3 vposition=uPos+(vec4(p2d,0,0)*uVMatrix4).xyz;//p2d.x*uVMatrix4[0].xyz+p2d.y*uVMatrix4[1].xyz;
	vec4 pos=uPVMatrix4*vec4(vposition, 1.0);
	//pos=vec4(aPosition,0.5,1.0);
	gl_Position = pos;
		
    vTexCoord = aPosition;
}
