Saving and Loading
==================
Ok so the game needs to be able to do the following things in regard to saving
and loading.

Things That need to be saved:
-----------------------------
- global switches and variables
- player position
- members of party
- stats of party members:
  - current health
  - level


the variables and switches are easy, and so is player position.
members of party and their state requires a little more thought. But I reckon
I'll just create a little interface thingo that stores the key to a pic of them,
plus their current health and level. other data can just be calculated from
their level, cos we don't want any redundancy in the database do we?
yeah but save it into the fighter objects.
