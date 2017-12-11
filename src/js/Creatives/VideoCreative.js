import { Observable, Listenable } from '../Helpers/Behaviors';
import * as VPAIDEvents from '../Enum/VPAIDEvents';
import BaseCreative from './BaseCreative';
import TimeUpdateHandler from './TimeUpdateHandler';

@Listenable
export default class VideoCreative extends BaseCreative {
  constructor(videoElement, { videoURL }, parentInterface) {
    super();

    if(videoElement && videoURL) {
      this.initializeState(videoElement, videoURL);
      this.registerEvents(videoElement);
    } else {
      throw 'Fatal Error - videoElement or videoURL not provided';
    }
  }

  get duration() {
    return this.videoEl.duration > 0 ? this.videoEl.duration : -2;
  }

  get remaining() {
    return this.videoEl.duration ? this.videoEl.duration - this.videoEl.currentTime : -2;
  }

  get volume() {
    if(this.videoEl) {
      this.videoEl.volume;
    }
  }

  set volume(v) {
    if(this.videoEl && !isNaN(v)) {
      this.videoEl.volume = v;
    }
  }

  play() {
    if(this.videoEl) {
      this.videoEl.play();
    }
  }

  pause() {
    if(this.videoEl) {
      this.videoEl.pause();
    }
  }

  initializeState(videoElement, videoURL) {
    this.videoEl = videoElement;
    this.videoURL = videoURL;
    this.videoEl.autoplay = true;
    this.videoEl.src = videoURL;
    this.videoEl.play();  
  }

  registerEvents(videoElement) {
    // this.updateHandler = new 
    this.registerListener(videoElement, 'loadedmetadata', this.onLoadedMetaData, this);
    // this.registerListener(videoElement, 'timeupdate', this.onTimeUpdate, this);
    this.registerListener(videoElement, 'ended', this.onEnded, this);
  }

  onLoadedMetaData(event) {
    this.timeUpdateHandler = new TimeUpdateHandler(event.target.duration);
    this.registerListener(event.target, 'timeupdate', this.timeUpdateHandler.onTimeUpdate, this.timeUpdateHandler);
    this.publish(VPAIDEvents.AD_DURATION_CHANGE);
  }

  // onTimeUpdate() {
  //   if(this.duration !== -2 ) {
  //     const quartile = this.duration / 4;

  //     if(this.videoEl.currentTime > quartile && !this.quartiles_fired.first) {
  //       this.quartiles_fired.first = true;
  //       this.publish(VPAIDEvents.AD_VIDEO_FIRST_QUARTILE);
  //     }

  //     if(this.videoEl.currentTime > this.duration / 2 && !this.quartiles_fired.midpoint) {
  //       this.quartiles_fired.midpoint = true;
  //       this.publish(VPAIDEvents.AD_VIDEO_MIDPOINT);
  //     }

  //     if(this.videoEl.currentTime > quartile * 3 && !this.quartiles_fired.third) {
  //       this.quartiles_fired.third = true;
  //       this.publish(VPAIDEvents.AD_VIDEO_THIRD_QUARTILE);
  //     }

  //     if(this.videoEl.currentTime >= this.duration && !this.quartiles_fired.complete) {
  //       this.quartiles_fired.complete = true;
  //       this.publish(VPAIDEvents.AD_VIDEO_COMPLETE);
  //       this.publish(VPAIDEvents.AD_STOPPED);
  //       return;
  //     }

  //     this.publish(VPAIDEvents.AD_REMAINING_TIME_CHANGE);
  //   }
  // }

  onEnded() {
    this.publish(VPAIDEvents.AD_VIDEO_COMPLETE);
    this.publish(VPAIDEvents.AD_STOPPED);
    this.destory();
  }

  destory() {
    if(this.videoEl) {
      this.videoEl.pause();
      this.unregisterAll();
    }
  }
}