import is from 'is';
import test from 'tape';
import { Observable } from '../src/js/Helpers/Behaviors.js';
import * as VPAIDEvents from '../src/js/Enum/VPAIDEvents.js';
import VPAIDInterface from '../src/js/VPAIDInterface.js';
import BaseCreative from '../src/js/Creatives/BaseCreative';
import VideoCreative from '../src/js/Creatives/VideoCreative';
import BaseOverlay from '../src/js/Overlays/BaseOverlay';
import ClickThroughOverlay from '../src/js/Overlays/ClickThroughOverlay';
import BaseParser from '../src/js/Parsers/BaseParser';
import JSONParser from '../src/js/Parsers/JSONParser';


test('Has required VPAID spec. methods and properties', assert => {
  const instance = new VPAIDInterface();
  const requiredMethods = ['handshakeVersion', 'startAd', 'skipAd', 'stopAd', 'pauseAd', 'resumeAd', 'collapseAd', 'expandAd', 'resizeAd'];
  const requiredProperties = ['getAdExpanded', 'getAdLinear', 'getAdDuration', 'getAdRemainingTime', 'getAdSkippableState', 'getAdVolume', 'getAdCompanions', 'getAdIcons', 'getAdWidth', 'getAdHeight', 'setAdVolume'];

  assert.ok(instance, 'VPAID interface can be instantiated');
  requiredMethods.forEach(    method => assert.ok(is.fn(instance[method]), `VPAIDInterface.${method} is a function`) );
  requiredProperties.forEach( prop =>   assert.ok(is.fn(instance[prop]),   `VPAIDInterface.${prop} is a function`)   );
  assert.end();
});

test('initAd and startAd methods publish appropriate events in correct order', assert => {
  const instance = new VPAIDInterface(getEmptyConfig()); 
  let ct = 0;

  const loaded      = new Promise( (res, rej) => instance.subscribe( () => { instance.startAd(); res(ct++); }, VPAIDEvents.AD_LOADED) );
  const started     = new Promise( (res, rej) => instance.subscribe( () => res(ct++), VPAIDEvents.AD_STARTED));
  const impression  = new Promise( (res, rej) => instance.subscribe( () => res(ct++), VPAIDEvents.AD_IMPRESSION));
  const video_start = new Promise( (res, rej) => instance.subscribe( () => res(ct++), VPAIDEvents.AD_VIDEO_START));
  const skip_state  = new Promise( (res, rej) => instance.subscribe( () => res(ct++), VPAIDEvents.AD_SKIPPABLE_STATE_CHANGE));


  assert.equal(instance.initAd(640, 360, 'normal', -1, {}, {}), instance, 'Should return instance of VPAIDInterface');

  Promise.all([loaded, impression, started, video_start, skip_state]).then( ([loadTime, impressionTime, startTime, videoStartTime, skipTime]) => {
    assert.ok('AdLoaded called after initAd');
    assert.ok(loadTime < impressionTime, 'AdImpression published after AdLoaded');
    assert.ok(impressionTime < startTime, 'AdStarted published after AdImpression'); 
    assert.ok(startTime < videoStartTime, 'AdVideoStart published after AdStarted');
    assert.ok(videoStartTime < skipTime, 'AdSkippableStateChange published after AdVideoStart');
    assert.end();
  });
});

test('can skip ad', assert => {
  const instance = new VPAIDInterface();

  instance.subscribe( () => {
    assert.ok('Should publish AdSkipped when skipAd is called');
    assert.end();
  }, VPAIDEvents.AD_SKIPPED);
  
  assert.equal(instance.skipAd(), instance, 'Should return instance of VPAIDInterface');
});

test('can stop ad', assert => {
  const instance = new VPAIDInterface();

  instance.subscribe( () => {
    assert.ok('Should publish AdStopped when stopAd is called');
    assert.end();
  }, VPAIDEvents.AD_STOPPED);
  
  instance.stopAd();
});

test('can pause ad', assert => {
  const instance = new VPAIDInterface();
  let adPaused = false;

  instance.ad = { 
    pause() {
      adPaused = true;
    }
  };

  instance.subscribe( () => {
    assert.equal(adPaused, true, 'Should call pause on the video element');
    assert.ok('Should publish AdPaused when pauseAd is called');
    assert.end();
  }, VPAIDEvents.AD_PAUSED);
  
  assert.equal(instance.pauseAd(), instance, 'Should return instance of VPAIDInterface');
});

test('can resume ad', assert => {
  const instance = new VPAIDInterface();
  let adResumed = false;

  instance.ad = { 
    play() {  
      adResumed = true;
    }
  };

  instance.subscribe( () => {
    assert.equal(adResumed, true, 'Should call play on the video element');
    assert.ok('Should publish AdResumed when resumeAd is called');
    assert.end();
  }, VPAIDEvents.AD_PLAYING);
  
  assert.equal(instance.resumeAd(), instance, 'Should return instance of VPAIDInterface');
});

test('can collapseAd', assert => {
  const instance = new VPAIDInterface();

  instance.subscribe( () => {
    assert.equal(instance.expanded, false, 'Should set expanded as false when collapseAd called');
    assert.ok('Should publish AdExpandedChanged when collapseAd is called');
    assert.end();
  }, VPAIDEvents.AD_EXPANDED_CHANGE);
  
  assert.equal(instance.collapseAd(), instance, 'Should return instance of VPAIDInterface');
});

