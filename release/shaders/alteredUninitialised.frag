#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main( void )
{
	vec3 color;
	gl_FragColor = vec4(color.x * sin(time),color.y * cos(time),color.z * tan(time), 1.0 );

}
