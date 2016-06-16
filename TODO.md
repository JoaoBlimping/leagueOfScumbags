TODO
====

General
----
- bug where the music system can't stop a song once it's repeated.
- on a related note, I really want to have midi music. It will save a lot of
  size which I think is important on internet, and also they are groove fests.
- add a transition thingo which will receive a pic of the previous screen
  somehow and then it will somehow do a groovy transition


Fighting
--------
 - convert to using new input system.
 - make you be able to switch weapons.
 - add sound effects
 - add music
 - add a strafe button, and also like a reverse strafe that lets you stand on
   spot and aim. I think they would work well as left trigger buttons on a
   controller.
 - you seem to be able to walk through walls and all this stuff at the moment,
   probably check the fighter's body.


Overworld
---------
 - add things to make characters move around based on a script and stuff. also
   make it that turning in certain directions and also standing still count as
   movements. I'll do this by making it that movement is an interface, and then
   when it has a wait movement it sets a flag which says it's waiting and also
   sets the time after which it will turn off the flag and go on to the next
   movement. yeah, it works, but I need to make the timing work properly because
   it is weird at the moment I think.
 - fix the way the player interacts with npcs so that you don't have to walking
   into them to talk to them, and it doesn't repeat if you are still walking, or
   they are. make it when you press A, it outputs an invisible thing which
   activates an npc if it hits them.
 - rip off all of rpgmaker's features pretty much
