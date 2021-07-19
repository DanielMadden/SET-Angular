import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  constructor() {}

  public playCardSound(
    sound: 'down' | 'flick1' | 'flick2' | 'shuffle' | 'random-pull'
  ) {
    let soundsPreId = 'sound-cards-';
    let sounds = {
      down: <HTMLAudioElement>document.getElementById(soundsPreId + 'down'),
      flick1: <HTMLAudioElement>(
        document.getElementById(soundsPreId + 'flick-1')
      ),
      flick2: <HTMLAudioElement>(
        document.getElementById(soundsPreId + 'flick-2')
      ),
      shuffle: <HTMLAudioElement>(
        document.getElementById(soundsPreId + 'shuffle')
      ),
    };
    if (sound !== 'random-pull') {
      sounds[sound].play();
    } else {
      let randomPullSounds = [sounds.down, sounds.flick1, sounds.flick2];
      randomPullSounds[
        Math.floor(Math.random() * randomPullSounds.length)
      ].play();
    }
  }

  public playFxSound(sound: 'ding' | 'error') {
    let soundsPreId = 'sound-fx-';
    let sounds = {
      ding: <HTMLAudioElement>document.getElementById(soundsPreId + 'ding'),
      error: <HTMLAudioElement>document.getElementById(soundsPreId + 'error'),
    };
    sounds.error.volume = 0.3;
    sounds[sound].play();
  }
}
