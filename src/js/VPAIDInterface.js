import { Observable, Listenable } from './Behaviors';
import * as VPAIDEvents from './VPAIDEvents';

import SimpleControls from './SimpleControls';
import VideoAd from './VideoAd';

// Implements the required VPAID interface methods and properties as per the VPAID 2.0 specification 
// http://www.iab.net/media/file/VPAID_2.0_Final_04-10-2012.pdf
class VPAIDInterface {
  constructor(params = {}) {
    this.AdCreativeType = params.creativeFormat || VideoAd;
    this.OverlayType = params.overlays || SimpleControls;

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
      // expected AdParameter format
      // videoURL: 'url of the video to play'
      // clickThrough: 'url of location to navigate to on click of slot element'
      const AdParameters = JSON.parse(creativeData.AdParameters);

      this.ad = new this.AdCreativeType(environmentVars.videoSlot, AdParameters.videoURL);
      this.overlays = new this.OverlayType(environmentVars.slot, AdParameters.clickThrough);
        
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
        .subscribe(this.onOverlayEvent.bind(this, VPAIDEvents.AD_CLICK_THRU), VPAIDEvents.AD_CLICK_THRU);

    } catch(e) {
      console.log(e);
    } 

    this.publish(VPAIDEvents.AD_LOADED);
    return this;
  }

  onCreativeEvent(name) {
    this.publish(name);
  }

  onOverlayEvent(name) {
    this.publish(name);
  }

  startAd() {
    this.publish(VPAIDEvents.AD_IMPRESSION);
    this.publish(VPAIDEvents.AD_STARTED);
    this.publish(VPAIDEvents.AD_VIDEO_START);
    this.publish(VPAIDEvents.AD_SKIPPABLE_STATE_CHANGE);
    return this;
  }

  skipAd() {
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
      this.ad.videoEl.pause();
    }

    this.publish(VPAIDEvents.AD_PAUSED);
    return this;
  }

  resumeAd() {
    if(this.ad) {
      this.ad.videoEl.play();
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

VPAIDInterface = Observable(VPAIDInterface);
VPAIDInterface = Listenable(VPAIDInterface);

export default VPAIDInterface;