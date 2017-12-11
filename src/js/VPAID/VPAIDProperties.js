export default subject => class extends subject {
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
    return this.skippable;
  }

  getAdVolume() {
   return this.ad && !isNaN(this.ad.volume) ? this.ad.volume : -1;
  }

  getAdCompanions() { 
    return '';
  }

  getAdIcons() {
   return false;
  }

  getAdHeight() { 
    return this.size ? this.size.height : -1;
  }

  getAdWidth() { 
    return this.size ? this.size.width : -1;
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