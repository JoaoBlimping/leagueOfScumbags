module Scumbag
{
  const generatorConstructor = Object.getPrototypeOf(function*(){}).constructor;
  let game:Phaser.Game;
  let blocks:Iterator<any>;
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
    export let state:         GuiState;
    export let caller:        Actor;


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
      if (this.state instanceof Overworld)
      {
        this.state.player.getPage().key = key;
        this.state.player.beginPage();
      }
      StateOfGame.parameters.playerKey = key;
    }

    export function playSound(key:string) {game.sound.play(key)}

    export function playAmbience(key:string)
    {
      MusicManager.playSong(game,key,MusicChannel.Ambience);
    }

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
     * content is the key for the script */
    export function setScript(content:string,caller?:Actor)
    {
      paused = false;
      ScriptContext.state = <GuiState>game.state.getCurrentState();
      ScriptContext.caller = caller;
      blocks = generatorConstructor("ctx",game.cache.getText("stdScript") +
                                    content)(ScriptContext);
      runScript(0);
    }

    /** runs the script for one block */
    export function runScript(value:number)
    {
      blocks.next(value);
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
