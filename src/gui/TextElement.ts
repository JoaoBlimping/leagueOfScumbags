///<reference path="GuiElement.ts"/>


module Scumbag
{
  /** used to display text in the gui */
  export class TextElement extends GuiElement
  {
    text:   Phaser.Text;
    content:string;
    timer:  number  = 0;
    cursor: number  = 0;
    game:   Phaser.Game;
    period: number  = 0.01;
    timed:  boolean;


    /** creates a text thingy */
    constructor(game:Phaser.Game,content:string,
                style:{font:string,fill:string},timed:boolean = false)
    {
      super();
      this.game = game;
      this.content = content;
      this.text = game.add.text(0,0,"",style);
      this.text.setShadow(1,1,'rgba(0,0,0,1)',4);
      this.timed = timed;

      if (!this.timed) this.text.text = content;
    }


    /** implements GuiElement.bringToFront */
    bringToFront()
    {
      this.text.bringToTop();
    }


    /** overrides GuiElement.setPosition */
    addPosition(x:number,y:number)
    {
      this.text.x += x;
      this.text.y += y;
    }


    /** overrides GuiElement.setPosition */
    setPosition(x:number,y:number)
    {
      this.text.x = x;
      this.text.y = y;
    }


    /** implements GuiElement.getX() */
    getX() {return this.text.x}


    /** implements GuiElement.getY() */
    getY() {return this.text.y}


    /** implements GuiElement.getWidth */
    getWidth()
    {
      return this.text.width;
    }


    /** implements GuiElement.getHeight */
    getHeight() {return this.text.height}


    /** implements GuiElement.update */
    update()
    {
      if (!this.timed) return 0;

      this.timer += this.game.time.elapsed / 1000;
      while (this.timer > this.period && this.cursor < this.content.length)
      {
        this.text.text += this.content[this.cursor];
        this.cursor++;
        this.timer -= this.period;
        this.game.sound.play("tick");
      }
      return 0;
    }


    /** implements GuiElement.destroy */
    destroy()
    {
      this.text.destroy();
    }
  }
}
