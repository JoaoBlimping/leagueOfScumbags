#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;

void main( void )
{
	vec3 fullness;
	gl_FragColor = vec4(fullness.x,fullness.y,fullness.z,1.0);
}
