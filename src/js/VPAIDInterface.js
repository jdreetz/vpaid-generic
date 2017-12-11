import { Observable, Listenable } from './Helpers/Behaviors';
import { ValidCreative, ValidOverlay, ValidParser } from './Helpers/Validation';
import * as VPAIDEvents from './Enum/VPAIDEvents';

import { VPAIDMethods, VPAIDProperties } from './VPAID/VPAIDDecorators';
import ClickThroughOverlay from './Overlays/ClickThroughOverlay';
import JSONParser from './Parsers/JSONParser';
import VideoCreative from './Creatives/VideoCreative';

// Implements the required VPAID interface methods and properties as per the VPAID 2.0 specification 
// http://www.iab.net/media/file/VPAID_2.0_Final_04-10-2012.pdf
@Observable
@VPAIDMethods
@VPAIDProperties
export default class VPAIDInterface {
  constructor(params = {}) {
    this.initializeState(params);
    this.attachVPAID(params);
  }

  attachVPAID(params) {
    if(params.window && !params.window.getVPAIDAd) {
      params.window.getVPAIDAd = this.getVPAIDAd.bind(this);
    }
  }

  initializeState(params) {
    this.expanded = false;
    this.skippable = false;
    this.size = {
      width: 640,
      height: 360
    };

    this.selectComponents(params);
  }

  selectComponents(params) {
    this.AdCreative = ValidCreative(params.creativeFormat) ? params.creativeFormat : VideoCreative;
    this.Overlay = ValidOverlay(params.overlays) ? params.overlays : ClickThroughOverlay;
    this.Parser = ValidParser(params.parser) ? params.parser : JSONParser;
  }

  getVPAIDAd() {
    return this;
  }

  onAdParseFail(e) {
    console.log(e);
    this.destroy();
    this.publish(VPAIDEvents.AD_ERROR, `Error parsing AdParameters - ${e.toString()}`);
    this.publish(VPAIDEvents.AD_STOPPED);
  }

  onAdParametersParsed([AdParameters]) {
    this.ad = new this.AdCreative(this.environmentVars.videoSlot, AdParameters, this);
    this.adOverlay = new this.Overlay(this.environmentVars.slot, AdParameters, this);
      
    // Allow Ad and Overlays to publish any of the available standard VPAID events
    Object.values(VPAIDEvents).forEach( EVENT_NAME => {
      this.ad && this.ad.subscribe && this.ad.subscribe(this.onCreativeEvent.bind(this, EVENT_NAME), EVENT_NAME);
      this.adOverlay && this.adOverlay.subscribe && this.adOverlay.subscribe(this.onOverlayEvent.bind(this, EVENT_NAME), EVENT_NAME);
    });

    this.publish(VPAIDEvents.AD_LOADED);
  }

  onCreativeEvent(name) {
    this.publish(name);
  }

  onOverlayEvent(name) {
    this.publish(name);
  }

  destroy() {
    if(this.ad && typeof this.ad.destroy == 'function') {
      this.ad.destroy();
    }

    if(this.adOverlay && typeof this.adOverlay.destroy === 'function') {
      this.adOverlay.destroy();
    }
  }
}