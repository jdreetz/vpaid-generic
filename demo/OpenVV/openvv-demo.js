import OpenVVOverlay from './OpenVVOverlay';
import MockVPAIDHost from './MockVPAIDHost';
import VPAIDInterface from '../../src/js/index';

const publisherPlayer = document.getElementById('publisherPlayer'),
      vpaidSlot       = document.getElementById('vpaidSlot');

new VPAIDInterface({ window: window, overlays: OpenVVOverlay });
const VPAIDHost = new MockVPAIDHost(publisherPlayer, vpaidSlot);
VPAIDHost.start();

