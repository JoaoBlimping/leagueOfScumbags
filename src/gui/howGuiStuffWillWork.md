# How Gui Stuff Will Work
Ok, so I'm trying to make a gui system like they have in rpg maker or something.
It's pretty basic really, it just displays a gui box which makes the level stop
happening, then when the user activates something in the gui box, it closes it.
This allows the script to start running again behind the scenes, which then uses
the users inputs to the box to do stuff and maybe open more gui boxes, or not,
I dunno.

This means that I'm really going to have to implement the script system at the
same time I implement the gui. The script system is probably just going to use
those web worker thingies since it kinda needs to be concurrent.


Web workers will probably need to be loaded



Ok, so there is a whole heap of stuff that scripts will need to be able to do,
but unfortunately, I'm pretty sure they aren't allowed to call stuff in the main
thing, so therefore we have two choices, either use eval which is apparantly
the spawn of satan to run code from the script. yeah actually lets just do that,
who gives a fuck?

so we need to execute the code, which ends with a call to some function that
opens a gui thing or whatever. The code must then stop running so that it can
wait for the window to close. When the window closes we can then start the
script at the next point, as well as give it whatever value the gui thing
returned.

so we don't really need web workers anymore since I can't have synchronous
stuff happening even if it's asynchronous to the rest of the program.

What we need is a global script thing belonging to the game state which can then
be informed when a gui window closes or whatever. actually, it will be global
