//block 0
this.state.buildPause("Paused","Return","Save","Quit");
~

//block 1
//cancel
if (this.value == 1)
{
  this.setNextBlock(69);
}

//save
else if (this.value == 2)
{
  this.playSound("trogDeath");
  this.saveGame();
  this.setNextBlock(0);
  this.state.buildTextbox("Saving Complete","yeah");
}

//quit
else if (this.value == 3)
{
  this.state.buildQA("are you sure you want to quit?",
                     null,
                     "I do not want to quit",
                     "yeah");
}
~

//block2
if (this.value == 1)
{
  this.setNextBlock(0);
  this.state.buildTextbox("Ok","cool");
}

else
{
  this.changeState("Overworld");
}