test('can expandAd', assert => {
  const instance = new VPAIDInterface();

  instance.subscribe( () => {
    assert.equal(instance.expanded, true, 'Should set expanded as true when expandAd called');
    assert.ok('Should publish AdExpandedChanged when expandAd is called');
    assert.end();
  }, VPAIDEvents.AD_EXPANDED_CHANGE);
  
  assert.equal(instance.expandAd(), instance, 'Should return instance of VPAIDInterface');
});

test('can resizeAd', assert => {
  const instance = new VPAIDInterface();
  instance.adOverlay = {
    setSize(w, h) {
      this.width = w;
      this.height = h;
    }
  };

  instance.subscribe( () => {
    assert.equal(instance.size.width, 300, 'Should set width of VPAIDInterface');
    assert.equal(instance.size.height, 250, 'Should set height of VPAIDInterface');
    assert.equal(instance.viewMode, 'foo', 'Should set viewmode');
    assert.ok(instance.adOverlay.width === 300 && instance.adOverlay.height === 250, 'Should call setSize on the overlays');
    assert.ok('Should publish AdSizeChange when resizeAd is called');
    assert.end();
  }, VPAIDEvents.AD_SIZE_CHANGE);
  
  assert.equal(instance.resizeAd(300, 250, 'foo'), instance, 'Should return instance of VPAIDInterface');
});

test('can access VPAIDInterface properties via getters', assert => {
  const instance = new VPAIDInterface();

  assert.ok(parseFloat(instance.handshakeVersion()) >= 2.0, 'VPAID version should be 2.0 or higher');

  assert.equal(instance.getAdExpanded(), false, 'Should expose expanded state');
  instance.expanded = true;
  assert.equal(instance.getAdExpanded(), true, 'Should expose expanded state');
  
  assert.equal(instance.getAdLinear(), true, 'Should always return true for AdLinear state');
  
  assert.equal(instance.getAdDuration(), -2, 'Should return -2 if duration not set');
  instance.ad = { duration: 1000 };
  assert.equal(instance.getAdDuration(), 1000, 'Should return duration if ad available');

  delete instance.ad;
  assert.equal(instance.getAdRemainingTime(), -2, 'Should return -2 if ad not avialable');
  instance.ad = { remaining: 1000 };
  assert.equal(instance.getAdRemainingTime(), 1000, 'Should return remaining if ad available');

  assert.equal(instance.getAdSkippableState(), false, 'Should not be skippable initially');
  instance.skippable = true;
  assert.equal(instance.getAdSkippableState(), true, 'Should return the current skippable state');

  delete instance.ad;
  assert.equal(instance.getAdVolume(), -1, 'Should return -1 if ad not available');
  instance.ad = { volume: 1 };
  assert.equal(instance.getAdVolume(), 1, 'Should return ad volume if ad available');

  assert.equal(instance.getAdCompanions(), '', 'Should return nothing for AdCompanions');
  assert.equal(instance.getAdIcons(), false, 'Should return false for AdiIcons');

  instance.size = { width: 1000, height: 2000 };
  assert.equal(instance.getAdHeight(), 2000, 'Should return current height');
  assert.equal(instance.getAdWidth(), 1000, 'Should return current width');

  instance.setAdVolume(100);
  assert.equal(instance.getAdVolume(), 100, 'Should set ad volume');

  assert.end();
});

test('getVPAIDAd is attached to supplied window param', assert => {
  const win = {}, instance = new VPAIDInterface({ window: win });

  assert.equal(win.getVPAIDAd(), instance, 'the VPAIDInterface instance should be exposed on the window provided');
  assert.end();
});

test('Should allow custom Ad, overlays, and parser', assert => {
  // ToDo fix tests. Class validation not working in tape, but works in browser
  const creativeFormat = VideoCreative, overlays = ClickThroughOverlay, parser = JSONParser;
  const instance = new VPAIDInterface({ creativeFormat, overlays, parser });

  assert.equal(instance.AdCreative, creativeFormat, 'Should use creativeFormat passed in');
  assert.equal(instance.Overlay, overlays, 'Should use overlay class passed in');
  assert.equal(instance.Parser, parser, 'Should use parser class passed in');

  assert.end();
});

test('Should support async parsers', assert => {
  const parser = getAsyncParser(), creativeFormat = getAsyncCreative(), overlays = class extends BaseOverlay {};
  const instance = new VPAIDInterface({ creativeFormat, parser, overlays });

  instance.subscribe(() => {
    assert.equal(instance.ad.params, 'Foobar', 'Async parser should provide AdParameters to creativeFormat');
    assert.end();
  }, VPAIDEvents.AD_LOADED);

  instance.initAd(640, 360, 'normal', -1, { AdParameters: 'Foobar' }, {});
});

function getAsyncParser() {
  return class extends BaseParser {
    static parseAdParameters(paramsString) {
      return new Promise((res, rej) => {
        res(paramsString);
      });
    }
  }
}

function getAsyncCreative() {
  return class extends BaseCreative {
    constructor(el, params, instance) {
      super();
      this.params = params;
    }
  }
}

function getEmptyConfig() {
  return { 
    creativeFormat: class extends BaseCreative {}, 
    overlays: class extends BaseOverlay {}, 
    parser: class extends BaseParser {}
  };
}