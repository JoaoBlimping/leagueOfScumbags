module Scumbag
{
  export namespace SaveManager
  {

    export function saveGame(slot:number,data:any):void
    {
      if (typeof(Storage) !== "undefined")
      {
        localStorage.setItem("save"+slot,data);
      }
      else
      {
        console.log("I'm afraid saving won't be possible in this browser, but" +
                    " here's what it was going to save:");
        console.log(data);
      }
    }


    export function loadGame(slot:number):any
    {
      if (typeof(Storage) !== "undefined")
      {
        return localStorage.getItem("save"+slot);
      }
      else
      {
        console.log("I'm afraid loading won't be possible in this browser");
      }
    }
  }
}
