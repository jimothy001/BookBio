precision highp float;
varying vec3 vNormal2d;


void main() {
    vec3 n=normalize(vNormal2d);
    float off = 0.6;
    //if (n.z<0.0) n*=-1.0;
    gl_FragColor=vec4((1.0+n)*off,1.0);        
}

