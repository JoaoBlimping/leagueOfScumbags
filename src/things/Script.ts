module Scumbag
{

  /** wraps around web workers so that they can be synchronously loaded at the
   * start of the game. plus it just does all the scripty stuff */
  export class Script
  {
    worker:   Worker;


    /** sets the script up to go.
     * key is a key to a preloaded text file */
    constructor(game:Phaser.Game,key:string)
    {
      let data = new Blob([game.cache.getText(key)]);
      this.worker = new Worker(window.URL.createObjectURL(data));
    }


    /** runs the script and then returns it's output */
    run():number
    {
      this.worker.postMessage(0);
      return 0;
    }

  }
}
