

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float scope(float scale, float blurriness){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = 1.0 - distance(st,vec2(0.5)) * 2.0 * scale;

    pct = smoothstep(0.2, 0.2 + blurriness , pct);
    return pct;
}

vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float sinT = sin(u_time) * 0.5 + 0.5;

    // a. The DISTANCE from the pixel to the center
    
    // b. The LENGTH of the vector 
    //    from the pixel to the center 
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector 
    //    from the pixel to the center 
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    
    vec3 color = vec3(scope(1.0, 0.2 * sinT));

    gl_FragColor = vec4( color, 1.0 );
}