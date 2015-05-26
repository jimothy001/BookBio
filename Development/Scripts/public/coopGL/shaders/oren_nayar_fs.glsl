precision highp float;

uniform vec3 uLightPosition;
uniform vec3 uViewPoint;

uniform mat4 uLPVMatrix4;

uniform vec4 uColor;
uniform vec4 uSpecular;
uniform vec4 uAmbient;

uniform float uRoughness;

uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec4 vPoint2d;
varying vec3 vPoint3d;
varying vec2 vTexCoord;

void main() {
	float s2=uRoughness*uRoughness;
	float A=1.0-0.5*(s2/(s2+0.33));
	float B=0.45*(s2/(s2+0.09));

	vec3 L=normalize(uLightPosition-vPoint3d); //direction to Light
	vec3 V=normalize(uViewPoint-vPoint3d); 	//direction to Viewer

	vec3 N=normalize(vNormal);

	float theta_i=acos(dot(N, L));
	float theta_r=acos(dot(N, V));


	float a=max(theta_i, theta_r);
	float b=min(theta_i, theta_r);


	vec3 Ref=normalize(cross(V-L, N));

	vec3 Lp=normalize(L-dot(L,N)*N);
	vec3 Vp=normalize(V-dot(V,N)*N);

	float phi_i=acos(dot(Lp, Ref));
	float phi_r=acos(dot(Vp, Ref));

	vec3 ON=uColor.rgb*cos(theta_i)*(A+(B*max(0.0, cos(phi_i-phi_r))*sin(a)*tan(b)));

	//vec3 color=uAmbient.rgb;				//ambient


    gl_FragColor=vec4(ON, uColor.a);  
}
