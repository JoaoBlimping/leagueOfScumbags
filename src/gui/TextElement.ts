module Scumbag
{
  export class TextElement extends GuiElement
  {
    text:   Phaser.Text;


    /** creates a text thingy */
    constructor(game:Phaser.Game,content:string,
                style:{font:string,fill:string})
    {
      super(false);
      this.text = game.add.text(0,0,content,style);
      this.text.setShadow(1,1,'rgba(0,0,0,0.5)',2);
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


    /** implements GuiElement.getWidth */
    getWidth() {return this.text.width}


    /** implements GuiElement.getHeight */
    getHeight() {return this.text.height}


    /** implements GuiElement.update */
    update() {return 0}
  }
}
