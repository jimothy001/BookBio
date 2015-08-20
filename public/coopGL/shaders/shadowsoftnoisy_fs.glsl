precision highp float;

uniform mat4 uLPVMatrix4;
uniform vec3 uLightPosition;
uniform sampler2D uTextureDepthMap;

uniform float uBias;

uniform vec2 uSpread;
uniform vec2 uSizeInverse;
uniform float uReduction;


varying vec3 vNormal;
varying vec4 vPoint2d;
varying vec3 vPoint3d;



float unpackFloatFromVec4i(const vec4 value)
{
  const vec4 bitSh = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
  return(dot(value, bitSh));
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}


void main() {


    vec4 posFromLight=uLPVMatrix4*vec4(vPoint3d,1.0);

    vec2 positionInLightMap=(0.5*posFromLight.xy/posFromLight.w)+0.5;

    float distanceToLight=0.5*(((posFromLight.z-uBias)/posFromLight.w)+1.0);

    float shadow=1.0;

    vec2 ds=uSizeInverse;

    if (positionInLightMap.x>=0.0 && positionInLightMap.x<=1.0 && positionInLightMap.y>=0.0 && positionInLightMap.y<=1.0) {



   //..............................random kernel
        const int k1=15;
        vec2 dk1=uSpread.x*uSizeInverse;

        const int k2=12;

        vec2 spread=uSpread.y*uSizeInverse;

        vec2 rseed=vPoint2d.xy+vNormal.yz;

        ds=uSizeInverse;
        vec2 dst=vec2(0.0,0.0);
        float avgz=0.0;
        float savg=0.0;

        for(int j=0; j<k1; ++j) {  
            dst.y=(rand(dst+vNormal.xy)-0.5)*dk1.y; 
            dst.x=(rand(dst+vPoint2d.xy)-0.5)*dk1.x;  

          
            float dlp=unpackFloatFromVec4i(texture2D(uTextureDepthMap,positionInLightMap+dst));
            if (dlp<distanceToLight) {
                avgz+=dlp;
                savg+=1.0;
            }
            //dst.x=cos(6.2832*float(j)/float(k1-1))*dk1.x;
            //dst.y=sin(6.2832*float(j)/float(k1-1))*dk1.y;
        }
        avgz/=savg;

        float wp=(distanceToLight-avgz)/avgz;


        ds=spread*wp;
        float dsd=uReduction/float(k2);

        dst=vec2(0.0,0.0);
        for(int j=0; j<k2; ++j) {  
            dst.y=(rand(dst+vNormal.xy)-0.5)*ds.y;  //-dst.x;
            dst.x=(rand(dst+vPoint2d.xy)-0.5)*ds.x;  

            float dlp=unpackFloatFromVec4i(texture2D(uTextureDepthMap, positionInLightMap+dst));
            if (dlp<distanceToLight) {
                shadow-=dsd;
            }
        }
    }


    float diffuse=0.0;
    float specular=0.0; 

    gl_FragColor=vec4(1.0-shadow, diffuse, specular, 1.0);
 
}

