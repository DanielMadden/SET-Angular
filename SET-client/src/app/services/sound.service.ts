import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  cardSoundsPreId = 'sound-cards-';
  cardSounds = {
    down: <HTMLAudioElement>(
      document.getElementById(this.cardSoundsPreId + 'down')
    ),
    flick1: <HTMLAudioElement>(
      document.getElementById(this.cardSoundsPreId + 'flick-1')
    ),
    flick2: <HTMLAudioElement>(
      document.getElementById(this.cardSoundsPreId + 'flick-2')
    ),
    shuffle: <HTMLAudioElement>(
      document.getElementById(this.cardSoundsPreId + 'shuffle')
    ),
  };
  fxSoundsPreId = 'sound-fx-';
  fxSounds = {
    ding: <HTMLAudioElement>(
      document.getElementById(this.fxSoundsPreId + 'ding')
    ),
    error: <HTMLAudioElement>(
      document.getElementById(this.fxSoundsPreId + 'error')
    ),
  };

  constructor() {}

  public playCardSound(
    sound: 'down' | 'flick1' | 'flick2' | 'shuffle' | 'random-pull'
  ) {
    if (sound !== 'random-pull') {
      this.cardSounds[sound].play();
    } else {
      let randomPullSounds = [
        this.cardSounds.down,
        this.cardSounds.flick1,
        this.cardSounds.flick2,
      ];
      randomPullSounds[
        Math.floor(Math.random() * randomPullSounds.length)
      ].play();
    }
  }

  public playFxSound(sound: 'ding' | 'error') {
    this.fxSounds.error.volume = 0.3;
    this.fxSounds[sound].play();
  }
}
