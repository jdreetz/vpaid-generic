import is from 'is';
import test from 'tape';
import { Observable } from '../src/js/Behaviors.js';
import * as VPAIDEvents from '../src/js/VPAIDEvents.js';
import VPAIDInterface from '../src/js/VPAIDInterface.js';


test('Has required VPAID spec. methods and properties', assert => {
  const instance = new VPAIDInterface();
  const requiredMethods = ['handshakeVersion', 'startAd', 'skipAd', 'stopAd', 'pauseAd', 'resumeAd', 'collapseAd', 'expandAd', 'resizeAd'];
  const requiredProperties = ['getAdExpanded', 'getAdLinear', 'getAdDuration', 'getAdRemainingTime', 'getAdSkippableState', 'getAdVolume', 'getAdCompanions', 'getAdIcons', 'getAdWidth', 'getAdHeight', 'setAdVolume'];

  assert.ok(instance, 'VPAID interface can be instantiated');
  requiredMethods.forEach(    method => assert.ok(is.fn(instance[method]), `VPAIDInterface.${method} is a function`) );
  requiredProperties.forEach( prop =>   assert.ok(is.fn(instance[prop]),   `VPAIDInterface.${prop} is a function`)   );
  assert.end();
});

test('Responds to VPAID method calls correctly', assert => {
  const instance = new VPAIDInterface(getEmptyConfig());

  assert.ok(parseFloat(instance.handshakeVersion()) >= 2.0, 'Version 2.0 or higher');

  const loaded = new Promise( (res, rej) => instance.subscribe(res, VPAIDEvents.AD_LOADED) );
  const started = new Promise( (res, rej) => instance.subscribe(res, VPAIDEvents.AD_STARTED));

  instance
    .initAd(640, 360, 'normal', -1, {}, {})
    .startAd();

  Promise.all([loaded, started]).then( () => {
    assert.ok('AdLoaded called after initAd');
    assert.ok('AdStarted called after startAd');
    assert.end();
  });
});

test('Tests VPAIDInterface non-spec functionality', assert => {
  const win = {}, instance = new VPAIDInterface({ window: win });

  assert.equal(win.getVPAIDAd(), instance, 'the VPAIDInterface instance should be exposed on the window provided');
  assert.end();
});

function getEmptyConfig() {
  return { 
    creativeFormat: Observable(class {}), 
    overlays: Observable(class {}), 
    parser: { 
      parseAdParameters: () => {} 
    }
  };
}