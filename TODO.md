TODO
====
I need to remember to keep the scope reasonable so that I can actually finish
this game without dying first. Then I can add more features for the sequel.

General
-------
- bug where the music system can't stop a song once it's repeated.

- on a related note, I really want to have midi music. It will save a lot of
  size which I think is important on internet, and also they are groove fests.

- add some kind of macro system to the scipt parser so that I can declare for
  all scripts the values of some enums and stuff which can't be accessed from
  them.

 - control music from script


Fighting
--------
 - convert to using new input system.

 - make you be able to switch weapons.

 - add sound effects

 - add a strafe button, and also like a reverse strafe that lets you stand on
   spot and aim. I think they would work well as left trigger buttons on a
   controller.

 - you seem to be able to walk through walls and all this stuff at the moment,
   probably check the fighter's body.


Overworld
---------
 - give both npc and player actors the ability to be given a set path to follow,
   and add a gui element that waits for them to finish and then return to the
   script. Probably merge npc and player back into a single class.

 - fix the way the player interacts with npcs so that you don't have to walking
   into them to talk to them, and it doesn't repeat if you are still walking, or
   they are. make it when you press A, it outputs an invisible thing which
   activates an npc if it hits them.
