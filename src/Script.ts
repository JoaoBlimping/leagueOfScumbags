module Scumbag
{
  let game:Phaser.Game;
  let nextBlock = 0;
  let nextBlockSet = false;
  let blocks:string[] = [];
  let paused = false;


  function storeActor(actor:Actor):void
  {
    StateOfGame.parameters.actors.push({name:actor.name,x:actor.x,y:actor.y});
  }


  function storeActors():void
  {
    let state = game.state.getCurrentState();
    if (state instanceof Overworld)
    {
      StateOfGame.parameters.actors = [];
      state.actors.forEach(storeActor,null);
    }
  }


  /** this is the context in scripts are run */
  namespace ScriptContext
  {
    export let arguments:     string;
    export let value:         number;
    export let state:         GuiState;


    /** lets scripts change the current scene
     * may need to be replaced with like a set level function or something
     * also, I'll need a separate function to start battles, and then go back to
     * the overworld when they are done */
    export function changeState(newState:string,...args):void
    {
      game.state.start(newState,true,false,args);
    }


    export function transport(level:string,playerRegion:string)
    {
      game.state.start("Overworld",true,false,level,playerRegion);
    }


    export function startFight(map:string)
    {
      storeActors();
      paused = true;
      (<Overworld>state).transition(map);
    }


    export function toOverworld()
    {
      game.state.start("Overworld");
    }


    export function setNextBlock(newNextBlock:number):void
    {
      nextBlock = newNextBlock;
      nextBlockSet = true;
    }


    export function setSwitch(key:string,value:boolean):void
    {
      StateOfGame.parameters.switches[key] = value;
    }


    export function getSwitch(key:string):boolean
    {
      if (key in StateOfGame.parameters.switches) return StateOfGame.parameters.switches[key];
      else return false;
    }

    export function setVariable(key:string,value:number):void
    {
      StateOfGame.parameters.variables[key] = value;
    }

    export function getVarirable(key:number):number
    {
      if (key in StateOfGame.parameters.variables) return StateOfGame.parameters.variables[key];
      else return 0;
    }

    export function saveGame()
    {
      storeActors();
      StateOfGame.save();
    }

    export function loadGame(slot:number)
    {
      StateOfGame.load(slot);
    }

    export function addCharacter(character:string)
    {
      StateOfGame.parameters.characters.push(character);
    }

    export function getCharacters() {return StateOfGame.parameters.characters}


    export function setPlayerKey(key:string)
    {
      if (this.state instanceof Overworld) this.state.player.loadTexture(key);
      StateOfGame.parameters.playerKey = key;
    }

    export function playSound(key:string) {game.sound.play(key)}

    export function playMusic(key:string)
    {
      MusicManager.playSong(game,key,MusicChannel.Music);
    }

    export function stopMusic() {MusicManager.stopSong(MusicChannel.Music)}

    export function setSlot(slot:number) {StateOfGame.parameters.slot = slot}

    export function getSlot() {return StateOfGame.parameters.slot}

    export function getScore() {return StateOfGame.parameters.score}

    export function win() {game.state.start("Credits")}
  }


  /** runs game scripts */
  export namespace Script
  {
    export function init(pGame:Phaser.Game)
    {
      game = pGame;
    }

    /** sets the script up to go.
     * content is the key for the script, and then optionally a '?' and then a
     * string that value will be set to for the first block */
    export function setScript(content:string)
    {
      paused = false;
      blocks = content.split('~');
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

    /** check if script execution was paused for a betle */
    export function checkPaused():boolean
    {
      if (paused)
      {
        paused = false;
        return true
      }
      return false;
    }

    export function clearPause():void
    {
      paused = false;
    }
  }
}
