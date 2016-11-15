module Scumbag
{
  export module StateOfGame
  {
    /** structure of a saved game's parameteres */
    export interface StateParameters
    {
      slot:       number;
      switches:   {[name:string]:boolean};
      variables:  {[name:string]:number};
      characters: string[];
      map:        string;
      playerKey:  string;
      actors:     {name:string,x:number,y:number}[];
      score:      number;
      time:       number;
    }


    /** the game's persistent state */
    export let parameters:StateOfGame.StateParameters;



    export function flush()
    {
      parameters =
      {
        slot:       0,
        switches:   {},
        variables:  {},
        characters: [],
        map:        "",
        playerKey:  "",
        actors:     new Array<{name:string,x:number,y:number}>(),
        score:      0,
        time:       0
      };

    }

    let timerFunction = 0;

    export function startTimer():void
    {
      timerFunction = setInterval(function(){parameters.time++;parameters.score -= 0.135},1000);
    }


    export function stopTimer():void
    {
      clearInterval(timerFunction);
    }


    /** save the data to the given slot */
    export function save():void
    {
      let data = JSON.stringify(parameters);
      if (typeof(Storage) !== "undefined")
      {
        localStorage.setItem("save"+parameters.slot,data);
      }
      else
      {
        console.log("I'm afraid saving won't be possible in this browser, but" +
                    " here's what it was going to save:");
        console.log(data);
      }
    }


    /** load the data from the given slot */
    export function load(slot:number):void
    {
      if (typeof(Storage) !== "undefined")
      {
        let data = localStorage.getItem("save"+slot);
        if (data != null) parameters = JSON.parse(data);
        else
        {
          console.log("oing the other way")
          flush();
          parameters.slot = slot;
        }
      }
      else
      {
        console.log("I'm afraid loading won't be possible in this browser");
      }
      parameters.slot = slot;
    }
  }

};
