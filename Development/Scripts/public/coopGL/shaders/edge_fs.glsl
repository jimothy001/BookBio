precision highp float;

uniform vec2 uSizeInverse;
uniform float uWidth;
uniform float uDepthFactor;
uniform float uNormalFactor;

/*varying vec3 vNormal;
varying vec4 vPoint2d;
varying vec3 vPoint3d;*/

varying vec2 vTexCoord;

uniform sampler2D uTextureDepthMap;
uniform sampler2D uTextureNormalMap;


float unpackFloatFromVec4i(const vec4 value)
{
  const vec4 bitSh = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
  return(dot(value, bitSh));
}


void main() {
    const float smapsize=1.0/2048.0;

  
   //vec2 texc=0.5*((vposition2d.xy/vposition2d.w)+1.0);

   vec2 texc=vTexCoord;


//...................................................DEPTH AND NORMAL EDGES


    float d0=unpackFloatFromVec4i(texture2D(uTextureDepthMap,texc));  
    vec3 n0=(texture2D(uTextureNormalMap,texc).xyz*2.0)-1.0; 


   /* float dd=0.0;
    float nn=0.0;

    for(int i=1; i<6; ++i) {
        float r=rand((vposition2d.xy+vNormal.yz)*float(i));
        vec2 dvx=vec2(cos(r*6.28318530718),sin(r*6.28318530718))*uSizeInverse*float(i)*2.0;

        float dx0=unpackFloatFromVec4i(texture2D(uTextureD,texc-dvx));  
        float dx1=unpackFloatFromVec4i(texture2D(uTextureD,texc+dvx)); 
        float ddx=dx1+dx0-2.0*d0;

        dd+=ddx*ddx/float(i);


        vec3 nx0=(texture2D(uTextureN,texc-dvx).xyz*2.0)-1.0; 
        vec3 nx1=(texture2D(uTextureN,texc+dvx).xyz*2.0)-1.0; 
        vec3 ndx=nx1+nx0-2.0*n0;

        nn+=dot(ndx,ndx)/float(i);
    }

    dd=clamp(1.0-sqrt(dd)*100.0,0.0,1.0);
    nn=clamp(1.0-sqrt(nn)*2.0,0.0,1.0);*/


    /*float r=rand(vposition2d.xy+vNormal.yz);
    vec2 dvx=vec2(cos(r*6.28318530718),sin(r*6.28318530718))*uSizeInverse;
    vec2 dvy=vec2(-dvx.y,dvx.x)*uSizeInverse;*/

    vec2 dvx=vec2(uSizeInverse.x*uWidth,0.0);
    vec2 dvy=vec2(0.0,uSizeInverse.y*uWidth);

//................tex coordinates

    float dx0=unpackFloatFromVec4i(texture2D(uTextureDepthMap,texc-dvx));  
    float dx1=unpackFloatFromVec4i(texture2D(uTextureDepthMap,texc+dvx)); 
    float dy0=unpackFloatFromVec4i(texture2D(uTextureDepthMap,texc-dvy)); 
    float dy1=unpackFloatFromVec4i(texture2D(uTextureDepthMap,texc+dvy)); 

    float ddx=dx1+dx0-2.0*d0;
    float ddy=dy1+dy0-2.0*d0;

    float dd=1.0-sqrt(ddx*ddx+ddy*ddy)*uDepthFactor;
    dd=clamp(dd,0.0,1.0);
    dd=clamp(dd+0.5,0.0,1.0);
    //.......................................normal

        
    vec3 nx0=(texture2D(uTextureNormalMap,texc-dvx).xyz*2.0)-1.0; 
    vec3 nx1=(texture2D(uTextureNormalMap,texc+dvx).xyz*2.0)-1.0; 
    vec3 ny0=(texture2D(uTextureNormalMap,texc-dvy).xyz*2.0)-1.0; 
    vec3 ny1=(texture2D(uTextureNormalMap,texc+dvy).xyz*2.0)-1.0; 

    vec3 ndx=nx1+nx0-2.0*n0;
    vec3 ndy=ny1+ny0-2.0*n0;

    float nn=1.0-sqrt(dot(ndx,ndx)+dot(ndy,ndy))*uNormalFactor;
    nn=clamp(nn,0.0,1.0);
    nn=clamp(nn+0.5,0.0,1.0);


    gl_FragColor=vec4(dd, nn, d0,1.0); 
 
}

