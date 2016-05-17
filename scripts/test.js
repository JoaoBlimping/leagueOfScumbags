//block0
this.state.buildQA("would you like fish?","yes","no");

~

//block1
//if they said no to the faish
if (value == 2)
{
  var selection = Math.random() * 2;
  if (selection > 1) this.state.buildTextbox("you are making me exceedingly angry");
  else this.state.buildTextbox("you are making me moderately angry");
}

//if they said yes to fish
else
{
  this.state.buildTextbox("ok, cool. Enjoy your fish :)");
}
