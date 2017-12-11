import AdTagXML from './adtag.xml';

const DEFAULT_VIDEO_URL = 'http://cdn.visiblemeasures.com/ad_assets/p/demo/ComputerFair1982.mp4';
const DEFAULT_CLICK_THROUGH = 'http://www.yahoo.com/';
const DEFAULT_CLIENT_URL = 'demo.bundle.js';

window.getAdTag = ({ videoURL = DEFAULT_VIDEO_URL, clickThrough = DEFAULT_CLICK_THROUGH, clientURL = DEFAULT_CLIENT_URL }) => {
  return AdTagXML
    .replace('${VIDEO_URL}', videoURL)
    .replace('${CLICK_THROUGH}', clickThrough)
    .replace('${VPAID_CLIENT}', HOST + clientURL);
}; 