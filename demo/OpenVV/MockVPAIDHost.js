export default class MockVPAIDHost {
  constructor(publisherPlayer, slotSpace) {
    this.publisherPlayer = publisherPlayer;
    this.slotSpace = slotSpace;

    if(window.getVPAIDAd && typeof window.getVPAIDAd === 'function') {
      this.vpaidClient = window.getVPAIDAd();
      this.addListeners();
    }
  }

  start() {
    if(this.vpaidClient) {
      const width        = 1127,
            height       = 845,
            viewMode     = 'normal',
            bitRate      = -1,
            creativeData = { 
              AdParameters: '{ "videoURL": "https://cdn.visiblemeasures.com/ad_assets/p/demo/ComputerFair1982.mp4" }' 
            },
            environment  = {
              slot: this.slotSpace, 
              videoSlot: this.publisherPlayer
            };

      this
        .vpaidClient
        .initAd(width, height, viewMode, bitRate, creativeData, environment);
    }
  }

  addListeners() {
    if(this.vpaidClient) {
      ['AdLoaded', 'AdStarted', 'AdStopped']
        .forEach( eventName => {
          this.vpaidClient.subscribe(this.handler.bind(this, eventName), eventName, this)
        });
    }
    
  }

  handler(eventName, ...args) {
    switch(eventName) {
      case 'AdLoaded':
        this.vpaidClient.startAd();
      default:
        console.log(eventName);
    }
  }
}