module Scumbag
{
  export namespace Enemies
  {
    export function getEnemyData(type:string,game:Phaser.Game)//TODO: Add type info
    {
      let data = game.cache.getJSON("enemies").enemies;

      for (let i = 0;i < data.length;i++)
      {
        if (data[i].name == type) return data[i];
      }

      return null;
    }
  }
}
