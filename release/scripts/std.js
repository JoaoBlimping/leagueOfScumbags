/** the standard library that all other scripts are appended to before they are
 * run */


/** builds a textbox where name is the speaker's name, chip is the chip graphic,
 * and text is the text in the textbox */
function* say(name,chip,text)
{
 ctx.state.buildTextbox(name,text,chip);
 yield;
}


/** makes the game wait for some fellows to move about */
function* wait()
{
 ctx.state.buildWaiter.apply(ctx.state,arguments);
 yield;
}


/** gets you the value of a switch */
function switch(key)
{
  return ctx.getSwitch(key);
}


/** turns a switch on */
function switchOn(key)
{
  ctx.setSwitch(key) = true;

}
