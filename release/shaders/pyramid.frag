#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

const float PI=atan(0.0,-1.0);

uniform float time;
uniform vec2 resolution;

void main( void )
{
	vec2 position = ( gl_FragCoord.xy / resolution.xy );


	float power = sin(position.x * PI) + cos(position.y * 3.0);

	gl_FragColor = vec4(tan(time * 2.0) * power * 0.5,sin(time / 2.0) * 0.4 + 0.2,tan(time) * power,1.0);

}
