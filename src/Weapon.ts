module Scumbag
{
  let num = 0;

  /** gets data for a specific weapon */
  function getWeaponData(type:string,game:Phaser.Game)//TODO: Add type info
  {
    let data = game.cache.getJSON("weapons").weapons;
    for (let i = 0;i < data.length;i++)
    {
      if (data[i].name == type) return data[i];
    }
    return null;
  }


  /** gives you a random number in a range */
  function inRange(min:number,max:number):number
  {
    return Math.random() * (max - min) + min;
  }

  /** a thing that shoots out bullets of some description */
  export class Weapon extends Phaser.Group
  {
    master:   Fighter;
    speed:    number[];
    gx:       number[];
    gy:       number[];
    lifespan: number[];
    wait:     number;
    manaCost: number;
    accuracy: number;
    cluster:  number;
    sound:    string;


    constructor(game:Phaser.Game,parent:Phaser.Group,master:Fighter,type:string)
    {
      super(game,parent,'G'+(num++),false,true,Phaser.Physics.ARCADE);

      this.master = master;

      let data = getWeaponData(type,game);

      this.speed = data.speed;
      this.gx = data.gx;
      this.gy = data.gy;
      this.lifespan = data.lifespan;
      this.wait = data.wait;
      this.manaCost = data.manaCost;
      this.accuracy = data.accuracy;
      this.sound = data.sound;
      this.cluster = data.cluster;

      //create the sub weapon thing
      let subMaster = null;
      let deathWeapon = null;
      if (data.passOnMaster) subMaster = master;
      if (data.deathWeapon != null)
      {
        deathWeapon = new Weapon(game,parent,subMaster,data.deathWeapon);
      }

      //create the bullet pool
      for (let i = 0;i < data.nBullets;i++)
      {
        this.add(new Bullet(game,data.key,deathWeapon,data.deathSpawn),true);
      }

      //set all thingies
      for (let i = 0;i < data.setAll.length;i++)
      {
        this.setAll(data.setAll[i][0],data.setAll[i][1]);
      }
    }

    /** fire bullets */
    fire(source:Phaser.Sprite):void
    {
      for (let i = 0;i < this.cluster;i++)
      {
        let bullet = this.getFirstExists(false);
        if (bullet != null)
        {
          let angle = source.angle + (Math.random() * Math.PI * 2 - Math.PI) * this.accuracy;
          let speed = inRange(this.speed[0],this.speed[1]);
          let gx = inRange(this.gx[0],this.gx[1]);
          let gy = inRange(this.gy[0],this.gy[1]);
          let lifespan = inRange(this.lifespan[0],this.lifespan[1]);
          bullet.fire(source.x,source.y,angle,speed,gx,gy,lifespan);
        }
      }
    }
  }
}
