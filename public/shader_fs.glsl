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
   // gl_FragColor=vec4(1.0,0.0,0.0,1.0);  

   //gl_FragColor=vec4(vNormal,1.0);  

   vec3 dv=uViewPoint-vPoint3d;
   float c=length(dv)*0.1;
    gl_FragColor=vec4(c,c,c,1.0);  
}

