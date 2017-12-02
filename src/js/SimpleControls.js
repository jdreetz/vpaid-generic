import { ClassValidator } from './Utils';

import Subscribeable from './Subscribeable';
import * as VPAIDEvents from './VPAIDEvents';

export default class SimpleControls extends Subscribeable {
  constructor(slotEl, clickThroughURL) {
    super();

    if(typeof slotEl != 'undefined') {
      this.slotEl = slotEl;

      var controls = this.generateControls();
      slotEl.appendChild(controls);

      if(clickThroughURL) {
        this.clickThroughURL = clickThroughURL;
        slotEl.addEventListener('click', this.onClick.bind(this));
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

  generateControls() {
    return document.createDocumentFragment();
  }
}

SimpleControls.ValidAlternative = ClassValidator(SimpleControls);