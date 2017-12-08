import { Observable, Listenable } from '../Helpers/Behaviors';
import * as VPAIDEvents from '../Enum/VPAIDEvents';
import BaseCreative from './BaseCreative';

@Observable
@Listenable
export default class VideoAd extends BaseCreative {
  constructor(videoEl, { videoURL }, parentInterface) {
    super();

    if(videoEl && videoURL) {
      this.videoEl = videoEl;
      this.videoURL = videoURL;
      this.registerListener(this.videoEl, 'loadedmetadata', this.onLoadedMetaData, this);
      this.registerListener(this.videoEl, 'timeupdate', this.onTimeUpdate, this);
      this.videoEl.autoplay = true;
      this.videoEl.src = videoURL;
      this.videoEl.play();
      
      this.quartiles_fired = {
        first:    false, 
        midpoint: false, 
        third:    false, 
        complete: false
      };

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

  onLoadedMetaData() {
    this.publish(VPAIDEvents.AD_DURATION_CHANGE);
  }

  onTimeUpdate() {
    if(this.duration !== -2 ) {
      const quartile = this.duration / 4;

      if(this.videoEl.currentTime > quartile && !this.quartiles_fired.first) {
        this.quartiles_fired.first = true;
        this.publish(VPAIDEvents.AD_VIDEO_FIRST_QUARTILE);
      }

      if(this.videoEl.currentTime > this.duration / 2 && !this.quartiles_fired.midpoint) {
        this.quartiles_fired.midpoint = true;
        this.publish(VPAIDEvents.AD_VIDEO_MIDPOINT);
      }

      if(this.videoEl.currentTime > quartile * 3 && !this.quartiles_fired.third) {
        this.quartiles_fired.third = true;
        this.publish(VPAIDEvents.AD_VIDEO_THIRD_QUARTILE);
      }

      if(this.videoEl.currentTime >= this.duration && !this.quartiles_fired.complete) {
        this.quartiles_fired.complete = true;
        this.publish(VPAIDEvents.AD_VIDEO_COMPLETE);
        this.publish(VPAIDEvents.AD_STOPPED);
        return;
      }

      this.publish(VPAIDEvents.AD_REMAINING_TIME_CHANGE);
    }
  }

  destory() {
    if(this.videoEl) {
      this.videoEl.pause();
      this.unregisterAll();
    }
  }
}