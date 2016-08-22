///<reference path="GuiState.ts"/>


module Scumbag
{
  const PADDING = 40;


  let headingFont = {font:"50px Serif",fontStyle:"bold",fill:"#00f",stroke:"#f00",strokeThickness:5};
  let bodyFont = {font:"20px Serif",fill:"#ff6",align:"center",wordWrap:true,wordWrapWidth:0};


  function move(a:{x:number,y:number})
  {
    a.y -= 0.6;
  }


  export class Credits extends Phaser.State
  {
    background: Phaser.Sprite;
    items:      Phaser.Group;

    /** overrides Phaser.State.create() */
    create()
    {
      let data = this.game.cache.getJSON("credits");
      console.log(data);

      this.background = this.add.sprite(0,0,data.background);

      //chuck on a sweet beat
      MusicManager.stopSong(MusicChannel.Ambience);
      MusicManager.playSong(this.game,data.music,MusicChannel.Music);

      //set the word wrap width
      bodyFont.wordWrapWidth = this.game.width;

      //make the tings
      this.items = this.game.add.group();
      let y = this.game.height;
      for (let i = 0;i < data.items.length;i++)
      {
        let item:Phaser.Text | Phaser.Image;

        if (data.items[i].type == "text")
        {
          item = this.game.add.text(this.game.width / 2,y,data.items[i].content,bodyFont);
        }

        else if (data.items[i].type == "heading")
        {
          item = this.game.add.text(this.game.width / 2,y,data.items[i].content,headingFont);
          (<Phaser.Text>item).setShadow(0,0,'rgba(0,1,0,1)',5);
        }

        else if (data.items[i].type == "image")
        {
          item = this.game.add.image(this.game.width / 2,y,data.items[i].content);
        }

        item.anchor.setTo(0.5,0);
        this.items.add(item);
        y += item.height + PADDING;
      }

    }


    update()
    {
      this.items.forEach(move,null);
    }
  }
}
