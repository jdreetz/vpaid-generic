import { Observable, Listenable } from './Behaviors';
import * as VPAIDEvents from './VPAIDEvents';

import SimpleControls from './SimpleControls';
import JSONParser from './JSONParser';
import VideoAd from './VideoAd';

// Implements the required VPAID interface methods and properties as per the VPAID 2.0 specification 
// http://www.iab.net/media/file/VPAID_2.0_Final_04-10-2012.pdf
class VPAIDInterface {
  constructor(params = {}) {
    this.AdCreativeType = params.creativeFormat || VideoAd;
    this.OverlayType = params.overlays || SimpleControls;
    this.Parser = params.parser || JSONParser;

    this.expanded = false;
    this.size = { width: 640, height: 360 };

    if(params.window) {
      params.window.getVPAIDAd = () => this;
    }
  }

  initAd(width, height, viewMode, desiredBitrate, creativeData = {}, environmentVars = {}) {
    this.size.width = width;
    this.size.height = height;
    this.viewMode = viewMode;
    this.creativeData = { ...creativeData };
    this.environmentVars = { ...environmentVars };

    try {
      const AdParameters = this.Parser.parseAdParameters(creativeData.AdParameters);
      this.ad = new this.AdCreativeType(environmentVars.videoSlot, AdParameters, this);
      this.overlays = new this.OverlayType(environmentVars.slot, AdParameters, this);
        
      // Allow Ad and Overlays to publish any of the available standard VPAID events
      Object.values(VPAIDEvents).forEach( EVENT_NAME => {
        this.ad.subscribe(this.onCreativeEvent.bind(this, EVENT_NAME), EVENT_NAME);
        this.overlays.subscribe(this.onOverlayEvent.bind(this, EVENT_NAME), EVENT_NAME);
      });

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
    this.overlays.setSize(width, height);
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