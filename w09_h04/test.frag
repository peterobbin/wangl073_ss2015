// Author @patriciogv - 2015 modified by @peterobbin
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}



float box(vec2 st, vec2 size, float blur){
    st += .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.05 * blur),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.05 * blur),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float bars(vec2 st, float size, float blur){
    float ratio = 5.0;
    float sinT = sin(u_time * 0.5) * 0.5 + 0.5;
    float bars = 0.0;

    bars +=  box(st + vec2(-0.2 * -0.0 + sinT * 0.05 , 0.0), vec2(size/ratio,size * 0.4), blur);
    bars +=  box(st + vec2(-0.2 * -0.5 + sinT * 0.05 , 0.0), vec2(size/ratio,size * 0.4), blur);
    bars +=  box(st + vec2(-0.2 * -1.7 + sinT * 0.05 , 0.0), vec2(size/ratio,size * 0.4), blur);
    bars +=  box(st + vec2(-0.2 * 2.1 + sinT * 0.05 , 0.0), vec2(size/ratio,size * 0.4), blur);
    bars +=  box(st + vec2(-0.2 * 0.8 + sinT * 0.05 , 0.0), vec2(size/ratio,size * 0.4), blur);
    bars +=  box(st + vec2(-0.2 * -3.7 + sinT * 0.05 , 0.0), vec2(size/ratio,size * 0.4), blur);
    bars +=  box(st + vec2(-0.2 * 2.9 + sinT * 0.05 , 0.0), vec2(size/ratio,size * 0.4), blur);

    return  bars;

}


float bars2(vec2 st, float size, float blur){
    float ratio = 6.0;
    float sinT = cos(u_time * 0.34) * 0.5 + 0.5;
    float bars = 0.0;

    bars +=  box(st + vec2(-0.2 * -0.0 + sinT * 0.045 , 0.0), vec2(size/ratio,size * 0.3), blur);
    bars +=  box(st + vec2(-0.2 * -1.2 + sinT * 0.03 , 0.0), vec2(size/ratio,size * 0.3), blur);
    bars +=  box(st + vec2(-0.2 * -2.7 + sinT * 0.02 , 0.0), vec2(size/ratio,size * 0.3), blur);
    bars +=  box(st + vec2(-0.2 * 2.4 + sinT * 0.034 , 0.0), vec2(size/ratio,size * 0.3), blur);
    bars +=  box(st + vec2(-0.2 * 0.4 + sinT * 0.03 , 0.0), vec2(size/ratio,size * 0.3), blur);
    bars +=  box(st + vec2(-0.2 * -3.3 + sinT * 0.02 , 0.0), vec2(size/ratio,size * 0.3), blur);
    bars +=  box(st + vec2(-0.2 * 3.7 + sinT * 0.034 , 0.0), vec2(size/ratio,size * 0.3), blur);

    return  bars;

}

float barsFlare(vec2 st, float size, float blur, float thickess){
    float ratio = 20.0;
    float sinT = cos(u_time * 0.34) * 0.5 + 0.5;
    float bars = 0.0;

    bars += box(st, vec2(size * ratio,size/3. * thickess), blur);


    return  bars;

}
mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0));
}

void scale(in vec2 f, inout mat3 mtx) {
    mtx = scaleMatrix(f) * mtx;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0));
}

void translate(vec2 f, inout mat3 mtx) {
    mtx = translationMatrix(f) * mtx;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a, inout mat3 mtx) {
    mtx = rotationMatrix(a) * mtx;
}



void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);
    vec2 mousePos = u_mouse/u_resolution;
    vec2 oST = st;

     st.x *= 30.0 - mousePos.x * 10.0; // Scale the coordinate system by 10
     st.y *= 10.0;
    vec2 ipos = floor(st + vec2(sin(u_time * 0.2) * 3.0 + mousePos.x * 20., mousePos.y * 5.0));  // get the integer coords
    vec2 fpos = fract(st);  // get the fractional coords

    


    
    translate(vec2(mousePos.x - 1.0, mousePos.y - 1.0), matrix);
    pos = matrix * pos;

    if (st.y + mousePos.y * 10.0> 10.0 && st.y + mousePos.y * 10.0 < 11.0){
            vec3 ipos2 = matrix * vec3(ipos.x  , ipos.y, 0.0);
            color += step(0.8, vec3(random( ipos2.xy ))) * 0.3; 
    }

    
    color += bars(pos.xy,0.4, 0.5) * 0.3;
    translate(vec2(0.5,0.5), matrix);
    pos = matrix * pos;


    color += bars2(pos.xy, 0.4, 0.4) * 0.4;
    translate(vec2(-0.2,-0.2), matrix);
    pos = matrix * pos;

    color += barsFlare(pos.xy + vec2(0.0, 0.05), 0.4, 1.2, 1.0) * 0.1;
     translate(vec2(0.2,0.2), matrix);
    pos = matrix * pos;

    color += barsFlare(pos.xy + vec2(0.0, -0.05), 0.3, 1.2, 0.4) * 0.9;

    
    gl_FragColor = vec4( oST.x, oST.y, oST.x ,color.x);
}