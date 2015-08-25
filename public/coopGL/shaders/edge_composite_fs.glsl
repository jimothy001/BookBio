precision highp float;

uniform vec4 uColor;
uniform vec2 uSizeInverse;
uniform float uSoften;
uniform sampler2D uTexture;


varying vec2 vTexCoord;

void main() {

    vec2 du=1.5*uSizeInverse;



   // vec2 dn=texture2D(uTexture, vTexCoord).rg;

     vec2 dn=(    texture2D(uTexture,vTexCoord).rg*mix(1.0, 0.20, uSoften)+
                    (texture2D(uTexture,vec2(vTexCoord.x+du.x, vTexCoord.y)).rg+
                    texture2D(uTexture,vec2(vTexCoord.x-du.x, vTexCoord.y)).rg+
                    texture2D(uTexture,vec2(vTexCoord.x, vTexCoord.y+du.y)).rg+
                    texture2D(uTexture,vec2(vTexCoord.x, vTexCoord.y-du.y)).rg)*mix(0.0, 0.20, uSoften)
                    ); 

   /* float s=(   texture2D(uTexture,vTexCoord).x+
                texture2D(uTexture,vec2(vTexCoord.x+du.x, vTexCoord.y)).x+
                texture2D(uTexture,vec2(vTexCoord.x-du.x, vTexCoord.y)).x+
                texture2D(uTexture,vec2(vTexCoord.x, vTexCoord.y+du.y)).x+
                texture2D(uTexture,vec2(vTexCoord.x, vTexCoord.y-du.y)).x+

                texture2D(uTexture,vec2(vTexCoord.x-du.x, vTexCoord.y-du.y)).x+
                texture2D(uTexture,vec2(vTexCoord.x+du.x, vTexCoord.y-du.y)).x+
                texture2D(uTexture,vec2(vTexCoord.x-du.x, vTexCoord.y+du.y)).x+
                texture2D(uTexture,vec2(vTexCoord.x+du.x, vTexCoord.y+du.y)).x
            )*0.1111111111111;*/ 

    float s=dn.r*dn.g;
    gl_FragColor= vec4(uColor.rgb*(1.0-s), 1.0-s);//1.0-s) + uColor*s;//vec4(clamp(uColor.rgb+s, 0.0, 1.0), uColor.a*s);
}