module Scumbag
{
  export namespace StateOfGame
  {
    export let parameters =
    {
      switches:   {},
      variables:  {},
      characters: [],
      map:        "",
      playerX:    0,
      playerY:    0
    }


    export function save(slot:number):void
    {
      let data = JSON.stringify(parameters);
      if (typeof(Storage) !== "undefined")
      {
        localStorage.setItem("save"+slot,data);
        console.log(data);
        console.log(parameters.switches);
      }
      else
      {
        console.log("I'm afraid saving won't be possible in this browser, but" +
                    " here's what it was going to save:");
        console.log(data);
      }
    }


    export function load(slot:number):void
    {
      if (typeof(Storage) !== "undefined")
      {
        parameters = JSON.parse(localStorage.getItem("save"+slot));
      }
      else
      {
        console.log("I'm afraid loading won't be possible in this browser");
      }
    }
  }
}
