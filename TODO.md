TODO
====
I need to remember to keep the scope reasonable so that I can actually finish
this game without dying first. Then I can add more features for the sequel.
On the other hand, it needs to actually have something good about it.
Polishing the combat and making the story and characters not suck is probably
the most important part of that, though.

General
-------
- bug where the music system can't stop a song once it's repeated.

- add some kind of macro system to the scipt parser so that I can declare for
  all scripts the values of some enums and stuff which can't be accessed from
  them. I guess I could make it more advanced, but I probably can't be bothered.

- groovy transition into battles. make it some stupid picture zooms into the
  screen or something.

- script doesn't continue at end of battle. maybe make it that you set what
  script to run if you win the battle and if you lose or something like that.
  normally if you lose it would just go to game over, but maybe not all the time

- make a shell script to build desktop packages

Fighting
--------
- make weapons for purple hat man

- weapons have like no specialised code functionality. I bet I could turn them
  all into a single class and then describe them in a JSON file. Ok, they have
  a little bit, but it's mostly applying randomness which can be done by making
  every number a range instead of a single value. Other than that, there isn't
  much they can do 


Overworld
---------
 - fix the way the player interacts with npcs so that you don't have to walking
   into them to talk to them, and it doesn't repeat if you are still walking, or
   they are. make it when you press A, it outputs an invisible thing which
   activates an npc if it hits them.

- record the position of all actors in the scene when the player saves or goes
  into a battle so that when they load or exit the battle it's the same.

- make it you can open a menu that lets you save and lets you inspect your party
  and that sort of thing.

- make it so scripts can change the player actor's graphics.

- make it so that scripts can play sound effects.
