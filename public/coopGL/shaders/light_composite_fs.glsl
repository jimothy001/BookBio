precision highp float;

uniform vec4 uColor;
uniform vec2 uSizeInverse;
uniform sampler2D uTexture;


varying vec2 vTexCoord;

void main() {

    float s=texture2D(uTexture, vTexCoord).gb;
 
    gl_FragColor= vec4(uColor.rgb*s.g+s.b, uColor.a);
}