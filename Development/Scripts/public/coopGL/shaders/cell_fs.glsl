precision highp float;

uniform vec3 uLightPosition;
uniform vec3 uViewPoint;

uniform mat4 uLPVMatrix4;

uniform vec4 uColor;
uniform vec4 uSpecular;
uniform vec4 uAmbient;

uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec4 vPoint2d;
varying vec3 vPoint3d;
varying vec2 vTexCoord;

void main() {
	vec3 Lm=normalize(uLightPosition-vPoint3d); //direction to Light
	vec3 N=normalize(vNormal);

	vec3 color=uAmbient.rgb;				//ambient

	color+=uColor.rgb*step(0.5, dot(Lm, N));			//diffused

	vec3 Rm=normalize(reflect(Lm, N)); 		//reflected light direction
	vec3 V=normalize(uViewPoint-vPoint3d); 	//direction to Viewer
	color+=uSpecular.rgb*step(0.5, pow(dot(Rm, V), uSpecular.a));		//specular

    gl_FragColor=vec4(color, uColor.a);  
}

