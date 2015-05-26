precision highp float;

uniform vec4 uColor;
uniform float uLightness;

varying vec3 vNormal2d;

void main() {
    vec3 n=normalize(vNormal2d);
    float off = 0.6;
    gl_FragColor=vec4((uColor.xyz+n)*uLightness,1.0);        
}

