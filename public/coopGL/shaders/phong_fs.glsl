precision highp float;

uniform vec3 uLightPosition;
uniform vec3 uViewPoint;

uniform mat4 uLPVMatrix4;

uniform vec4 uColor;		//=[1.0,1.0,1.0,1.0]
uniform vec4 uSpecular;		//=[1.0,1.0,1.0,60.0]
uniform vec4 uAmbient;		//=[0.1,0.1,0.1,1.0]

uniform vec4 uClipPlane1;	//=[0.0,0.0,0.0,0.0]
uniform vec4 uClipPlane2;	//=[0.0,0.0,0.0,0.0]
uniform vec4 uClipSphere;	//=[0.0,0.0,0.0,100000.0]

uniform vec4 uCursorColor;	//=[0.0,0.0,0.0,0.0]
uniform vec3 uCursor3d;		//=[0.0,0.0,0.0]
uniform vec3 uCursorSize;	//=[0.0,0.0,0.0]

uniform sampler2D uTexture;	//=0

varying vec3 vNormal;
varying vec4 vPoint2d;
varying vec3 vPoint3d;
varying vec2 vTexCoord;

void main() {
	
	float clip1=dot(uClipPlane1.xyz, vPoint3d.xyz)-uClipPlane1.w;
	float clip2=dot(uClipPlane2.xyz, vPoint3d.xyz)-uClipPlane2.w;

	if (clip1<0.0 || clip2<0.0) discard;

	float clipsphere=length(uClipSphere.xyz- vPoint3d.xyz);

	if (clipsphere>uClipSphere.w) discard;


	vec4 texc=texture2D(uTexture, vTexCoord);

	if (texc.w<0.3) discard;



	vec3 color=uAmbient.rgb;				//ambient

	float mouseDistance=length(uCursor3d-vPoint3d);
	mouseDistance=clamp(1.0-abs(mouseDistance- uCursorSize.x)*uCursorSize.y, 0.0, 1.0);
	if (mouseDistance<0.5) mouseDistance=0.0;
	else mouseDistance=1.0;



	vec3 Lm=normalize(uLightPosition-vPoint3d); //direction to Light
	vec3 N=normalize(vNormal);

	
	
	color+=uColor.rgb*dot(Lm, N)*texc.xyz;			//diffused

	vec3 Rm=normalize(reflect(Lm, N)); 		//reflected light direction
	vec3 V=normalize(uViewPoint-vPoint3d); 	//direction to Viewer
	color+=uSpecular.rgb*pow(abs(dot(Rm, V)), uSpecular.a);		//specular

    gl_FragColor=vec4(mix(clamp(color, 0.0, 1.0), uCursorColor.xyz, mouseDistance*uCursorColor.w), uColor.a*texc.w);  
}

