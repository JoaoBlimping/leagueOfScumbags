//block 0
this.state.buildTextbox("Purple Hat Man",
                        "gday friends!\nI've got some fish out the back",
                        "phm_normal");
~


//block1
this.state.buildQA("would you like fish?",
                   "phm_normal",
                   "I would rather kill myself",
                   "yeah");
~

//block2
//if they said no to the fish
if (this.value == 1)
{
  var selection = Math.random() * 2;
  if (selection > 1) this.state.buildTextbox("Purple Hat Man","cunt","phm_angry");
  else this.state.buildTextbox("Purple Hat Man","you fiend","phm_angry");
}

//if they said yes to fish
else
{
  var selection = Math.random() * 2;
  if (selection > 1) this.state.buildTextbox("Purple Hat Man","that's so great","phm_normal");
  else this.state.buildTextbox("Purple Hat Man","That is so wonderful :)","phm_normal");
}
