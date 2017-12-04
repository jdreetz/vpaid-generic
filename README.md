# VPAID Generic

A generic implementation of the [VPAID 2.0 spec](http://www.iab.net/media/file/VPAID_2.0_Final_04-10-2012.pdf) in ES6 Javascript. By default, it includes a HTML5 video player that handles playback of the specified creative, an overlay manager that handles click events, and an AdParameters parser that expects a JSON string. The video player, overlay handler, and parser can all be configured in the `VPAIDInterface` constructor. 

### Setup and building
* `npm install`
* Build: `npm run build`
* Dev: `npm run dev` hosts IMA-VPAID-Host.html at http://localhost:8080/

### Extension
The library can be extended or overriden in several ways. `VPAIDInterface` is the main entry point to the library. It implements the required VPAID interface methods and exposes the `getVPAIDAd` method on the supplied `window` object. The constructor looks for an object with the following configuration options:

* `window` - the window instance to attach `getVPAIDAd` to
* `creativeFormat` - a class that is responsible for playback of the video creative and sending notifications about playback events. If none is supplied, `VideoAd` will be used. It receives the `videoSlot` property provided by the VPAID host. If a class is supplied, it should inherit from `VideoAd` or implement the same interface. 
* `overlays` - a class that is responsible for display of user interface elements. It receives the `slot` element from the VPAID host. If none is provided, `SimpleControls` is used. If a custom class is provided, it should inherit from `SimpleControls` or implement the sample interface.
* `parser` - a class with a static method called `parseAdParameters` that accepts the `creativeData.AdParameters` string from the VAST tag, and returns an object of the AdParameters. If no parser is supplied, a JSON parser is used. The output object of the parser will be supplied to the configured `creativeFormat` and `overlays` classes during instantiation in `initAd`. 

By default, all `VPAIDEvents` will be published from the `creativeFormat` and `overlays` classes to the VPAID host, via the methods `VPAIDInterface.onCreativeEvent` and `VPAIDInterface.onOverlayEvent`, respectively. If you want to intercept those events before publising to the VPAID host, extend `VPAIDInterface` and override those methods.

If the configuration options don't provide enough flexability, subclassing `VPAIDInterface` and overriding the required methods is recommended.  

### Usage
See `IMA-VPAID-Host.html` for an example of interacting with the VPAID interface from [Google's IMA VPAID host](https://developers.google.com/interactive-media-ads/docs/sdks/html5/). The demo page provides a string for VAST tag that loads `demo.bundle.js` which is the bundled version of `demo.js`. `demo.js` creates an instance of VPAIDInterface and supplies just the `window` object that `getVPAIDAd` will be attached to. All other options use the defaults (`VideoAd`, `SimpleControls`, 