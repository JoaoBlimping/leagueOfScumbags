module Scumbag
{
  export namespace GuiBuilder
  {
    export function buildWindow(width:number,height:number,bottom:boolean):number
    {
      console.log("building window "+width+","+height+","+bottom);
      return width + height;
    }

    export function buildQA(question:string):number
    {
      console.log("building question "+question);
      return 5;
    }

    export function buildTextbox(text:string):number
    {
      console.log("building textbox "+text);
      return 4;
    }
  }
}
