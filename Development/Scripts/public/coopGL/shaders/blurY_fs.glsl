precision highp float;

uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;
uniform float uBlurSize;
varying vec2 vTexCoord;


void main() {

	vec4 sum = vec4(0.0);
 
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y - 4.0*uBlurSize)) * 0.05;
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y - 3.0*uBlurSize)) * 0.09;
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y - 2.0*uBlurSize)) * 0.12;
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y)) * 0.15;
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y)) * 0.16;
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y + uBlurSize)) * 0.15;
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y + 2.0*uBlurSize)) * 0.12;
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y + 3.0*uBlurSize)) * 0.09;
   sum += texture2D(uTexture, vec2(vTexCoord.x, vTexCoord.y + 4.0*uBlurSize)) * 0.05;
 
   gl_FragColor = sum;
}
