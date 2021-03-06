#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution; 
    vec2 mouse = u_mouse/u_resolution;
    gl_FragColor = vec4(mouse.x, sin(u_time * 2.0), tan(u_time * 1.0), 1.0);
}