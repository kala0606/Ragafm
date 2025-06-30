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

    // Create more distinct bands of color
    if (x < 0.25) {
        return vec4(mix(c0, c1, x / 0.25), 1.0);
    } else if (x < 0.5) {
        return vec4(mix(c1, c2, (x - 0.25) / 0.25), 1.0);
    } else if (x < 0.75) {
        return vec4(mix(c2, c3, (x - 0.5) / 0.25), 1.0);
    } else {
        // Mix the accent back to the primary color for a looping effect
        return vec4(mix(c3, c2, (x - 0.75) / 0.25), 1.0);
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

// Create a rotation matrix that changes over time
mat2 getRotationMatrix(float time) {
    float angle = time * 0.3; // Slow rotation
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
}

// Create a dynamic transformation matrix that varies over time
mat2 getDynamicMatrix(float time) {
    float angle = time * 0.5 + sin(time * 0.2) * 0.5; // Varying rotation speed
    float c = cos(angle);
    float s = sin(angle);
    float scale = 1.0 + sin(time * 0.15) * 0.1; // Slight scale variation
    return mat2(c * scale, -s * scale, s * scale, c * scale);
}

float fbm( vec2 p )
{
    float f = 0.0;
    
    // Apply time-based rotation to the input coordinates
    mat2 rotMtx = getRotationMatrix(iTime * 0.1);
    p = rotMtx * p;
    
    // Dynamic transformation matrix that changes over time
    mat2 mtx = getDynamicMatrix(iTime * 0.2);
    
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

// Edge detection function
float getEdges(vec2 uv, float scale) {
    float offset = 1.0 / min(iResolution.x, iResolution.y) * 2.0;
    
    // Sample the pattern at the center and surrounding points
    float center = pattern(uv * scale);
    float left = pattern((uv + vec2(-offset, 0.0)) * scale);
    float right = pattern((uv + vec2(offset, 0.0)) * scale);
    float up = pattern((uv + vec2(0.0, -offset)) * scale);
    float down = pattern((uv + vec2(0.0, offset)) * scale);
    
    // Calculate gradients
    float dx = right - left;
    float dy = down - up;
    
    // Calculate edge strength
    float edge = length(vec2(dx, dy));
    
    // Apply threshold and sharpening
    edge = smoothstep(0.01, 0.25, edge);
    edge = pow(edge, 2.0); // Make edges sharper
    
    return edge;
}

void main() {
    // --- Background Pattern ---
    vec2 pattern_uv = vTexCoord;
    pattern_uv.x *= iResolution.x / iResolution.y; // Keep aspect ratio correct
    
    // Add overall rotation to the pattern coordinates
    mat2 globalRotation = getRotationMatrix(iTime * 0.05);
    pattern_uv = globalRotation * (pattern_uv - 0.5) + 0.5;
    
	float shade = pattern(pattern_uv * 3.0);
    vec4 backgroundColor = vec4(colormap(shade).rgb, 1.0);
    
    // Calculate edges
    float edges = getEdges(pattern_uv, 3.0);
    
    // Mix background with white edges
    vec3 finalColor = mix(backgroundColor.rgb, vec3(1.0), edges);

    // The text is now rendered in a separate pass in p5.js,
    // so we only need to output the background color here.
    gl_FragColor = vec4(finalColor, 1.0);
} 