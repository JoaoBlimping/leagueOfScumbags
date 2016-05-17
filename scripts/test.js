//block0
this.gui.buildQA("would you like fish?","yes","no");

~

//block1
//if they said no to the faish
if (value == 2)
{
  var selection = Math.random() * 2;
  if (selection > 1) this.gui.buildTextbox("you are making me exceedingly angry");
  else this.gui.buildTextbox("you are making me moderately angry");
}

//if they said yes to fish
else
{
  this.gui.buildTextbox("ok, cool. Enjoy your fish :)");
}
