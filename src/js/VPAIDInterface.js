import { Observable, Listenable } from './Helpers/Behaviors';
import { ValidCreative, ValidOverlay, ValidParser } from './Helpers/Validation';
import * as VPAIDEvents from './Enum/VPAIDEvents';

import { VPAIDMethods, VPAIDProperties } from './VPAID/VPAIDDecorators';
import SimpleControls from './Overlays/SimpleControls';
import JSONParser from './Parsers/JSONParser';
import VideoAd from './Creatives/VideoAd';

// Implements the required VPAID interface methods and properties as per the VPAID 2.0 specification 
// http://www.iab.net/media/file/VPAID_2.0_Final_04-10-2012.pdf
@Observable
@VPAIDMethods
@VPAIDProperties
export default class VPAIDInterface {
  constructor(params = {}) {
    this.AdCreativeType = ValidCreative(params.creativeFormat) ? params.creativeFormat : VideoAd;
    this.OverlayType = ValidOverlay(params.overlays) ? params.overlays : SimpleControls;
    this.Parser = ValidParser(params.parser) ? params.parser : JSONParser;

    this.expanded = false;
    this.skippable = false;
    this.size = { width: 640, height: 360 };

    if(params.window) {
      params.window.getVPAIDAd = () => this;
    }
  }

  onAdParseFail(e) {
    console.log(e);
    this.destroy();
    this.publish(VPAIDEvents.AD_ERROR, `Error parsing AdParameters - ${e.toString()}`);
    this.publish(VPAIDEvents.AD_STOPPED);
  }

  onAdParametersParsed([AdParameters]) {
    this.ad = new this.AdCreativeType(this.environmentVars.videoSlot, AdParameters, this);
    this.overlays = new this.OverlayType(this.environmentVars.slot, AdParameters, this);
      
    // Allow Ad and Overlays to publish any of the available standard VPAID events
    Object.values(VPAIDEvents).forEach( EVENT_NAME => {
      this.ad && this.ad.subscribe && this.ad.subscribe(this.onCreativeEvent.bind(this, EVENT_NAME), EVENT_NAME);
      this.overlays && this.overlays.subscribe && this.overlays.subscribe(this.onOverlayEvent.bind(this, EVENT_NAME), EVENT_NAME);
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

    if(this.overlays && typeof this.overlays.destroy === 'function') {
      this.overlays.destroy();
    }
  }
}