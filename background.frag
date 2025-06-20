precision highp float;

varying vec2 vTexCoord;

// Uniforms from sketch.js
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 u_color_background;
uniform vec3 u_color_primary;
uniform vec3 u_color_secondary;
uniform vec3 u_color_accent;
uniform sampler2D u_text_texture;

// Custom colormap using the raga's color scheme to create a gradient
vec4 colormap(float x) {
    vec3 c0 = u_color_background;
    vec3 c1 = u_color_secondary;
    vec3 c2 = u_color_primary;
    vec3 c3 = u_color_accent;

    x = clamp(x, 0.0, 1.0);

    if (x < 0.33) {
        return vec4(mix(c0, c1, x / 0.33), 1.0);
    } else if (x < 0.66) {
        return vec4(mix(c1, c2, (x - 0.33) / 0.33), 1.0);
    } else {
        return vec4(mix(c2, c3, (x - 0.66) / 0.34), 1.0);
    }
}

// Noise functions from the provided shader
float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float fbm( vec2 p )
{
    float f = 0.0;
    f += 0.500000*noise( p + iTime ); p = mtx*p*2.02;
    f += 0.031250*noise( p ); p = mtx*p*2.01;
    f += 0.250000*noise( p ); p = mtx*p*2.03;
    f += 0.125000*noise( p ); p = mtx*p*2.01;
    f += 0.062500*noise( p ); p = mtx*p*2.04;
    f += 0.015625*noise( p + sin(iTime) );
    return f/0.96875;
}

float pattern( in vec2 p )
{
	return fbm( p + fbm( p + fbm( p ) ) );
}

void main() {
    // --- Background Pattern ---
    vec2 pattern_uv = vTexCoord;
    pattern_uv.x *= iResolution.x / iResolution.y; // Keep aspect ratio correct
	float shade = pattern(pattern_uv * 3.0);
    vec4 backgroundColor = vec4(colormap(shade).rgb, 1.0);

    // --- Foreground Text ---
    // Use the geometry's texture coordinates for the text as well
    vec2 text_uv = vTexCoord;
    // p5.js graphics buffers are often flipped vertically when used as textures in WebGL
    text_uv.y = 1.0 - text_uv.y;
    vec4 foregroundColor = texture2D(u_text_texture, text_uv);

    // --- Composite ---
    // Use the alpha channel of the foreground text to blend it with the background
    gl_FragColor = mix(backgroundColor, foregroundColor, foregroundColor.a);
} 