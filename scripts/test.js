//block0
this.gui.buildQA("would you like fish?","yes","no");

~

//block1
if (value == 1)
{
  nextBlock = 3;
}

~

//block2
nextBlock = 4;
this.gui.buildTextbox("ok, cool. Enjoy your fish :)");

~

//block3
var selection = Math.random() * 2;
if (selection > 1) this.gui.buildTextbox("you are making me exceedingly angry");
else this.gui.buildTextbox("you are making me moderately angry");
