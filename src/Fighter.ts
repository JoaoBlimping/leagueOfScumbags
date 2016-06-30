///<reference path="phaser/phaser.d.ts"/>


module Scumbag
{

  const BASE_GRAVITY = 400;

  export function createFighterFromEnemy(type:string,x:number,y:number,
                                         bulletGroup:Phaser.Group,
                                         game:Phaser.Game):Fighter
  {
    let data = Enemies.getEnemyData(type,game);

    let fighter = new Fighter(game,x,y,data.key);

    fighter.controller = new Controllers[data.controller](game);
    fighter.weapons[WeaponSlot.Left] = new Weapons[data.lWeapon](game,bulletGroup);
    fighter.weapons[WeaponSlot.Right] = new Weapons[data.rWeapon](game,bulletGroup);

    fighter.maxHealth = data.health;
    fighter.health = data.health;
    fighter.healthRegenRate = data.healthRegen;
    fighter.maxMana = data.mana;
    fighter.mana = data.mana;
    fighter.manaRegenRate = data.manaRegen;

    return fighter;
  }


  /** a fighter that will jump about and all that in the battle system */
  export class Fighter extends Phaser.Sprite
  {
    moveSpeed:      number;
    jumpHeight:     number;
    angle:          number;
    controller:     Controller;
    weapons:        Weapon[];

    maxHealth:      number;
    maxMana:        number;
    mana:           number;
    healthRegenRate:number;
    healthRegen:    number  = 0;
    manaRegenRate:  number;
    manaRegen:      number  = 0;
    canFireTime:    number;

    prevTime:       number;


    /** create it just like you would a sprite, at least at the moment.
     * TODO: It will probably need some kind of id so it can build itself from
     * some data file */
    constructor(game:Phaser.Game,x:number,y:number,key:string)
    {
      //run superconstructor
      super(game,x,y,key);

      //turn on physics
      this.game.physics.arcade.enable(this);
      this.body.gravity.y = 400;
      this.body.collideWorldBounds = true;

      //do animation type crap
      this.animations.add('up', [0,1,2], 10, true);
      this.animations.add('upright', [3,4,5], 10, true);
      this.animations.add('right', [6,7,8], 10, true);
      this.animations.add('downright', [9,10,11], 10, true);
      this.animations.add('down', [12,13,14], 10, true);

      //add controller
      this.moveSpeed = 200;
      this.jumpHeight = 400;

      //make weapons array
      this.weapons = [];
      this.weapons.length = WeaponSlot.nWeaponSlots;

      //set health and max health
      this.healthRegen = 0;
      this.manaRegen = 0;

      this.prevTime = this.game.time.time;

      this.anchor.setTo(0.5,0.5);

      //add it to the scene
      game.add.existing(this);
    }


    update()
    {
      //mana and health regen
      let newTime = this.game.time.time;
      let elapsedTime = newTime - this.prevTime;
      this.healthRegen += elapsedTime;
      this.manaRegen += elapsedTime;
      while (this.healthRegen > this.healthRegenRate)
      {
        if (this.health < this.maxHealth) this.health++;
        this.healthRegen -= this.healthRegenRate;
      }
      while (this.manaRegen > this.manaRegenRate)
      {
        if (this.mana < this.maxMana) this.mana++;
        this.manaRegen -= this.manaRegenRate;
      }
      this.prevTime = newTime;


      //control the dude
      this.body.velocity.x = 0;
      this.controller.control(this);

      //play animation if moving and if not don't
      if (this.body.velocity.x != 0)
      {
        let animationAngle = this.angle;

        if (this.body.velocity.x < 0)
        {
          this.scale.x = -1;
          this.body.offset.x = this.width;

          if (animationAngle > 0) animationAngle = (animationAngle - Math.PI) * -1;
          else animationAngle = (animationAngle + Math.PI) * -1;
        }
        else if (this.body.velocity.x > 0)
        {
          this.scale.x = 1;
          this.body.offset.x = 0;
        }

        if (animationAngle > (3 * Math.PI / 8)) this.animations.play('down');
        else if (animationAngle > Math.PI / 8) this.animations.play('downright');
        else if (animationAngle > 0 - Math.PI / 8) this.animations.play('right');
        else if (animationAngle > 0 - (3 * Math.PI / 8)) this.animations.play('upright');
        else this.animations.play('up');
      }
      else
      {
        this.animations.currentAnim.stop();
      }
    }


    move(angle:number)
    {
      this.angle = angle;
      this.body.velocity.x = this.moveSpeed * Math.cos(angle);
    }


    jump()
    {
      if (this.body.blocked.down)
      {
        this.body.velocity.y = 0 - this.jumpHeight;
      }

      if (this.body.blocked.left)
      {
        this.body.velocity.x += this.jumpHeight / 2;
        this.body.velocity.y = 0 - this.jumpHeight;
      }

      if (this.body.blocked.right)
      {
        this.body.velocity.x -= this.jumpHeight / 2;
        this.body.velocity.y = 0 - this.jumpHeight;
      }
    }


    attack(slot:WeaponSlot)
    {
      let currentTime = this.game.time.time;

      if (currentTime < this.canFireTime || this.mana < this.weapons[slot].manaCost) return;
      this.weapons[slot].fire(this);
      this.canFireTime = currentTime + this.weapons[slot].wait;
      this.mana -= this.weapons[slot].manaCost;
    }
  }
}
