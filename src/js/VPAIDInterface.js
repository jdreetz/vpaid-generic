import Subscribeable from './Subscribeable';
import VPAIDEvents from './VPAIDEvents';
import VideoAd from './VideoAd';

export default class VPAIDInterface extends Subscribeable {
  constructor() {
    super();
    this.expanded = false;
    this.size = { width: 640, height: 360 };
  }

  initAd(width, height, viewMode, desiredBitrate, creativeData = {}, environmentVars = {}) {
    this.size.width = width;
    this.size.height = height;
    this.viewMode = viewMode;
    this.creativeData = { ...creativeData };
    this.environmentVars = { ...environmentVars };

    try {
      const AdParameters = JSON.parse(creativeData.AdParameters);

      if(AdParameters.videoURL) {
        this.ad = new VideoAd(environmentVars.videoSlot, AdParameters.videoURL);
        
        this.ad
          .subscribe(VPAIDEvents.AD_REMAINING_TIME_CHANGE, this.publish)
          .subscribe(VPAIDEvents.AD_VIDEO_FIRST_QUARTILE, this.publish)
          .subscribe(VPAIDEvents.AD_VIDEO_THIRD_QUARTILE, this.publish)
          .subscribe(VPAIDEvents.AD_VIDEO_MIDPOINT, this.publish)
          .subscribe(VPAIDEvents.AD_VIDEO_COMPLETE, this.publish);
      }

    } catch(e) {
      console.log(e);
    } 

    this.publish(VPAIDEvents.AD_LOADED);
    return this;
  }

  startAd() {
    this.publish(VPAIDEvents.AD_IMPRESSION);
    this.publish(VPAIDEvents.AD_STARTED);
    this.publish(VPAIDEvents.AD_VIDEO_START);
    return this;
  }

  skipAd() {
    if(this.ad) {
      this.ad.destroy();
    }

    this.publish(VPAIDEvents.AD_SKIPPED);
    return this;
  }

  stopAd() {
    if(this.ad) {
      this.ad.destroy();
    }

    this.publish(VPAIDEvents.AD_STOPPED);
    return this;
  }

  pauseAd() {
    if(this.ad) {
      this.ad.pause();
    }

    this.publish(VPAIDEvents.AD_PAUSED);
    return this;
  }

  resumeAd() {
    if(this.ad) {
      this.ad.play();
    }

    this.publish(VPAIDEvents.AD_PLAYING);
    return this;
  }

  collapseAd() {
    this.expanded = false;
    this.publish(VPAIDEvents.AD_EXPANDED_CHANGE);
    return this;
  }

  expandAd() {
    this.expanded = true;
    this.publish(VPAIDEvents.AD_EXPANDED_CHANGE);
    return this;
  }

  resizeAd(width, height, viewMode) {
    this.size.width = width;
    this.size.height = height;
    this.viewMode = viewMode;
    this.publish(VPAIDEvents.AD_SIZE_CHANGE);
    return this;
  }

  getAdExpanded() {
    return this.expanded; 
  }

  getAdLinear() {
    return true; 
  }

  getAdDuration() {
    return this.ad ? this.ad.duration : -2;
  }

  getAdRemainingTime() { 
    return this.ad ? this.ad.remaining : -2; 
  }

  getAdSkippableState() {
    return true;
  }

  getAdVolume() {
   return this.ad ? this.ad.volume : 0;
  }

  getAdCompanions() { 
    return '';
  }

  getAdIcons() {
   return false;
  }

  getAdHeight() { 
    return this.size.height;
  }

  getAdWidth() { 
    return this.size.width;
  }

  handshakeVersion() {
    return '2.0';
  }

  setAdVolume(vol) {
    if(this.ad) {
      this.ad.volume = vol;
    }
  }
}