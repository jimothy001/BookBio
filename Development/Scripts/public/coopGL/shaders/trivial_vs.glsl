attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;

varying vec3 vNormal;
varying vec3 vNormal2d;
varying vec4 vPoint2d;
varying vec2 vTexCoord;
varying vec3 vPoint3d;

void main() {
    vPoint2d=vec4(aPosition,1.0);
    vNormal = aNormal;

    vNormal2d = aNormal;
    vTexCoord=aTexCoord;
    vPoint3d=aPosition;

    gl_Position = vec4(aPosition,1.0);
}