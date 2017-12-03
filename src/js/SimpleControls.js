import { Observable, Listenable } from './Behaviors';
import * as VPAIDEvents from './VPAIDEvents';


// Simple overlay class. Handles clicks. Can be overriden to provide more complicated user interface
class SimpleControls {
  constructor(slotEl, clickThroughURL) {
    if(typeof slotEl != 'undefined') {
      this.slotEl = slotEl;

      var controls = this.generateControls();
      slotEl.appendChild(controls);

      if(clickThroughURL) {
        this.clickThroughURL = clickThroughURL;
        this.registerListener(slotEl, 'click', this.onClick, this);
      }
    } else {
      throw 'Fatal Error - slot element not provided';
    }
  }

  onClick(event) {
    event.preventDefault();
    this.publish(VPAIDEvents.AD_CLICK_THRU);
    window.open(this.clickThroughURL, '_blank');
  }

  // override this if you want to inject custom overlay elements
  generateControls() {
    return document.createDocumentFragment();
  }

  destroy() {
    this.unregisterAll();
  }
}

SimpleControls = Observable(SimpleControls);
SimpleControls = Listenable(SimpleControls);

export default SimpleControls;