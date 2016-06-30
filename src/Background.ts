module Scumbag
{
  /** a nice background that scrolls so as to see the edge of the picture at the
   * edge of the level */
  export class Background
  {
    image:        Phaser.Image;
    width:        number;
    height:       number;
    cameraWidth:  number;
    cameraHeight: number;

    /** yeah just the usual stuff
     * imageKey is the image to use
     * width is the width of the level
     * height is the height of the level
     * game is the game thingo */
    constructor(imageKey:string,width:number,height:number,game:Phaser.Game)
    {
      this.image = game.add.image(0,0,imageKey);
      this.image.sendToBack();

      this.width = width;
      this.height = height;
      this.cameraWidth = game.width;
      this.cameraHeight = game.height;
    }


    /** updates the background's position
     * cameraX is the x position of the camera
     * cameraY is the y position of the camera */
    update(cameraX:number,cameraY:number)
    {
      let x = cameraX / (this.width - this.cameraWidth) *
              (this.width - this.image.width);
      let y = cameraY / (this.height - this.cameraHeight) *
              (this.height - this.image.height);

      if (isFinite(x)) this.image.x = x;
      if (isFinite(y)) this.image.y = y;
    }
  }
}
