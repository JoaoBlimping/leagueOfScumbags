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
