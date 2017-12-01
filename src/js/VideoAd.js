import Subscribeable from './Subscribeable';
import * as VPAIDEvents from './VPAIDEvents';

export default class VideoAd extends Subscribeable {
  constructor(videoEl, sourceURL) {
    super();
    this.onLoadedMetaData = this.onLoadedMetaData.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);

    if(videoEl && sourceURL) {
      this.videoEl = videoEl;
      this.sourceURL = sourceURL;
      this.videoEl.addEventListener('loadedmetadata', this.onLoadedMetaData);
      this.videoEl.addEventListener('timeupdate', this.onTimeUpdate);
      this.videoEl.autoplay = true;
      this.videoEl.src = sourceURL;
      this.videoEl.play();
      
      this.quartiles_fired = {
        first:    false, 
        midpoint: false, 
        third:    false, 
        complete: false
      };

    } else {
      throw 'Fatal Error - videoElement or sourceURL not provided';
    }
  }

  get duration() {
    return this.videoEl.duration > 0 ? this.videoEl.duration : -2;
  }

  get remaining() {
    return this.videoEl.duration ? this.videoEl.currentTime - this.videoEl.duration : -2;
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

  onClickThrough() {
    window.open(this.clickThrough, '_blank');
    this.publish(VPAIDEvents.AD_CLICK_THRU);
  }

  destory() {
    if(this.videoEl) {
      this.videoEl.pause();
      this.videoEl.removeEventListener('click', this.onClickThrough);
      this.videoEl.removeEventListener('loadedmetadata', this.onLoadedMetaData);
      this.videoEl.removeEventListener('timeupdate', this.onTimeUpdate);
    }
  }
}