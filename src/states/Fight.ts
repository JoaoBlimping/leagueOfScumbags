///<reference path="../phaser/phaser.d.ts"/>


module Scumbag
{

  const MAX_FIGHTERS = 40;
  const NAME_TAG_STYLE = {font:"16px Serif",fontStyle:"bold",fill:"#fff",
                          backgroundColor:"#f00"};


  export class Fight extends Phaser.State
  {
    background:       Background            = null;
    music:            Phaser.Sound;
    tilemap:          Phaser.Tilemap;
    collisionLayer:   Phaser.TilemapLayer;
    fighters:         Phaser.Group;
    bullets:          Phaser.Group;
    player:           Fighter;
    nameTag:          Phaser.Text;
    healthBar:        Phaser.Image;
    manaBar:          Phaser.Image;
    playerX:          number;
    playerY:          number;
    playerDeaths:     number;


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
        let x = enemies[i].x + enemies[i].width / 2;
        let y = enemies[i].y + enemies[i].height / 2;
        let type = enemies[i].properties.kind;
        this.fighters.add(createFighterFromEnemy(type,x,y,this.bullets,this.game));
      }

      //create the health bar for the plauer and also the mana bar
      this.healthBar = this.game.add.image(0,0,'healthBar');
      this.manaBar = this.game.add.image(0,this.healthBar.height,'manaBar');
      this.nameTag = this.game.add.text(0,this.healthBar.height + this.manaBar.height,"",NAME_TAG_STYLE);
      this.nameTag.fixedToCamera = true;
      this.healthBar.fixedToCamera = true;
      this.manaBar.fixedToCamera = true;

      //add the player and stuff
      let playerRegion = this.tilemap.objects["player"][0];
      this.playerX = playerRegion.x + playerRegion.width / 2;
      this.playerY = playerRegion.y + playerRegion.height / 2;
      this.playerDeaths = 0;

      this.addPlayer();
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

      //check collisions between bullets and the level and also fighters
      for (let child of this.bullets.children)
      {
        if (child instanceof Weapon)
        {
          this.game.physics.arcade.collide(child,this.collisionLayer,hitLevel,null,this);

          for (let fighter of this.fighters.children)
          {
            if (fighter instanceof Fighter)
            {
              if (fighter != child.master)
              {
                this.game.physics.arcade.collide(fighter,child,hitFighter);
              }
              else
              {
                this.game.physics.arcade.collide(fighter,child,hitMaster);
              }
            }
          }
        }
      }

      //check collisions between enemies and the player
      this.game.physics.arcade.collide(this.fighters,this.player,hitPlayer);

      //make the health bar right
      this.healthBar.scale.x = this.player.health / this.player.maxHealth;
      this.manaBar.scale.x = this.player.mana / this.player.maxMana;


      //if the player is dead get a new player
      if (!this.player.alive) this.addPlayer();

      //if all fighters except the player are dead we leave the fight
      for (let fighter of this.fighters.children)
      {
        if (fighter instanceof Fighter)
        {
          if (!fighter.alive)
          {
            fighter.destroy();
            this.fighters.remove(fighter);
          }
          if (fighter != this.player) return;
        }
      }
      this.game.state.start("Overworld");
    }


    render()
    {
      //this.game.debug.body(this.player);
    }


    addFighter(type:string,x:number,y:number)
    {
      if (this.fighters.length >= MAX_FIGHTERS) return;
      this.fighters.add(createFighterFromEnemy(type,x,y,this.bullets,this.game));
    }

    /** used to add the player's next character into the battle */
    addPlayer()
    {
      if (this.player != null) this.player.destroy();

      if (this.playerDeaths == StateOfGame.parameters.characters.length)
      {
        this.game.state.start('Gameover');
        return;
      }

      let character = StateOfGame.parameters.characters[this.playerDeaths];
      this.nameTag.text = character;
      this.player = createFighterFromEnemy(character,this.playerX,this.playerY,
                                           this.bullets,this.game);

      this.game.camera.follow(this.player);
      this.fighters.add(this.player);

      this.playerDeaths++;
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
  function hitFighter(fighter:Fighter,bullet:Bullet)
  {
    if (!bullet.collide) return false;
    fighter.damage(bullet.power);
    bullet.kill();
    return true;
  }


  /** this gets called when a bullet hits a fighter */
  function hitMaster(fighter:Fighter,bullet:Bullet)
  {
    if (bullet.collide) bullet.kill();
    return true;
  }


  /** gets called when a fighter collides with the player */
  function hitPlayer(player:Fighter,enemy:Fighter)
  {
    if (player == enemy) return;
    player.damage(enemy.collisionDamage);
  }
}
