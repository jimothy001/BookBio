precision highp float;

varying vec2 vTexCoord;

vec4 packFloatToVec4i(const float value)
{
  const vec4 bitSh = vec4(255.0*255.0*255.0, 255.0*255.0, 255.0, 1.0);
  const vec4 bitMsk = vec4(0.0, 1.0/255.0, 1.0/255.0, 1.0/255.0);
  vec4 res = fract(value * bitSh);

  res -= res.xxyz * bitMsk;
  return res;
}


void main() {

    gl_FragColor = packFloatToVec4i(fract(vTexCoord.x));
    
}


