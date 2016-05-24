//block0
this.state.buildQA("League of Scumbags",
                   null,
                   "New Game",
                   "Load Game",
                   "Quit");
~

//block 1
if (this.value == 1) this.changeState('Overworld');
else
{
  this.setNextBlock(0);
  this.state.buildTextbox("fuck you","you can't do that mate");
}
