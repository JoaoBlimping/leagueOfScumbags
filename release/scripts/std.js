/** the standard library that all other scripts are appended to before they are
 * run */


/** builds a textbox where name is the speaker's name, chip is the chip graphic,
 * and text is the text in the textbox */
function* say(name,chip,text)
{
 ctx.state.buildTextbox(name,text,chip);
 yield;
}


/** reads out the contents of the book property belonging to the actor denoted
 * by name */
function* read(book,bookName,bookChip)
{
  var content = ctx.state.tilemap.properties[book].split("-");
  for (var i = 0;i < content.length;i++)
  {
    yield* say(bookName,bookChip,content[i].trim());
  }
}


/** makes the game wait for some fellows to move about */
function* wait()
{
 ctx.state.buildWaiter.apply(ctx.state,arguments);
 yield;
}


/** sets a unique switch for this actor that can hopefully not collide with
 * any other switch in the game */
function setSelfSwitch(name,value)
{
  console.log(ctx.state.tilemap.key+"-"+ctx.caller.name+"-"+name);
  ctx.setSwitch(ctx.state.tilemap.key+"-"+ctx.caller.name+"-"+name,value);
}

/** gets a unique switch for this actor that can hopefully not collide with
 * any other switch in the game */
function getSelfSwitch(name)
{

}
