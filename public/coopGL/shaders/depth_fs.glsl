﻿precision highp float;

varying vec4 vPoint2d;

vec4 packFloatToVec4i(const float value)
{

  const vec4 bitSh = vec4(255.0*255.0*255.0, 255.0*255.0, 255.0, 1.0);
  const vec4 bitMsk = vec4(0.0, 1.0/255.0, 1.0/255.0, 1.0/255.0);
  vec4 res = fract(value * bitSh);

  res -= res.xxyz * bitMsk;
  return res;
}



void main() {

    //gl_FragColor = packFloatToVec4i(1.0/(2.0*(vposition2d.z/vposition2d.w+1.0)));

    gl_FragColor = packFloatToVec4i(clamp(0.5*((vPoint2d.z/vPoint2d.w)+1.0),0.0,1.0));
    
}


