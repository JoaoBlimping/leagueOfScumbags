//block 0
this.state.buildTextbox("Aini",
                        "gday friends!\nI've got some fish out the back",
                        "aini_normal");
~


//block1
this.state.buildQA("would you like fish?",
                   "aini_normal",
                   "I would rather kill myself",
                   "yeah");
~

//block2
//if they said no to the fish
if (this.value == 1)
{
  this.setNextBlock(3);
  var selection = Math.random() * 2;
  if (selection > 1) this.state.buildTextbox("Aini","cunt","aini_angry");
  else this.state.buildTextbox("Aini","you fiend","aini_angry");
}

//if they said yes to fish
else
{
  this.setNextBlock(69);
  var selection = Math.random() * 2;
  if (selection > 1) this.state.buildTextbox("Aini","that's so great","aini_normal");
  else this.state.buildTextbox("Aini","That is so wonderful :)","aini_normal");
}
~

//block 3
this.startFight("map1");
~

//block4
this.state.buildTextbox("Aini","that wasn't very nice","aini_angry");
