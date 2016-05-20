//block0
this.state.buildQA("would you like fish?","I would rather kill myself",
                   "there is no such thing as ethical consumption under capitalism",
                   "sex",
                   "fish is a great source of nutrients I would know since I am a fish hahaha!");

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
