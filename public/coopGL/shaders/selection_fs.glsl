precision highp float;
uniform int uSelectionIndex;

vec4 packIntToVec3(const int value)
{
  const vec4 bitSh = vec4(1.0/255.0, 1.0/(255.0*255.0), 1.0/(255.0*255.0*255.0), 1.0/(255.0*255.0*255.0*255.0));
  const vec4 bitMsk = vec4(0.0, 1.0/255.0, 1.0/255.0, 1.0/255.0);
  vec4 res = fract(float(value) * bitSh);

  res -= res.xxyz * bitMsk;
  return res;


 /* vec4 res=vec4(0.0,0.0,0.0,0.0);
  float v=float(value);

    res.x = (v  / 255.0);
    res.y = (v  / (255.0 * 255.0));
    res.z = (v  / (255.0 * 255.0 * 255.0));

    res.x -=floor(res.x);
    res.y -=floor(res.y);
    res.z -=floor(res.z);

    res.y -= res.x  / 255.0;
    res.z -= res.y  / 255.0;

    return res;*/
}

/*float unpackIntFromVec3(const vec4 value)
{
  const vec4 bitSh = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
  return(dot(value, bitSh));
}*/

void main() {
	gl_FragColor=packIntToVec3(uSelectionIndex);//vec4(packIntToVec3(selectionIndex),1.0);
}
