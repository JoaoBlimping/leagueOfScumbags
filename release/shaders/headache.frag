#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;


void main( void ) {

	vec2 position = ( gl_FragCoord.xy / resolution.xy + tan(time));

	if (mod(position.x,2.0) < 0.25)
	{
		gl_FragColor = vec4(0.0,1.0,0.0,1.0 );
	}

	else if (sin(position.x * 100.0) > 0.0 || cos(position.y * 100.0) > 0.0) gl_FragColor = vec4(sin(time),sin(time) * 0.6,0.0,1.0 );
	else gl_FragColor = vec4(0.0,0.0,1.0,1.0 );
}
