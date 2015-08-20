uniform mat4 uPVMatrix4;
uniform mat4 uMMatrix4;
uniform mat4 uVMatrix4;

uniform mat4 uNormalMatrix4;

attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;

varying vec3 vNormal;
varying vec3 vNormal2d;
varying vec4 vPoint2d;
varying vec2 vTexCoord;
varying vec3 vPoint3d;

void main() {
    //..........................Regular Perspective       
    vec4 worldPosition=   uMMatrix4*vec4(aPosition, 1.0);  
    vec4 screenPosition=uPVMatrix4*worldPosition;
    
    //.............................Pass data to fragment shader
    vPoint2d=screenPosition;

    vec4 nn=uMMatrix4*vec4(aNormal, 0.0);
    vNormal = nn.xyz;

    //vec4 nn= (uNormalMatrix4*uMMatrix4*vec4(aNormal,0));
    //vNormal2d = nn.xyz;///nn.w;

    vNormal2d = (uVMatrix4*nn).xyz;
    vTexCoord=aTexCoord;
    vPoint3d=worldPosition.xyz;

    gl_Position = screenPosition;
}