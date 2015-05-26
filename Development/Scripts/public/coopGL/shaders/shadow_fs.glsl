precision highp float;

uniform mat4 uLPVMatrix4;
uniform vec3 uLightPosition;
uniform sampler2D uTextureDepthMap;
uniform float uBias;

varying vec3 vNormal;
varying vec4 vPoint2d;
varying vec3 vPoint3d;


float unpackFloatFromVec4i(const vec4 value)
{
  const vec4 bitSh = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
  return(dot(value, bitSh));
}


void main() {
    vec4 posFromLight=uLPVMatrix4*vec4(vPoint3d,1.0);

    vec2 positionInLightMap=(0.5*posFromLight.xy/posFromLight.w)+0.5;

    float distanceToLight=0.5*(((posFromLight.z-uBias)/posFromLight.w)+1.0);

    float shadow=1.0;


    if (positionInLightMap.x>=0.0 && positionInLightMap.x<=1.0 && positionInLightMap.y>=0.0 && positionInLightMap.y<=1.0) {
        float depthValueFromMap=unpackFloatFromVec4i(texture2D(uTextureDepthMap, positionInLightMap));
        if (depthValueFromMap<distanceToLight) {
            shadow=0.0;
        }
    }

    float diffuse=0.0;
    float specular=0.0;

 

     gl_FragColor=vec4(1.0-shadow, diffuse, specular, 1.0);
 
}

