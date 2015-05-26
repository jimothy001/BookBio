precision highp float;

uniform vec4 uColor;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

void main() {

	vec4 col=texture2D(uTexture, vTexCoord);
	if (col.w<0.5) discard;
	gl_FragColor= col * uColor;
}
