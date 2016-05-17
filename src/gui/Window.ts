module Scumbag
{

  /** a window that will hold other stuff in it */
  export class Window extends GuiElement
  {
    children:     GuiElement[];
    image:        Phaser.Image;

    /** creates the window, using the game thing to set up the size, and it's
     * renderer, and also a list of it's children */
    constructor(game:Phaser.Game,key:string,children:GuiElement[])
    {
      super(game.width,game.height / 4,true);
      this.children = children;

      this.image = game.add.image(0,game.height - game.height / 4,key);
      this.image.width = game.width;
      this.image.height = game.height / 4;
    }


    /** implements GuiElement.update */
    update()
    {
      for (let i = 0;i < this.children.length;i++)
      {
        let value = this.children[i].update();
        if (value != 0) return value;
      }
      return 0;
    }
  }
}
