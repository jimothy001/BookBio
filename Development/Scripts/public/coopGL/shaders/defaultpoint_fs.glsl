precision highp float;

uniform vec3 uLightPosition;
uniform vec3 uViewPoint;

uniform mat4 uLPVMatrix4;

uniform vec4 uColor;

varying vec3 vNormal;
varying vec4 vPoint2d;
varying vec3 vPoint3d;

uniform sampler2D uTexture;



void main() {
	//vec4 color=texture2D(uTexture, gl_PointCoord);
	//if (color.a<0.3) discard;

	vec2 d=gl_PointCoord-0.5;
	float dd=length(d);
	if (dd>0.5) discard;

	dd=cos(dd*80.0);
	if (dd<0.5) discard; 


    gl_FragColor=vec4(0,0,0,dd);//uColor*color;  
}

