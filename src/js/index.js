import VPAIDInterface from './VPAIDInterface';
import * as VPAIDEvents from './Enum/VPAIDEvents';
import BaseCreative from './Creatives/BaseCreative';
import VideoAd from './Creatives/VideoAd'; 
import BaseOverlay from './Overlays/BaseOverlay';
import SimpleControls from './Overlays/SimpleControls';
import BaseParser from './Parsers/BaseParser';
import JSONParser from './Parsers/JSONParser';

VPAIDInterface.SimpleControls = SimpleControls;
VPAIDInterface.VPAIDInterface = VPAIDInterface;
VPAIDInterface.VPAIDEvents = VPAIDEvents;
VPAIDInterface.BaseCreative = BaseCreative;
VPAIDInterface.VideoAd = VideoAd;
VPAIDInterface.BaseOverlay = BaseOverlay;
VPAIDInterface.SimpleControls = SimpleControls;
VPAIDInterface.BaseParser = BaseParser;
VPAIDInterface.JSONParser = JSONParser;

module.exports = VPAIDInterface;
