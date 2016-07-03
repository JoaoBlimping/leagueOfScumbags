///<reference path="../phaser/phaser.d.ts"/>


module Scumbag
{
  export class Fight extends Phaser.State
  {
    background:       Background            = null;
    music:            Phaser.Sound;
    tilemap:          Phaser.Tilemap;
    collisionLayer:   Phaser.TilemapLayer;
    fighters:         Phaser.Group;
    bullets:          Phaser.Group;
    player:           Fighter;
    healthBar:        Phaser.Image;
    manaBar:          Phaser.Image;


    init(map:string)
    {
      //create the tilemap
      this.tilemap = this.add.tilemap(map);
      this.tilemap.addTilesetImage('combatTiles','combatTiles');
      this.tilemap.createLayer("background");
      this.collisionLayer = this.tilemap.createLayer("collisions");
      this.tilemap.setLayer(this.collisionLayer);
      this.tilemap.setCollisionBetween(0, 6569);
      this.collisionLayer.resizeWorld();
    }


    create()
    {
      //create the background
      if (this.tilemap.properties.hasOwnProperty("background"))
      {
        if (this.tilemap.properties.background != "")
        {
          this.background = new Background(this.tilemap.properties.background,
                                           this.tilemap.width * this.tilemap.tileWidth,
                                           this.tilemap.height * this.tilemap.tileHeight,
                                           this.game);
        }
      }

      //load music if there is some
      if (this.tilemap.properties.hasOwnProperty("music"))
      {
        MusicManager.playSong(this.game,this.tilemap.properties.music);
      }

      //turn on phyysics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);


      //make group for all the bullets
      this.bullets = this.game.add.group();

      //fighters
      this.fighters = this.game.add.group();

      //make the enemies
      let enemies = this.tilemap.objects["enemies"];
      for (let i in enemies)
      {
        let x = enemies[i].x;
        let y = enemies[i].y;
        let type = enemies[i].properties.kind;
        this.fighters.add(createFighterFromEnemy(type,x,y,this.bullets,this.game));
      }

      //add the player and stuff
      let playerRegion = this.tilemap.objects["player"][0];
      let playerX = playerRegion.x;
      let playerY = playerRegion.y;

      this.player = new Fighter(this.game,playerX,playerY,"dude");
      this.player.controller = new Controllers.PlayerController(this.game);
      this.player.weapons[WeaponSlot.Left] = new Weapons.Nuke(this.game,this.bullets);
      this.player.weapons[WeaponSlot.Right] = new Weapons.Minigun(this.game,this.bullets);
      this.player.maxHealth = 20;
      this.player.health = 20;
      this.player.healthRegenRate = 1000;
      this.player.maxMana = 10;
      this.player.mana = 10;
      this.player.manaRegenRate = 500;

      this.fighters.add(this.player);
      this.game.camera.follow(this.player);

      //create the health bar for the plauer and also the mana bar
      this.healthBar = this.game.add.image(0,0,'healthBar');
      this.manaBar = this.game.add.image(0,16,'manaBar');
      this.healthBar.fixedToCamera = true;
      this.manaBar.fixedToCamera = true;
    }


    update()
    {
      //update the background
      if (this.background != null)
      {
        this.background.update(this.camera.x,this.camera.y);
      }

      //check collisions between the fighters and the level
      this.game.physics.arcade.collide(this.fighters,this.collisionLayer);

      //check collisions between bullets and the level
      for (let child of this.bullets.children)
      {
        if (child instanceof Phaser.Group)
        {
          this.game.physics.arcade.collide(child,this.collisionLayer,hitLevel,null,this);
          this.game.physics.arcade.collide(child,this.fighters,hitFighter);
        }
      }

      //make the health bar right
      this.healthBar.scale.x = this.player.health / this.player.maxHealth;
      this.manaBar.scale.x = this.player.mana / this.player.maxMana;
    }


    render()
    {
      //this.game.debug.body(this.player);
    }
  }

  /** this gets called when a bullet hits the level */
  function hitLevel(bullet:Bullet,tile:Phaser.Tile)
  {
    if (bullet.collide)
    {
      bullet.kill();

      if (tile.properties.destructible == 1)
      {
        this.tilemap.removeTile(tile.x,tile.y,this.collisionLayer);
        //tile.layer.dirty = true;
      }
      return false;
    }
    return true;
  }


  /** this gets called when a bullet hits a fighter */
  function hitFighter(bullet:Bullet,fighter:Fighter)
  {
    if (!bullet.collide) return false;
    fighter.damage(bullet.power);
    bullet.kill();
    return true;
  }
}
