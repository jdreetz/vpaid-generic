import Subscribeable from './Subscribeable';
import VPAIDEvents from './VPAIDEvents';

export default class VideoAd extends Subscribeable {
  constructor(videoEl, URL) {
    super();
    this.onLoadedMetaData = this.onLoadedMetaData.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.duration = -2;
    this.remaining = -2;

    if(videoEl && URL) {
      this.videoEl = videoEl;
      this.URL = URL;
      this.videoEl.addEventListener('loadedmetadata', this.onLoadedMetaData);
      this.videoEl.addEventListener('timeupdate', this.onTimeUpdate);
      this.videoEl.autoplay = true;
      this.videoEl.src = URL;
      
      this.quartiles_fired = {
        first:    false, 
        midpoint: false, 
        third:    false, 
        complete: false
      };

    } else {
      throw 'VideoAd - Require Params Not Provided';
    }
  }

  onLoadedMetaData() {
    this.duration = this.videoEl && typeof this.videoEl.duration !== 'undefined' ? this.videoEl.duration : -2;
  }

  onTimeUpdate() {
    if(typeof this.duration !== 'undefined') {
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
      }

      this.remaining = this.duration - this.videoEl.currentTime;
      this.publish(VPAIDEvents.AD_REMAINING_TIME_CHANGE);
    }
  }

  destory() {
    if(this.videoEl) {
      this.videoEl.pause();
      this.videoEl.removeEventListener('loadedmetadata', this.onLoadedMetaData);
      this.videoEl.removeEventListener('timeupdate', this.onTimeUpdate);
    }
  }
}