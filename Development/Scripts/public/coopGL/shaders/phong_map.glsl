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
	

	vec4 texc=texture2D(uTexture, vTexCoord); //color of texture at this pixel

	vec3 color=uAmbient.rgb;				//ambient



	//vec3 Lm=normalize(uLightPosition-vPoint3d); //direction to Light
	//vec3 N=normalize(vNormal);

	
	//color+=abs(dot(Lm, N))*mix( uColor.rgb, vec3(1.0,1.0,1.0), texc.w);			//diffused

	//vec3 Rm=normalize(reflect(Lm, N)); 		//reflected light direction
	//vec3 V=normalize(uViewPoint-vPoint3d); 	//direction to Viewer
	//color+=uSpecular.rgb*pow(abs(dot(Rm, V)), uSpecular.a);		//specular

    //gl_FragColor=vec4(color+texc.w, uColor.a);  

///////////////////////////////////////////////////////////////////////////////////////////////////////
//TRIED TO GET RID OF DARK ARCANA.... JY

	vec3 Lm=normalize(uLightPosition); //direction to Light
	vec3 N=normalize(vNormal);

	//color+=uColor.rgb*step(0.5, dot(Lm, N));			//diffused
	
	color+=abs(dot(Lm, N))*mix(uColor.rgb, vec3(1.0,1.0,1.0), texc.w);			//diffused // 



	vec3 Rm=normalize(reflect(Lm, N)); 		//reflected light direction
	vec3 V=normalize(uViewPoint-vPoint3d); 	//direction to Viewer
	color+=uSpecular.rgb*pow(abs(dot(Rm, V)), uSpecular.a);		//specular

	//color+=uSpecular.rgb*step(0.5, pow(dot(Rm, V), uSpecular.a));

    gl_FragColor=vec4(color+texc.w, uColor.a);     

}

