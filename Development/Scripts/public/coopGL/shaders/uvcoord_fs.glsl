precision highp float;

varying vec2 vTexCoord;

vec2 packfloatToVec2i(const float d)
{
	float df=fract(d*255.0);

	return vec2(d-df/255.0, df);
}


void main() {

    gl_FragColor = vec4(packfloatToVec2i(fract(vTexCoord.x)), packfloatToVec2i(fract(vTexCoord.y)));
    //gl_FragColor = vec4(fract(vTexCoord.x), 0.0, fract(vTexCoord.y), 0.0);//vec4(0.0, 0.0, 0.0, 0.0);//
}


