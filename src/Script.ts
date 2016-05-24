module Scumbag
{
  let game:Phaser.Game;
  let nextBlock = 0;
  let nextBlockSet = false;


  /** this is the context in scripts are run */
  namespace ScriptContext
  {
    export let value:         number;
    export let state:         GuiState;


    /** lets scripts change the current scene
     * may need to be replaced with like a set level function or something
     * also, I'll need a separate function to start battles, and then go back to
     * the overworld when they are done */
    export function changeState(newState:string):void
    {
      game.state.start(newState, true, false);
    }


    export function setNextBlock(newNextBlock:number):void
    {
      nextBlock = newNextBlock;
      nextBlockSet = true;
    }
  }


  /** runs game scripts */
  export namespace Script
  {
    let blocks:     string[];

    export function init(pGame:Phaser.Game)
    {
      game = pGame;
    }

    /** sets the script up to go.
     * key is a key to a preloaded text file */
    export function setScript(key:string)
    {
      blocks = game.cache.getText(key).split('\n');
      ScriptContext.state = <GuiState>game.state.getCurrentState();
      nextBlock = 0;
      runScript(0);
    }

    /** runs the script for one block */
    export function runScript(value:number)
    {
      ScriptContext.value = value;
      let effect = new Function(blocks[nextBlock]);
      effect.call(ScriptContext);
      if (!nextBlockSet) nextBlock++;
      else nextBlockSet = false;
    }
  }
}
