precision mediump float;

        uniform float     time;
        uniform vec2      resolution;

        void main( void )
	{
            float x = gl_FragCoord.x / resolution.x * 640.;
            float y = gl_FragCoord.y / resolution.y * 480.;

            float mov0 = x+y+sin(time)*10.+cos(x/90.)*70.+time*2.;
            float mov1 = (mov0 / 5. + floor(mov0 / 30.))/ 10. + time * 3.;
            float mov2 = mov1 + sin(mov1)*5. + time*1.0;
            float cl1 = sin(cos(mov1/4. + time)+mov1);
            float c1 = floor(cl1 +mov2)/2.-mov1-mov2+time;
            float c2 = sin(c1+sin(mov0/100.+time)+sin(y/57.+time/50.)+cos((x+y)/200.)*2.);
            float c3 = abs(floor(c2+cos((mov1+mov2+c2) / 10.)+cos((mov2) / 10.)+tan(x/80.)));
            gl_FragColor = vec4( cl1,c2,c3,1.0);
        }
