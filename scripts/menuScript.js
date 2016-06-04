//block0
this.state.buildQA("League of Scumbags",
                   null,
                   "New Game",
                   "Load Game",
                   "Quit");
~

//block 1

//new game
if (this.value == 1)
{
  this.transport('map2','frontHouse1');
}

//load game
else if (this.value == 2)
{
  this.setNextBlock(2);
  this.state.buildQA("Game Slot to Load",
                     null,
                     "Slot 1",
                     "Slot 2",
                     "Slot 3");
}

//shit
else
{
  this.setNextBlock(0);
  this.state.buildTextbox("fuck you","you can't do that mate");
}
~


//block 2
this.loadGame(this.value);
this.toOverworld();
