import * as VPAIDEvents from '../Enum/VPAIDEvents';

export default subject => class extends subject {
  initAd(width, height, viewMode, desiredBitrate, creativeData = {}, environmentVars = {}) {
    if(this.size) { 
      this.size.width = width;
      this.size.height = height;
    };
    this.viewMode = viewMode;
    this.creativeData = { ...creativeData };
    this.environmentVars = { ...environmentVars };

    try {
      // parseAdParameters could be async, so we pass it through Promise.all to handle sync and async cases
      Promise
        .all([this.Parser.parseAdParameters(creativeData.AdParameters)])
        .then(this.onAdParametersParsed.bind(this), this.onAdParseFail.bind(this));
    } catch(e) {
      this.onAdParseFail(e);
    }
    
    return this;
  }

  startAd() {
    this.skippable = true;
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
    if(this.ad && typeof this.ad.destroy == 'function') {
      this.ad.destroy();
    }
    if(this.overlays && typeof this.overlays.destroy == 'function') {
      this.overlays.destroy();
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
    if(this.size) {
      this.size.width = width;
      this.size.height = height;
    }
    this.viewMode = viewMode;

    if(this.overlays) {
      this.overlays.setSize(width, height);
    }

    this.publish(VPAIDEvents.AD_SIZE_CHANGE);
    return this;
  }
}
