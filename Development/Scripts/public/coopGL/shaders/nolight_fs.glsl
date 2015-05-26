precision highp float;

uniform vec3 uLightPosition;
uniform vec3 uViewPoint;

uniform mat4 uLPVMatrix4;

uniform vec4 uColor;

uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec4 vPoint2d;
varying vec3 vPoint3d;
varying vec2 vTexCoord;


void main() {
    gl_FragColor=uColor;  
}

