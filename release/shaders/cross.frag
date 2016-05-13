#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

#define PI 3.1415927
#define PI2 (PI*2.0)

void main(void)
{
	vec2 position = 200.0 * ((2.0 * gl_FragCoord.xy - resolution) / resolution.x);

	float r = floor(length(position) * 3.);
	float a = (position.y * position.x * floor(time) * tan(time / 2.0));
	float d = r - a + PI2;
	float n = cos(PI2 * float(int(d / PI2)));
	float k = a + n;
	float rand = tan(0.05 * k + atan(time / 2.0) * 30.0 * k * k);

	gl_FragColor.rgba = vec4(atan(rand*vec3(sin(time) * 1.0,rand * 0.5, 1.0) * 2.), 1.);
}
