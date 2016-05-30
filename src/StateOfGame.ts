module Scumbag
{
  export namespace StateOfGame
  {
    export let switches:    {[name:string]:boolean} = {};
    export let variables:   {[name:string]:number}  = {};


    export function save(slot:number):void
    {
      if (typeof(Storage) !== "undefined")
      {
        localStorage.setItem("save"+slot,[switches,variables].toString());
      }
      else
      {
        console.log("I'm afraid saving won't be possible in this browser, but" +
                    " here's what it was going to save:");
        console.log([switches,variables].toString);
      }
    }


    export function load(slot:number):void
    {
      if (typeof(Storage) !== "undefined")
      {
        let data = localStorage.getItem("save"+slot);
        console.log(data);
        //switches = data[0];
        //variables = data[1];
      }
      else
      {
        console.log("I'm afraid loading won't be possible in this browser");
      }
    }
  }
}
