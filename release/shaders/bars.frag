#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

const float PI=atan(0.0,-1.0);

uniform float time;
uniform vec2 resolution;

float noise;

void main( void )
{
	vec2 position = ( gl_FragCoord.xy / resolution.xy );

	gl_FragColor = vec4(sin(abs(position.x - position.y) * (tan(sin(cos(time) / 2.0) * 10.0) + 10.0) * 5.0 ),sqrt(floor(sin(time * 5.0)) / 2.0 + 0.5) + sin(position.x * cos(time) * 12.0),sin(tan(pow(time,2.0))),1.0);
}
