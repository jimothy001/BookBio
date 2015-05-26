precision highp float;

uniform vec4 uColor;
uniform vec2 uSizeInverse;
uniform sampler2D uTexture;


varying vec2 vTexCoord;

void main() {

    vec2 du=1.5*uSizeInverse;



   // float s=texture2D(uTexture, vTexCoord).r;

      float s=(    texture2D(uTexture,vTexCoord).r+
                    texture2D(uTexture,vec2(vTexCoord.x+du.x, vTexCoord.y)).r+
                    texture2D(uTexture,vec2(vTexCoord.x-du.x, vTexCoord.y)).r+
                    texture2D(uTexture,vec2(vTexCoord.x, vTexCoord.y+du.y)).r+
                    texture2D(uTexture,vec2(vTexCoord.x, vTexCoord.y-du.y)).r
                    )*0.20; 

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


    gl_FragColor= vec4(clamp(uColor.rgb+(1.0-s), 0.0, 1.0), uColor.a*s);
}
