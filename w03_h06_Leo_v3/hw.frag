#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359


float easeInOutQuint(float t, float b, float c, float d) {
    t /= d/2.0;
    if (t < 1.0) return c/2.0*t*t*t*t*t + b;
    t -= 2.0;
    return c/2.0*(t*t*t*t*t + 2.0) + b;
}

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}
        
vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 color = vec3(0.0);
    vec3 pct = vec3(st.y);
    vec3 colorWhite = rgbNormalizer(vec3(141.0, 122.0, 79.0));
    vec3 colorBlue = rgbNormalizer(vec3(200.0, 100.0, 100.0));
    float cosT = abs(cos(u_time * 0.1 ));
    float sinT = abs(sin(u_time * 0.1 ));

	float bg =  (sin(st.y*PI)* 0.05 + 0.95) * 0.6;
	color = mix(color,rgbNormalizer(vec3(115.0,58.0,38.0)), bg);

	float glich = smoothstep(0.0, 1.2, sin(st.y*PI)* 0.02 + sin(st.y* PI* 9.0 * cosT) * 0.4) * sinT;
	color = mix(color,rgbNormalizer(vec3(242.0,88.0,53.0)), glich);

	float glich2 = sin(st.y*PI* 4.0 + cosT * 0.2) * cosT;
	color = mix(color,rgbNormalizer(vec3(82.0,41.0,27.0)), glich2);


	float frameH = smoothstep(0.7, 1.0,sin((st.y+0.25)*PI * 2.0)) * cosT ;
	vec3 colorH = mix(color,rgbNormalizer(vec3(20.0,20.0,85.0)), frameH);
    color += colorH;

    float frameV = smoothstep(0.8, 1.0,sin((st.x+0.25)*PI * 2.0)) * cosT;
	vec3 colorV = mix(color,rgbNormalizer(vec3(20.0,20.0,85.0)), frameV);
    color += colorV;

    

    gl_FragColor = vec4(color,1.0);
}