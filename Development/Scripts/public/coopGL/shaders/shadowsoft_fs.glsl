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


void main() {
    vec4 posFromLight=uLPVMatrix4*vec4(vPoint3d,1.0);

    vec2 positionInLightMap=(0.5*posFromLight.xy/posFromLight.w)+0.5;

    float distanceToLight=0.5*(((posFromLight.z-uBias)/posFromLight.w)+1.0);

    float shadow=1.0;



//.............................grid kernel shadow
    if (positionInLightMap.x>=0.0 && positionInLightMap.x<=1.0 && positionInLightMap.y>=0.0 && positionInLightMap.y<=1.0) { 
       const int k1=5;
        const float dk1=float(k1/2);

        const int k2=5;
        const float dk2=float(k2/2);

        const float kreduce=1.0/float(k2*k2);

        vec2 ds=uSpread.x*uSizeInverse;
        vec2 dst=-dk1*ds;
        float avgz=0.0;
        float savg=0.0;

        for(int j=0; j<k1; ++j) {
            dst.x=-dk1*ds.x;
            for(int i=0; i<k1; ++i) {
                float dlp=unpackFloatFromVec4i(texture2D(uTextureDepthMap,positionInLightMap+dst));
                if (dlp<distanceToLight) {
                    avgz+=dlp;
                    savg+=1.0;
                }
                dst.x+=ds.x;
            }
            dst.y+=ds.y;
        }
        avgz/=savg;

        float wp=(distanceToLight-avgz)/avgz;

        ds=uSpread.y*wp*uSizeInverse;//uSpread.x*wp*uSizeInverse;


        dst=-dk2*ds;
        for(int j=0; j<k2; ++j) {
            dst.x=-dk2*ds.x;
            for(int i=0; i<k2; ++i) {
                float dlp=unpackFloatFromVec4i(texture2D(uTextureDepthMap,positionInLightMap+dst));
                if (dlp<distanceToLight) shadow-=kreduce;  
                dst.x+=ds.x;
            }
            dst.y+=ds.y;
        }
    }


     float diffuse=0.0;
    float specular=0.0; 



    gl_FragColor=vec4(1.0-shadow, diffuse, specular, 1.0);
    //gl_FragColor=vec4((vPoint2d.x+1.0)*0.5, 1.0, 1.0, 1.0);
 
}

