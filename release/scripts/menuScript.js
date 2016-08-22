//block0
this.state.buildQA("League of Scumbags",
                   null,
                   "Play",
                   "Credits",
                   "Delete Saves");
~

//block 1

//new game
if (this.value == 1)
{
  this.win();
  //this.setNextBlock(2)
  //this.state.buildSlot();
}

//go to credits
else if (this.value == 2)
{
  this.setNextBlock(0);
  this.state.buildTextbox("Dany Burton",
                          "Greetings, I am the CREATOR of this nice game\n"+
                          "I hope you enjoy it 8)\n"+
                          "If not, seek help from a mental health professional immeadiately",
                          "dany_normal");
}

//delete game
else if (this.value == 3)
{
  this.setNextBlock(3);
  this.state.buildSlot(true);
}
~

//block 2 - loading / starting game
if (this.value == 4)
{
  this.setNextBlock(0);
  this.state.buildTextbox("Ok","Not loading",null);
  return;
}
this.loadGame(this.value);
if (this.getCharacters().length == 0)
{
  this.addCharacter("John Fogle");
  this.setPlayerKey("fogleActor")
  this.transport("map2","frontHouse1");
  this.setSlot(this.value);
}
this.toOverworld();
~

//block 3 - deleting game
if (this.value == 1)
{
  this.setNextBlock(0);
  this.state.buildTextbox("Ok","Not deleting anything",null);
  return;
}
this.setNextBlock(0);
this.setSlot(this.value - 1);
this.saveGame();
this.state.buildTextbox("Deleted","Slot "+this.getSlot()+" deleted!",null);
