import Subscribeable from './Subscribeable';
import * as VPAIDEvents from './VPAIDEvents';

import SimpleControls from './SimpleControls';
import VideoAd from './VideoAd';

export default class VPAIDInterface extends Subscribeable {
  constructor({ creativeFormat = VideoAd, overlays = SimpleControls }) {
    super();
    this.AdCreativeType = creativeFormat;
    this.OverlayType = overlays;
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

      this.ad = new this.AdCreativeType(environmentVars.videoSlot, AdParameters.videoURL);
      this.overlays = new this.OverlayType(environmentVars.slot, AdParameters.clickThrough);
        
      // Pass VPAID events from creative to host player
      this.ad
        .subscribe(this.onCreativeEvent.bind(this, VPAIDEvents.AD_REMAINING_TIME_CHANGE), VPAIDEvents.AD_REMAINING_TIME_CHANGE)
        .subscribe(this.onCreativeEvent.bind(this, VPAIDEvents.AD_VIDEO_FIRST_QUARTILE), VPAIDEvents.AD_VIDEO_FIRST_QUARTILE)
        .subscribe(this.onCreativeEvent.bind(this, VPAIDEvents.AD_VIDEO_THIRD_QUARTILE), VPAIDEvents.AD_VIDEO_THIRD_QUARTILE)
        .subscribe(this.onCreativeEvent.bind(this, VPAIDEvents.AD_DURATION_CHANGE), VPAIDEvents.AD_DURATION_CHANGE)
        .subscribe(this.onCreativeEvent.bind(this, VPAIDEvents.AD_VIDEO_MIDPOINT), VPAIDEvents.AD_VIDEO_MIDPOINT)
        .subscribe(this.onCreativeEvent.bind(this, VPAIDEvents.AD_VIDEO_COMPLETE), VPAIDEvents.AD_VIDEO_COMPLETE)
        .subscribe(this.onCreativeEvent.bind(this, VPAIDEvents.AD_CLICK_THRU), VPAIDEvents.AD_CLICK_THRU)
        .subscribe(this.onCreativeEvent.bind(this, VPAIDEvents.AD_STOPPED), VPAIDEvents.AD_STOPPED);
      this.overlays
        .subscribe(this.onOverlayEvent.bind(this, VPAIDEvents.AD_CLICK_THRU), VPAIDEvents.AD_CLICK_THRU)
        .subscribe(this.onOverlayEvent.bind(this, VPAIDEvents.AD_PLAYING), VPAIDEvents.AD_PLAYING)
        .subscribe(this.onOverlayEvent.bind(this, VPAIDEvents.AD_PAUSED), VPAIDEvents.AD_PAUSED);

    } catch(e) {
      console.log(e);
    } 

    this.publish(VPAIDEvents.AD_LOADED);
    return this;
  }

  onCreativeEvent(name) {
    console.log('onCreativeEvent', name);
    this.publish(name);
  }

  onOverlayEvent(name) {
    console.log('onOverlayEvent', name);
    this.publish(name);
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