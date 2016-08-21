module Scumbag
{
  /** the channels for music */
  export enum MusicChannel
  {
    Music,Ambience,NChannels
  }


  export namespace MusicManager
  {
    let currentSongKey:     string[]        = new Array<string>(MusicChannel.NChannels);
    let currentSong:        Phaser.Sound[]  = new Array<Phaser.Sound>(MusicChannel.NChannels);

    /** play some song unless it's already playing */
    export function playSong(game:Phaser.Game,key:string,channel:MusicChannel):void
    {
      if (currentSongKey[channel] == key) return;
      if (currentSongKey[channel] != null)
      {
        game.sound.removeByKey(currentSongKey[channel]);
      }

      currentSongKey[channel] = key;
      currentSong[channel] = game.add.audio(key,1,true);
      currentSong[channel].play();
    }


    /** stops the currently playing song if there is one */
    export function stopSong(channel:MusicChannel):void
    {
      if (currentSong[channel] != null)
      {
        currentSong[channel].destroy();
        currentSongKey[channel] = null;
      }
    }
  }
}
