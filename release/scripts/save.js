while(true)
{
  ctx.state.buildPause("Paused","Return","Quit");
  var value = yield;

  //return
  if (value == 1) return;

  //quit
  else if (value == 2)
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
