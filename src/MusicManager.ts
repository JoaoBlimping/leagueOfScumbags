module Scumbag
{
  export namespace MusicManager
  {
    let currentSongKey:   string        = null;
    let currentSong:      Phaser.Sound  = null;


    /** play some song unless it's already playing */
    export function playSong(game:Phaser.Game,key:string):void
    {
      if (currentSongKey == key) return;
      if (currentSongKey != null)
      {
        game.sound.removeByKey(currentSongKey);
      }

      currentSongKey = key;
      currentSong = game.add.audio(key,1,true);
      currentSong.play();
    }


    /** stops the currently playing song if there is one */
    export function stop():void
    {
      if (currentSong != null)
      {
        currentSong.destroy();
        currentSongKey = null;
      }
    }
  }
}
