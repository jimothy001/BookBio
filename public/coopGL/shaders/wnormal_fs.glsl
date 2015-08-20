precision highp float;


varying vec3 vNormal;

#define M_PI 3.1415926535897932384626433832795

vec2 packfloatToVec2i(const float d)
{
	float df=fract(d*255.0);

	return vec2(d-df/255.0, df);
}

void main() {
	vec3 n=normalize(vNormal);
	if (n.z<0.0) n*=-1.0;
    gl_FragColor = vec4(packfloatToVec2i(0.5*(n.x+1.0)), packfloatToVec2i(0.5*(n.y+1.0)));    
    //gl_FragColor = vec4(packfloatToVec2i(clamp((1.0+atan(n.y, n.x)/M_PI)*0.5), 0.0, 1.0), packfloatToVec2i(clamp(0.5+asin(n.z)/M_PI, 0.0, 1.0));    
}


