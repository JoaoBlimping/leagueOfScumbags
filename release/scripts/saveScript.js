while(true)
{
  ctx.state.buildPause("Paused","Return","Save","Quit");
  var value = yield;

  //return
  if (value == 1) return;

  //save
  if (value == 2)
  {
    ctx.playSound("trogDeath");
    ctx.saveGame();
    ctx.state.buildTextbox("Saving Complete","yeah");
    yield;
  }

  //quit
  else if (value == 3)
  {
    ctx.state.buildQA("are you sure you want to quit?",
                       null,
                       "I do not want to quit",
                       "yeah");
    var selection = yield;
    if (selection == 2) ctx.changeState("MainMenu");
    yield;
  }
}
