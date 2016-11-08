module Scumbag
{
  export interface Region
  {
    x:      number;
    y:      number;
    width:  number;
    height: number;
    script: string;
  }


  export function createRegions(data:any[]):{[name:string]:Region}
  {
    let regions:{[name:string]:Region} = {};
    for (let i = 0;i< data.length;i++)
    {
      let name = data[i].name;
      let x = data[i].x;
      let y = data[i].y;
      let width = data[i].width;
      let height = data[i].height;
      let script = null;
      if (data[i].hasOwnProperty("properties"))
      {
        if (data[i].properties.hasOwnProperty("script"))
        {
          script = data[i].properties.script;
        }
      }
      regions[name] = {x:x,y:y,width:width,height:height,script:script};
    }
    return regions;
  }
};
